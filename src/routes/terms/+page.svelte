<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Terms & Conditions | AxelBase MD5 Hash Generator</title>
	<meta name="description" content="Terms of use for the free, open-source AxelBase MD5 Hash Generator — a client-side web tool." />
	<meta property="og:title" content="Terms & Conditions | AxelBase MD5 Hash Generator" />
	<meta property="og:description" content="By using this free tool you agree to our simple, fair terms." />
	<meta property="og:url" content="{base}/terms" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>Terms & Conditions</p>
	</div>

	<article class="prose">
		<h1>Terms & Conditions</h1>
		<p class="post-meta">Last Updated: November 23, 2025</p>

		<p>By using the <strong>AxelBase MD5 Hash Generator</strong> (“the Tool”), you agree to these Terms.</p>

		<h2>1. Nature of the Tool</h2>
		<p>This is a <strong>free, open-source</strong>, client-side web utility that computes MD5 hashes entirely in your browser. No data is sent to any server.</p>

		<h2>2. License to Use</h2>
		<p>You are granted a worldwide, non-exclusive, royalty-free license to use the Tool for personal or commercial purposes.</p>

		<h2>3. Acceptable Use</h2>
		<p>You agree not to:</p>
		<ul>
			<li>Use the Tool for unlawful purposes</li>
			<li>Attempt to overload or disrupt the hosting service (GitHub Pages)</li>
			<li>Remove or alter copyright notices in the source code</li>
			<li>Use automated scripts to abuse the service</li>
		</ul>

		<h2>4. No Warranty</h2>
		<p>The Tool is provided <strong>“as is”</strong> without any warranties. While we strive for accuracy, <strong>MD5 is cryptographically broken</strong> and should <strong>never</strong> be used for security-critical applications (passwords, signatures, etc.).</p>

		<h2>5. Limitation of Liability</h2>
		<p>In no event shall the developers or contributors be liable for any damages arising from use of the Tool. You use it at your own risk.</p>

		<h2>6. Intellectual Property</h2>
		<p>The source code is licensed under the MIT License. The name “AxelBase” and logo are trademarks of the project owner.</p>

		<h2>7. Termination</h2>
		<p>We reserve the right to block access to abusive users, though such measures are unlikely given the static nature of the Tool.</p>

		<h2>8. Governing Law</h2>
		<p>These Terms are governed by the laws of the jurisdiction where the project maintainer resides.</p>

		<h2>9. Changes to Terms</h2>
		<p>We may update these Terms at any time. Continued use constitutes acceptance.</p>

		<p class="italic-note">
			Thank you for using AxelBase. We built this tool to be fast, private, and useful — forever free.
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