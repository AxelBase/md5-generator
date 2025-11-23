<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>How This Tool Computes MD5 in Your Browser | AxelBase</title>
	<meta name="description" content="Learn how AxelBase MD5 Generator uses spark-md5 and incremental hashing to compute MD5 entirely in your browser — even for files over 100 MB." />
	<meta property="og:title" content="How This Tool Computes MD5 in Your Browser | AxelBase" />
	<meta property="og:description" content="No server. No upload. Just pure client-side MD5 hashing using Web APIs and spark-md5. Here’s how it works under the hood." />
	<meta property="og:url" content="{base}/blog/posts/post2" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>How This Tool Computes MD5 in Your Browser</p>
	</div>

	<article class="prose">
		<h1>How This Tool Computes MD5 in Your Browser</h1>
		<p class="post-meta">Published: November 23, 2025</p>

		<p class="lead">
			You paste text or drop a 50 MB file — and in less than a second, you get the correct MD5 hash. No upload. No server. How?
		</p>

		<p>
			Welcome to the power of <strong>client-side cryptographic hashing</strong> using modern JavaScript.
		</p>

		<h2>The Core: spark-md5</h2>
		<p>
			We use <code>spark-md5</code> — a lightweight (~5 KB), battle-tested pure JavaScript implementation of MD5 that supports <strong>incremental hashing</strong>.
		</p>

		<h2>Incremental Processing for Large Files</h2>
		<p>
			When you upload a large file, we don’t load it all into memory at once. Instead:
		</p>
		<ul>
			<li>The file is read in 2 MB chunks using <code>File.slice()</code></li>
			<li>Each chunk is fed to <code>SparkMD5.ArrayBuffer()</code></li>
			<li>The hash state is updated incrementally</li>
			<li>Result: even 500 MB files hash smoothly without freezing</li>
		</ul>

		<h2>Why Not Web Crypto API?</h2>
		<p>
			The browser’s <code>SubtleCrypto.digest('MD5')</code> exists — but only in very old browsers. Modern Chrome, Firefox, and Safari removed MD5 support for security reasons. So we rely on the proven spark-md5 library.
		</p>

		<h2>Privacy by Design</h2>
		<p>
			Every byte you hash stays in your browser. No telemetry. No analytics. No requests. The entire site is static — built with SvelteKit and deployed on GitHub Pages.
		</p>

		<p>
			This tool proves that powerful cryptographic utilities can (and should) run locally.
		</p>

		<hr class="my-5" />

		<p class="text-center">
			<a href="{base}/" class="btn btn-primary">Try It Now</a>
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
