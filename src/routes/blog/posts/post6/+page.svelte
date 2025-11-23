<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Copy to Clipboard: Behind the Scenes | AxelBase</title>
	<meta name="description" content="How the Copy Hex and Copy Base64 buttons work using the modern Clipboard API — with graceful fallbacks." />
	<meta property="og:title" content="Copy to Clipboard: Behind the Scenes | AxelBase" />
	<meta property="og:description" content="Instant, secure, no-flash copy-to-clipboard using navigator.clipboard.writeText()" />
	<meta property="og:url" content="{base}/blog/posts/post6" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Copy to Clipboard: Behind the Scenes</p>
	</div>

	<article class="prose">
		<h1>Copy to Clipboard: Behind the Scenes</h1>
		<p class="post-meta">Published: November 23, 2025</p>

		<p class="lead">
			One click → “Copied!” toast → hash is in your clipboard. No Flash. No hacks.
		</p>

		<h2>The Modern Clipboard API</h2>
		<p>
			Since 2018, browsers support the asynchronous <code>navigator.clipboard.writeText()</code> API — secure, simple, and powerful.
		</p>

		<h2>How It Works Here</h2>
		<pre><code>await navigator.clipboard.writeText(hash);
showToast('Hex copied!');</code></pre>

		<h2>Security Requirements</h2>
		<ul>
			<li>Page must be served over HTTPS (GitHub Pages ✓)</li>
			<li>User gesture required (button click ✓)</li>
			<li>Works in all modern browsers (Chrome 66+, Firefox 63+, Safari 13.1+)</li>
		</ul>

		<h2>Graceful Fallback (rare cases)</h2>
		<p>
			In the 0.1% of environments where the API is unavailable, we fall back to the classic <code>execCommand('copy')</code> with a hidden textarea — still works perfectly.
		</p>

		<h2>Why This Matters</h2>
		<p>
			You can copy a 32-character MD5 hash and paste it directly into your terminal, download script, or verification tool — instantly and reliably.
		</p>

		<hr class="my-5" />

		<p class="text-center">
			<a href="{base}/" class="btn btn-primary">Test Copy Buttons</a>
			<a href="{base}/blog" class="btn btn-outline-secondary ms-3">All Posts</a>
		</p>
	</article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2{
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }
  
  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
