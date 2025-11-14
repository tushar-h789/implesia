<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Cursor position states
	let cursorX = $state(0);
	let cursorY = $state(0);
	let cursorDotX = $state(0);
	let cursorDotY = $state(0);
	
	// Cursor state
	let isHovering = $state(false);
	let isVisible = $state(false);
	let isInitialized = $state(false);
	
	// Animation frame reference
	let animationFrameId: number | null = null;
	
	// Style element reference for cleanup
	let injectedStyle: HTMLStyleElement | null = null;

	// Smooth interpolation factor
	const SMOOTH_FACTOR = 0.15;

	/**
	 * Smooth cursor movement using requestAnimationFrame
	 */
	function updateCursor() {
		if (!isInitialized) return;
		
		// Smooth interpolation for main cursor (trailing effect)
		cursorX += (cursorDotX - cursorX) * SMOOTH_FACTOR;
		cursorY += (cursorDotY - cursorY) * SMOOTH_FACTOR;

		// Continue animation loop
		animationFrameId = requestAnimationFrame(updateCursor);
	}

	/**
	 * Handle mouse movement
	 */
	function handleMouseMove(event: MouseEvent) {
		isVisible = true;
		cursorDotX = event.clientX;
		cursorDotY = event.clientY;
	}

	/**
	 * Show cursor when mouse enters window
	 */
	function handleMouseEnter() {
		isVisible = true;
	}

	/**
	 * Hide cursor when mouse leaves window
	 */
	function handleMouseLeave() {
		isVisible = false;
	}

	/**
	 * Detect hover state on interactive elements
	 */
	function handleMouseOver(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target) return;

		const isInteractive = 
			target.tagName === 'A' ||
			target.tagName === 'BUTTON' ||
			target.closest('a') !== null ||
			target.closest('button') !== null ||
			target.getAttribute('role') === 'button' ||
			window.getComputedStyle(target).cursor === 'pointer';

		isHovering = isInteractive;
	}

	onMount(() => {
		// Only run in browser
		if (!browser) return;

		// Check if device supports hover
		const hasHover = window.matchMedia('(hover: hover)').matches;
		if (!hasHover) return;

		// Initialize position at center
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		
		cursorX = centerX;
		cursorY = centerY;
		cursorDotX = centerX;
		cursorDotY = centerY;
		
		// Initialize and show immediately
		isInitialized = true;
		isVisible = true;

		// Hide default cursor
		document.body.style.cursor = 'none';
		
		// Inject style to hide all cursors
		injectedStyle = document.createElement('style');
		injectedStyle.id = 'custom-cursor-style';
		injectedStyle.textContent = '* { cursor: none !important; }';
		document.head.appendChild(injectedStyle);

		// Add event listeners
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
		window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
		window.addEventListener('mouseover', handleMouseOver, { passive: true });

		// Start animation
		updateCursor();
	});

	onDestroy(() => {
		if (!browser) return;

		// Restore cursor
		if (document.body) {
			document.body.style.cursor = '';
		}
		
		// Remove injected style
		if (injectedStyle && injectedStyle.parentNode) {
			injectedStyle.parentNode.removeChild(injectedStyle);
		}

		// Remove listeners
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseenter', handleMouseEnter);
		window.removeEventListener('mouseleave', handleMouseLeave);
		window.removeEventListener('mouseover', handleMouseOver);

		// Cancel animation
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

{#if isInitialized}
	<div
		class="custom-cursor"
		class:visible={isVisible}
		class:hovering={isHovering}
		style="left: {cursorX}px; top: {cursorY}px;"
		aria-hidden="true"
	>
		<div class="cursor-ring"></div>
		<div 
			class="cursor-dot"
			style="left: {cursorDotX - cursorX}px; top: {cursorDotY - cursorY}px;"
		></div>
	</div>
{/if}

<style>
	.custom-cursor {
		position: fixed;
		pointer-events: none;
		z-index: 999999;
		opacity: 0;
		transition: opacity 0.15s ease;
		transform: translate(-50%, -50%);
	}

	.custom-cursor.visible {
		opacity: 1;
	}

	.cursor-ring {
		position: absolute;
		width: 40px;
		height: 40px;
		border: 2px solid rgba(11, 193, 192, 0.7);
		border-radius: 50%;
		background: rgba(11, 193, 192, 0.05);
		transform: translate(-50%, -50%);
		transition: all 0.3s ease;
		box-shadow: 0 0 15px rgba(11, 193, 192, 0.3);
		filter: drop-shadow(0 0 6px rgba(11, 193, 192, 0.4));
	}

	.cursor-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		background: rgba(11, 193, 192, 0.85);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: all 0.2s ease;
		box-shadow: 0 0 12px rgba(11, 193, 192, 0.6);
		filter: drop-shadow(0 0 3px rgba(11, 193, 192, 0.7));
	}

	/* Hover state */
	.custom-cursor.hovering .cursor-ring {
		width: 60px;
		height: 60px;
		border-color: rgba(11, 193, 192, 0.85);
		background: rgba(11, 193, 192, 0.12);
		box-shadow: 0 0 20px rgba(11, 193, 192, 0.5);
	}

	.custom-cursor.hovering .cursor-dot {
		width: 12px;
		height: 12px;
		background: rgba(11, 193, 192, 0.9);
		box-shadow: 0 0 15px rgba(11, 193, 192, 0.7);
	}

	/* Hide on touch devices */
	@media (hover: none) {
		.custom-cursor {
			display: none !important;
		}
	}

	/* Performance */
	.cursor-ring,
	.cursor-dot {
		will-change: transform, width, height;
		pointer-events: none;
		user-select: none;
	}
</style>
