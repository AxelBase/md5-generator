<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>The MD5 Algorithm: How 128 Bits Are Calculated | AxelBase</title>
	<meta name="description" content="Technical deep dive into message padding, the four MD5 rounds, and how any input becomes exactly 128 bits." />
	<meta property="og:title" content="The MD5 Algorithm Explained | AxelBase" />
	<meta property="og:description" content="From padding to final addition: the complete step-by-step process of the MD5 hash function." />
	<meta property="og:url" content="{base}/blog/posts/post7" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>The MD5 Algorithm: How 128 Bits Are Calculated</p>
	</div>

	<article class="prose">
		<h1>The MD5 Algorithm: How 128 Bits Are Calculated</h1>
		<p class="post-meta">Published: November 23, 2025</p>

		<p class="lead">
			Every string, file, or keystroke becomes exactly 32 hex characters. Here’s exactly how.
		</p>

		<h2>Step 1: Message Padding</h2>
		<p>
			Append a '1' bit, then enough '0' bits so length ≡ 448 (mod 512). Finally append original length as 64-bit little-endian integer.
		</p>

		<h2>Step 2: Initialize State</h2>
		<p>Four 32-bit variables (A, B, C, D) start with fixed magic constants:</p>
		<ul>
			<li>A = 0x67452301</li>
			<li>B = 0xefcdab89</li>
			<li>C = 0x98badcfe</li>
			<li>D = 0x10325476</li>
		</ul>

		<h2>Step 3: Four Rounds (64 Steps Total)</h2>
		<p>Each 512-bit block runs through four rounds using functions F, G, H, I and a sine-based constant table T[i].</p>

		<h2>Step 4: Final Addition</h2>
		<p>
			After all blocks: A, B, C, D are added to initial values → final 128-bit digest → little-endian → hex string.
		</p>

		<h2>Example: “hello world”</h2>
		<p>
			Becomes exactly <code>5eb63bbbe01eeed093cb22bb8f5acdc3</code> — forever, on any correct implementation.
		</p>

		<h2>Why Understanding This Matters</h2>
		<p>
			Knowing the algorithm explains both its incredible speed and why collisions are possible. It’s a beautiful piece of 1990s cryptography that still powers billions of checksums daily.
		</p>

		<hr class="my-5" />

		<p class="text-center">
			<a href="{base}/" class="btn btn-primary">Generate Your Own Hash</a>
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
