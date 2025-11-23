<script lang="ts">
	import { base } from '$app/paths';

const posts = [
	{ 
		href: '/blog/posts/post1', 
		title: 'Why MD5 Still Matters in 2025', 
		description: 'Even though broken for security, MD5 remains essential for checksums, file verification, and legacy systems.' 
	},
	{ 
		href: '/blog/posts/post2', 
		title: 'How This Tool Computes MD5 in Your Browser', 
		description: 'A deep dive into client-side hashing with spark-md5 and incremental processing for large files.' 
	},
	{ 
		href: '/blog/posts/post3', 
		title: 'Verifying File Integrity with MD5 Hashes', 
		description: 'Step-by-step guide to downloading files safely using MD5 checksums from trusted sources.' 
	},
	{ 
		href: '/blog/posts/post4', 
		title: 'MD5 vs SHA-256: When to Use Which', 
		description: 'Clear comparison of speed, use cases, and why MD5 is still preferred for non-security tasks.' 
	},
	{ 
		href: '/blog/posts/post5', 
		title: 'Handling Large Files (>10 MB) Without Freezing', 
		description: 'How incremental hashing works and why your browser never hangs on big inputs.' 
	},
	{ 
		href: '/blog/posts/post6', 
		title: 'Copy to Clipboard: Behind the Scenes', 
		description: 'How modern Clipboard API works and fallback strategies for older browsers.' 
	},
	{ 
		href: '/blog/posts/post7', 
		title: 'The MD5 Algorithm: How 128 Bits Are Calculated', 
		description: 'A technical breakdown of the four rounds, message padding, and Merkle–Damgård construction behind every MD5 hash.' 
	}
];
</script>

<svelte:head>
	<title>Blog | AxelBase MD5 Insights</title>
	<meta name="description" content="Learn about MD5 hashing, client-side tools, file verification, and best practices from the AxelBase MD5 Hash Generator team." />
</svelte:head>

<div class="container fade-in blog-index">
	<header class="blog-header">
		<h1>Blog: AxelBase MD5 Insights</h1>
		<p class="subtitle">
			Deep dives, tutorials, and updates about MD5 hashing, browser-based tools, and data integrity. 
			Follow development on our <a href="https://github.com/axelbase/your-repo-name" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
		</p>
	</header>

	<div class="posts-grid">
		{#each posts as post}
			<a href="{base}{post.href}" class="card post-card text-decoration-none h-100">
				<div class="card-body d-flex flex-column">
					<h2 class="post-title">{post.title}</h2>
					<p class="post-description flex-grow-1">{post.description}</p>
					<span class="read-more mt-auto">Read Article →</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.blog-index { padding: 2rem 0 4rem; }
	.blog-header { text-align: center; margin-bottom: 3rem; border-bottom: 1px solid var(--border-color); padding-bottom: 2rem; }
	.blog-header h1 { font-size: 2.8rem; margin-bottom: 1rem; }
	.subtitle { font-size: 1.1rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.7; }
	.posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
	.post-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
	.post-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
	.post-title { font-size: 1.25rem; color: var(--accent-secondary); margin-bottom: 0.75rem; }
	.post-description { color: var(--text-secondary); flex-grow: 1; margin-bottom: 1rem; }
	.read-more { color: var(--accent-primary); font-weight: 600; transition: transform 0.2s ease; }
	.post-card:hover .read-more { transform: translateX(5px); }
</style>