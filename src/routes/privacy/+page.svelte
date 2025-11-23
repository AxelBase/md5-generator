<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Privacy Policy | AxelBase MD5 Hash Generator</title>
	<meta name="description" content="AxelBase MD5 Hash Generator collects zero personal data. Everything runs 100% in your browser — no tracking, no logs, no servers." />
	<meta property="og:title" content="Privacy Policy | AxelBase MD5 Hash Generator" />
	<meta property="og:description" content="We collect nothing. Your input never leaves your device. Full privacy by design." />
	<meta property="og:url" content="{base}/privacy" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>Privacy Policy</p>
	</div>

	<article class="prose">
		<h1>Privacy Policy</h1>
		<p class="post-meta">Effective Date: November 23, 2025</p>

		<p>At <strong>AxelBase MD5 Hash Generator</strong>, your privacy is not just respected — it is <strong>guaranteed by design</strong>. This tool operates <strong>100% client-side</strong> in your browser. That means:</p>

		<ul>
			<li><strong>No data is ever transmitted</strong> to any server</li>
			<li><strong>No personal information</strong> is collected, stored, or processed</li>
			<li><strong>No cookies, analytics, or tracking pixels</strong> are used</li>
			<li><strong>No logs, IP addresses, or usage data</strong> are recorded</li>
		</ul>

		<h2>How It Works</h2>
		<p>When you paste text or upload a file:</p>
		<ul>
			<li>All MD5 computation happens locally using JavaScript (spark-md5)</li>
			<li>File reading uses the browser’s native File API</li>
			<li>Large files are processed incrementally in memory chunks</li>
			<li>Copy-to-clipboard uses the secure Clipboard API</li>
		</ul>
		<p><strong>Your data never leaves your device.</strong> Even if you close the tab, nothing is retained.</p>

		<h2>Third-Party Services</h2>
		<p>We do not use any external analytics, advertising, or tracking services. The site is statically hosted on GitHub Pages with no backend. Open-source libraries (Bootstrap, spark-md5) are loaded from trusted CDNs but do not track users.</p>

		<h2>Cookies & Local Storage</h2>
		<p><strong>No cookies are set.</strong> The only possible local storage usage is temporary (e.g., your input during a session) and is cleared automatically when you refresh or close the browser.</p>

		<h2>Children’s Privacy</h2>
		<p>This tool is not directed at children under 13. Since we collect no data, we do not knowingly process children’s information.</p>

		<h2>International Compliance</h2>
		<p>Because we collect zero personal data, we are compliant by default with <strong>GDPR</strong>, <strong>CCPA</strong>, <strong>LGPD</strong>, and all major privacy regulations worldwide.</p>

		<h2>Changes to This Policy</h2>
		<p>We may update this policy if new features are added. Changes will be posted here with the updated effective date.</p>

		<h2>Contact</h2>
		<p>Questions? Open an issue on our <a href="https://github.com/axelbase/md5-generator" target="_blank" rel="noopener">GitHub repository</a>.</p>

		<p class="italic-note">
			<strong>You are in full control.</strong> Your files, your hashes, your privacy — always.
		</p>
	</article>
</div>

<style>
	.post-layout { max-width: 800px; padding: 2rem 0 4rem; }
	.breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: var(--text-secondary); }
	.breadcrumbs a { color: var(--accent-secondary); }
	.breadcrumbs a:hover { text-decoration: underline; }
	.prose { line-height: 1.8; }
	.prose .post-meta { color: var(--text-secondary); font-size: .9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
	.prose h1, .prose h2 { color: var(--accent-secondary); }
	.prose h1 { font-size: 2.5rem; margin-bottom: .5rem; }
	.prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
	.prose ul { list-style-type: '→ '; padding-left: 1.5rem; }
	.prose ul li::marker { color: var(--accent-primary); }
	.prose .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: var(--text-secondary); }
</style>