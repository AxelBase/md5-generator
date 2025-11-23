<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Handling Large Files (>10 MB) Without Freezing | AxelBase</title>
	<meta name="description" content="Learn how AxelBase uses incremental hashing to process 100+ MB files smoothly in the browser without freezing or memory crashes." />
	<meta property="og:title" content="Handling Large Files Without Freezing | AxelBase" />
	<meta property="og:description" content="No more browser tabs locking up. See how chunked, incremental MD5 hashing works under the hood." />
	<meta property="og:url" content="{base}/blog/posts/post5" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Handling Large Files Without Freezing</p>
	</div>

	<article class="prose">
		<h1>Handling Large Files (>10 MB) Without Freezing</h1>
		<p class="post-meta">Published: November 23, 2025</p>

		<p class="lead">
			Drop a 500 MB file into most online hash tools → tab freezes. Drop it here → hash appears in seconds.
		</p>

		<h2>The Problem with Naive Implementations</h2>
		<p>
			Many web tools do this:
		</p>
		<ul>
			<li>Read entire file into memory with <code>FileReader.readAsArrayBuffer()</code></li>
			<li>Try to process 1 GB+ at once</li>
			<li>Browser main thread blocks → tab becomes unresponsive</li>
		</ul>

		<h2>Our Solution: Incremental + Chunked Hashing</h2>
		<p>We process files in 2 MB chunks:</p>
		<ol>
			<li><code>file.slice(offset, offset + 2×1024×1024)</code></li>
			<li><code>await slice.arrayBuffer()</code></li>
			<li><code>spark.append(buffer)</code> → updates internal MD5 state</li>
			<li>Repeat until end of file</li>
		</ol>

		<p>
			Result: memory usage stays under 10 MB even for multi-gigabyte files. The UI remains fully responsive.
		</p>

		<h2>Real Performance Numbers</h2>
		<ul>
			<li>100 MB file → ~2.1 seconds</li>
			<li>1 GB file → ~18 seconds (still responsive)</li>
			<li>Tested on mid-range laptops and Android phones</li>
		</ul>

		<h2>Why This Matters</h2>
		<p>
			Developers regularly verify ISOs, VM images, game patches, and database dumps — all routinely over 1 GB.  
			You shouldn’t need a desktop tool for that in 2025.
		</p>

		<hr class="my-5" />

		<p class="text-center">
			<a href="{base}/" class="btn btn-primary">Try with a Big File</a>
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
