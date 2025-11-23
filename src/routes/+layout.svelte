<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';

	const paypalUsername = 'AxelLab427'; 
	const donationAmounts = [1, 3, 5, 10];
	let isDropdownOpen = false;

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function closeDropdown() {
		isDropdownOpen = false;
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent('click_outside'));
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	const currentYear = new Date().getFullYear();

	// --- Theme Toggle Logic ---
	function toggleTheme() {
		const current = document.body.getAttribute('data-bs-theme');
		const newTheme = current === 'dark' ? 'light' : 'dark';
		document.body.setAttribute('data-bs-theme', newTheme);
	}
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
	<nav class="container-fluid glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm" 
			 style="pointer-events: auto; max-width: 1400px;">
		
		<div class="d-flex align-items-center gap-3">
			<a href="{base}/" aria-label="Home" class="d-flex align-items-center text-decoration-none">
				<img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" width="36" height="36" class="rounded-circle shadow-sm me-2" />
				<span class="navbar-brand-text d-none d-sm-block">AxelBase</span>
			</a>

			<div style="width: 1px; height: 20px; background: var(--color-text-muted); opacity: 0.3; margin: 0 5px;"></div>

			<div class="bmac-nav-item" use:clickOutside on:click_outside={closeDropdown}>
				<button class="bmac-button" on:click={toggleDropdown}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
					</svg>
					<span class="d-none d-md-inline">Buy me a coffee</span>
				</button>
		
				{#if isDropdownOpen}
					<div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
						{#each donationAmounts as amount}
							<a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
								${amount}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="d-flex align-items-center gap-4">
			<ul class="nav d-none d-lg-flex align-items-center gap-3 m-0" style="list-style: none;">
				<li><a class="nav-link" href="{base}/">Home</a></li>
				<li><a class="nav-link" href="{base}/#about">About</a></li>
				<li><a class="nav-link" href="{base}/#howto">How to use</a></li>
				<li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
				<li><a class="nav-link" href="{base}/blog">Blog</a></li>
			</ul>

			<button 
				type="button" 
				class="btn btn-outline-primary d-flex align-items-center justify-content-center rounded-circle border-0"
				style="width: 40px; height: 40px; padding: 0; background: rgba(255,255,255,0.1);"
				on:click={toggleTheme}
				aria-label="Toggle dark mode"
			>
				<i class="bi bi-moon-stars-fill fs-5" id="theme-icon"></i>
			</button>

			<!-- FIXED: Added proper aria-label for hamburger menu -->
			<button 
				class="btn btn-link d-lg-none text-decoration-none p-0" 
				style="font-size: 1.5rem; color: var(--color-text-main);"
				aria-label="Open navigation menu"
				aria-expanded={false}
				aria-controls="mobile-nav"
			>
				<i class="bi bi-list"></i>
			</button>
		</div>
	</nav>
</header>

<div class="container my-5 content-wrapper" style="position: relative; z-index: 1;">
	<slot />
</div>

<footer class="text-center py-3 glass" style="border-top: 1px solid var(--glass-border); font-size: 0.85rem;">
	<div class="container d-flex justify-content-center align-items-center gap-3 text-muted">
		<span>© {currentYear} AxelBase MD5 Hash Generator</span>
		<span>|</span>
		<a href="{base}/privacy" class="text-decoration-none text-muted">Privacy</a>
		<span>|</span>
		<a href="{base}/terms" class="text-decoration-none text-muted">Terms</a>
	</div>
</footer>

<style>
	:global([data-bs-theme="dark"]) #theme-icon {
		transform: rotate(360deg); 
	}
	#theme-icon {
		transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
</style>