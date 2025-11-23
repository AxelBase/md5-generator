<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Verifying File Integrity with MD5 Hashes | AxelBase</title>
	<meta name="description" content="Learn how to use MD5 checksums to verify downloaded files are complete and untampered — a critical step in secure software distribution." />
	<meta property="og:title" content="Verifying File Integrity with MD5 Hashes | AxelBase" />
	<meta property="og:description" content="Step-by-step guide to using MD5 hashes to ensure your downloads are safe and complete. Works with any file from any source." />
	<meta property="og:url" content="{base}/blog/posts/post3" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Verifying File Integrity with MD5 Hashes</p>
	</div>

	<article class="prose">
		<h1>Verifying File Integrity with MD5 Hashes</h1>
		<p class="post-meta">Published: November 23, 2025</p>

		<p class="lead">
			You just downloaded a 4 GB Linux ISO. How do you know it wasn’t corrupted or tampered with in transit?
		</p>

		<p>
			<strong>Answer: Compare the MD5 hash.</strong>
		</p>

		<h2>Step-by-Step Verification Process</h2>
		<ol>
			<li>Visit the official download page</li>
			<li>Find the published MD5 checksum (usually in a .md5 or .txt file)</li>
			<li>Download the file</li>
			<li>Drop it into <a href="{base}/">AxelBase MD5 Generator</a></li>
			<li>Compare the generated hash with the official one</li>
		</ol>

		<h2>Real-World Examples</h2>
		<ul>
			<li>Ubuntu 24.04: <code>9e107d9d372bb6826bd81d3542a419d6</code></li>
			<li>Python 3.12 installer: <code>c5e7c4...</code></li>
			<li>Node.js binaries: Still ships MD5 + SHA256</li>
		</ul>

		<h2>Why It Matters</h2>
		<p>
			A single flipped bit during download can render an installer or archive unusable. MD5 catches that instantly. Even if an attacker modifies the file, the hash will no longer match.
		</p>

		<h2>Pro Tip</h2>
		<p>
			Many sites provide both MD5 and SHA-256. Use MD5 for speed during download verification — it’s faster and just as effective for integrity (not authenticity).
		</p>

		<p>
			<strong>Integrity ≠ Authenticity.</strong> MD5 verifies the file wasn’t corrupted. Digital signatures (GPG) verify it came from the real author.
		</p>

		<hr class="my-5" />

		<p class="text-center">
			<a href="{base}/" class="btn btn-primary">Verify a File Now</a>
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
