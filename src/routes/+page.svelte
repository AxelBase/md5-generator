<script lang="ts">
    import { computeMD5 } from '$lib/md5';
    import { getByteLength, copyToClipboard } from '$lib/utils';
    import { fade, fly } from 'svelte/transition'; 

    let inputText: string = '';
    let hex: string = '';
    let base64: string = '';
    let charCount: number = 0;
    let byteCount: number = 0;
    let calcTime: number = 0;
    let showBenchmark: boolean = false;
    let isLarge: boolean = false;
    let toastMessage: string = '';
    let file: File | null = null;
    let loading: boolean = false;

    function debounce(fn: Function, ms: number) {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), ms);
        };
    }

    const updateHash = debounce(async () => {
        if (!inputText) {
            hex = '';
            base64 = '';
            charCount = 0;
            byteCount = 0;
            calcTime = 0;
            return;
        }

        charCount = inputText.length;
        byteCount = getByteLength(inputText);
        isLarge = byteCount > 10 * 1024 * 1024;

        const { hex: h, base64: b, time } = await computeMD5(inputText);
        hex = h;
        base64 = b;
        calcTime = time;
    }, 300);

    $: inputText && updateHash();

    async function handleFile(event: Event) {
        const target = event.target as HTMLInputElement;
        file = target.files?.[0] || null;
        if (!file) return;

        byteCount = file.size;
        isLarge = byteCount > 10 * 1024 * 1024;
        loading = true;

        if (isLarge) {
            const { hex: h, base64: b, time } = await computeMD5(file);
            hex = h;
            base64 = b;
            calcTime = time;
            inputText = '';
            charCount = 0;
        } else {
            inputText = await file.text();
        }
        loading = false;
    }

    function removeFile() {
        file = null;
        isLarge = false;
        loading = false;
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
        if (!inputText) {
            hex = '';
            base64 = '';
            charCount = 0;
            byteCount = 0;
            calcTime = 0;
        }
    }

    function showToast(message: string) {
        toastMessage = message;
        const toastEl = document.getElementById('copyToast');
        if (toastEl) new bootstrap.Toast(toastEl).show();
    }

    async function copyHex() {
        if (hex) {
            await copyToClipboard(hex);
            showToast('Hex copied!');
        }
    }

    async function copyBase64() {
        if (base64) {
            await copyToClipboard(base64);
            showToast('Base64 copied!');
        }
    }

    function clearAll() {
        inputText = '';
        removeFile();
    }
</script>

<div class="row justify-content-center">
    <div class="col-lg-10">
        
        <div class="text-center mb-5" in:fade={{ duration: 800 }}>
            <h1 class="display-4 mb-3" style="color: var(--color-accent);">Generate MD5 Hash</h1>
            <p class="lead text-muted">Secure, fast, and entirely client-side.</p>
        </div>

        <div class="mb-4 position-relative" in:fly={{ y: 50, duration: 800 }}>
            <div class="glass-card p-1">
                <textarea
                    class="form-control border-0 bg-transparent shadow-none"
                    rows="8"
                    bind:value={inputText}
                    placeholder="Type something or drop a file..."
                    disabled={loading}
                ></textarea>
            </div>
        </div>

        <div class="mb-4" in:fly={{ y: 50, duration: 800, delay: 100 }}>
            <div class="input-group glass-card p-1 overflow-hidden d-flex align-items-center">
                <input
                    id="fileInput"
                    type="file"
                    class="form-control border-0 shadow-none bg-transparent"
                    on:change={handleFile}
                    accept="text/*,.txt"
                    disabled={loading}
                />
                {#if file}
                    <button class="btn btn-link text-danger pe-3" type="button" on:click={removeFile} title="Remove file">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                {/if}
            </div>
            {#if loading}
                <div class="d-flex align-items-center gap-2 mt-3">
                    <div class="spinner-border spinner-border-sm text-warning" role="status"></div>
                    <span class="text-muted small">Processing large file...</span>
                </div>
            {/if}
            {#if file}
                <div class="form-text text-muted mt-2 ps-2">
                    <strong>Selected:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
            {/if}
        </div>

        {#if isLarge}
            <div class="alert alert-warning mb-3 glass-card border-0">
                ⚠️ Large file (>10 MB) detected – hash computed without loading full content into textarea.
            </div>
        {/if}

        <div class="d-flex justify-content-between align-items-center mb-4" in:fade={{ delay: 200 }}>
            <div class="stats glass-card px-3 py-2 small">
                <span class="me-3"><strong>Chars:</strong> {charCount.toLocaleString()}</span>
                <span><strong>Bytes:</strong> {byteCount.toLocaleString()}</span>
            </div>
            
            <div class="d-flex gap-2 align-items-center">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="benchmark" bind:checked={showBenchmark} />
                    <label class="form-check-label small text-muted" for="benchmark">Time</label>
                </div>
                <button class="btn btn-secondary" on:click={clearAll}>Clear All</button>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-md-12" in:fly={{ y: 20, duration: 600, delay: 300 }}>
                <div class="card glass-card">
                    <div class="card-body d-flex align-items-center flex-wrap gap-3">
                        <strong class="text-coffee">MD5 (Hex):</strong>
                        <div class="flex-grow-1">
                             <span class="hash-value d-block w-100">{hex || 'Waiting for input...'}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm text-nowrap" on:click={copyHex} disabled={!hex}>
                            <i class="bi bi-clipboard me-1"></i> Copy
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="col-md-12" in:fly={{ y: 20, duration: 600, delay: 400 }}>
                <div class="card glass-card">
                    <div class="card-body d-flex align-items-center flex-wrap gap-3">
                        <strong class="text-coffee">Base64:</strong>
                         <div class="flex-grow-1">
                            <span class="hash-value d-block w-100">{base64 || 'Waiting for input...'}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm text-nowrap" on:click={copyBase64} disabled={!base64}>
                            <i class="bi bi-clipboard me-1"></i> Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {#if showBenchmark && calcTime > 0}
            <div class="alert glass-card mt-3 text-center" transition:fade>
                Hash calculated in <strong>{calcTime.toFixed(2)} ms</strong>
            </div>
        {/if}

        <div class="mt-5 pt-5">
            <hr class="opacity-25 my-5" style="border-color: var(--color-text-main);">
            
<section id="about" class="mb-5 scroll-margin-top glass-card p-5 rounded-4">
	<h3 class="mb-4 text-coffee display-6">About AxelBase MD5 Hash Generator</h3>
	<p class="lead text-muted">
		AxelBase MD5 is a <strong>100% client-side</strong>, open-source web tool that instantly computes MD5 hashes for text and files — with zero data leaving your device.
	</p>

	<p>
		Built in 2025 with SvelteKit and pure JavaScript, this tool exists because <strong>MD5 is far from dead</strong>. Despite being cryptographically broken since 2004, it remains the most widely published checksum format on the internet. Every major Linux distribution, Python release, Node.js binary, game installer, and open-source archive still ships MD5 hashes alongside (or instead of) SHA-256.
	</p>

	<p>
		Most online hash tools either:
	</p>
	<ul class="list-styled">
		<li>Upload your files to unknown servers</li>
		<li>Track your activity with analytics</li>
		<li>Freeze when processing large files</li>
		<li>Require sign-up or payment</li>
	</ul>

	<p><strong>We reject all of that.</strong></p>

	<p>
		AxelBase runs entirely in your browser using the battle-tested <code>spark-md5</code> library. Files over 10 MB are processed incrementally in 2 MB chunks — never loading the full content into memory. Even multi-gigabyte ISOs hash smoothly without freezing your tab. The result? <strong>Speed, privacy, and reliability</strong> — exactly what developers need in 2025.
	</p>

	<p>
		Every feature is intentional:
	</p>
	<ul class="list-styled">
		<li><strong>No backend</strong> → Nothing to hack or log</li>
		<li><strong>No cookies or tracking</strong> → Not even page views are recorded</li>
		<li><strong>Copy buttons</strong> → Instant hex or Base64 to clipboard via the secure Clipboard API</li>
		<li><strong>Large file awareness</strong> → Smart handling of >10 MB files with progress feedback</li>
		<li><strong>Static deployment</strong> → Hosted forever for free on GitHub Pages</li>
	</ul>

	<p>
		Whether you're verifying a Ubuntu ISO, checking a game patch, comparing database dumps, or generating cache keys, this tool delivers the correct MD5 hash instantly — with mathematical certainty and absolute privacy.
	</p>

	<p class="mt-4">
		<em>Built for developers who value speed and trust nothing less than full control over their data.</em>
	</p>
</section>
<section id="howto" class="mb-5 scroll-margin-top glass-card p-5 rounded-4">
	<h3 class="mb-4 text-coffee display-6">How to Use AxelBase MD5</h3>
	<p class="lead text-muted">
		Three ways to generate an MD5 hash — all private, all instant.
	</p>

	<h4 class="mt-4 text-coffee">Method 1: Paste Text</h4>
	<p>
		Simply type or paste any text directly into the large textarea. The hash updates automatically after a 300 ms debounce — giving you real-time feedback without lag. Perfect for short strings, license keys, or quick checksums.
	</p>

	<h4 class="mt-4 text-coffee">Method 2: Upload a File (Any Size)</h4>
	<p>
		Click “Choose File” or drag-and-drop any file onto the textarea. The tool intelligently detects file size:
	</p>
	<ul class="list-styled">
		<li><strong>Under 10 MB</strong>: File is loaded into the textarea for editing</li>
		<li><strong>Over 10 MB</strong>: Processed incrementally using <code>File.slice()</code> — never freezing your browser</li>
		<li>Multi-gigabyte files (e.g. ISOs, VM images) work smoothly</li>
	</ul>
	<p>
		A spinner appears during processing, and the final hash appears as soon as computation completes.
	</p>

	<h4 class="mt-4 text-coffee">Method 3: Drag & Drop</h4>
	<p>
		Drag any file directly from your file manager onto the textarea — the file is selected instantly.
	</p>

	<h4 class="mt-4 text-coffee">Copy Your Hash</h4>
	<p>
		Once computed, you get two formats:
	</p>
	<ul class="list-styled">
		<li><strong>MD5 (Hex)</strong>: The classic 32-character lowercase string (e.g. <code>d41d8cd98f00b204e9800998ecf8427e</code>)</li>
		<li><strong>Base64</strong>: Compact 22-character representation (rarely needed but available)</li>
	</ul>
	<p>
		Click the “Copy” button next to either — a toast confirms success. Paste directly into your terminal, script, or verification tool.
	</p>

	<h4 class="mt-4 text-coffee">Useful Tips</h4>
	<ul class="list-styled">
		<li>Enable “Time” toggle to see computation speed in milliseconds</li>
		<li>Use “Clear All” to reset everything instantly</li>
		<li>Remove uploaded file with the trash icon</li>
		<li>Works perfectly offline after first load (thanks to service worker caching)</li>
	</ul>

	<p class="mt-4">
		<strong>No sign-up. No upload. No waiting.</strong> Just drop a file or paste text and get your MD5 hash — forever free and private.
	</p>
</section>
<section id="faq" class="mb-5 scroll-margin-top glass-card p-5 rounded-4">
	<h3 class="mb-4 text-coffee display-6">Frequently Asked Questions</h3>

	<div class="accordion accordion-flush" id="faqAccordion">
		<div class="accordion-item bg-transparent border-bottom border-secondary border-opacity-10">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed bg-transparent text-muted fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
					Is my data sent to a server?
				</button>
			</h2>
			<div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
				<div class="accordion-body">
					<strong>Never.</strong> Every byte is processed locally using JavaScript. No network requests are made after page load. Your files, text, and hashes never leave your device.
				</div>
			</div>
		</div>

		<div class="accordion-item bg-transparent border-bottom border-secondary border-opacity-10">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed bg-transparent text-muted fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
					Is MD5 still safe to use in 2025?
				</button>
			</h2>
			<div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
				<div class="accordion-body">
					<strong>For integrity checks: Yes. For security: No.</strong><br><br>
					MD5 is cryptographically broken and should <strong>never</strong> be used for passwords, digital signatures, or any security-critical purpose. However, it remains <strong>perfectly suitable</strong> for non-security tasks like file verification, deduplication, and checksums — which is why every major software distributor still publishes MD5 hashes.
				</div>
			</div>
		</div>

		<div class="accordion-item bg-transparent border-bottom border-secondary border-opacity-10">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed bg-transparent text-muted fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
					Why not just use SHA-256?
				</button>
			</h2>
			<div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
				<div class="accordion-body">
					Because most download pages still only provide MD5. While SHA-256 is superior for security, MD5 is 2–4× faster and universally published. This tool exists to serve real-world needs — not theoretical ideals.
				</div>
			</div>
		</div>

		<div class="accordion-item bg-transparent border-bottom border-secondary border-opacity-10">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed bg-transparent text-muted fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
					Can it handle large files (1 GB+)?
				</button>
			</h2>
			<div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
				<div class="accordion-body">
					Yes — smoothly. Files over 10 MB are processed in 2 MB chunks using incremental hashing. Memory usage stays low, and the UI remains responsive. Tested successfully with multi-gigabyte ISOs and archives.
				</div>
			</div>
		</div>

		<div class="accordion-item bg-transparent">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed bg-transparent text-muted fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
					Is this tool open source?
				</button>
			</h2>
			<div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
				<div class="accordion-body">
					Absolutely. The entire project is open source under the MIT license. You can view, fork, and contribute on GitHub.
				</div>
			</div>
		</div>
	</div>
</section>        </div>

        <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 2000; margin-bottom: 60px;">
            <div id="copyToast" class="toast align-items-center text-bg-success border-0 rounded-pill shadow" role="alert">
                <div class="d-flex">
                    <div class="toast-body px-4">{toastMessage}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

    </div>
</div>

<style>
    .scroll-margin-top {
        scroll-margin-top: 120px; 
    }
    /* Custom Accordion Chevron Color override */
    .accordion-button::after {
        filter: invert(0.5);
    }
    :global([data-bs-theme="dark"]) .accordion-button::after {
        filter: invert(0.8);
    }
</style>