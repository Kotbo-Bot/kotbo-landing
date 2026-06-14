<script lang="ts">
  let { color = "red", class: className = "", children } = $props();
  const strokeColor = $derived(color === "red" ? "var(--color-marker-red)" : "var(--color-marker-blue)");
</script>

<div class="relative inline-block {className}">
  {#if children}
    {@render children()}
  {/if}
  <svg class="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
    <path 
      d="M20,50 C20,15 85,25 80,50 C75,75 15,85 25,50 C30,35 65,35 75,50" 
      fill="none" 
      stroke={strokeColor} 
      stroke-width="2.5" 
      stroke-linecap="round"
      class="opacity-70"
    />
  </svg>
</div>
