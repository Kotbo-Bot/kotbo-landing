<script lang="ts">
  let { text = "", color = "yellow", rotation = 0, class: className = "", children } = $props();
  
  const colors: Record<string, string> = {
    yellow: "bg-[var(--color-postit-yellow)]",
    blue: "bg-[var(--color-postit-blue)]",
    pink: "bg-[var(--color-postit-pink)]"
  };
</script>

<div 
  class="relative px-5 py-4 shadow-[var(--shadow-postit)] postit-tape flex flex-col gap-2 {colors[color]} {className}"
  style="transform: rotate({rotation}deg);"
>
  {#if text}
    <p class="font-hand text-2xl text-gray-800 leading-tight">
      {text}
    </p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
