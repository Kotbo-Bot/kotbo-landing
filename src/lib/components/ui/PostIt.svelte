<script lang="ts">
  let { text = "", color = "yellow", rotation = 0, class: className = "", textSize = "text-2xl", children }: {
    text?: string;
    color?: string;
    rotation?: number;
    class?: string;
    textSize?: string;
    children?: import('svelte').Snippet;
  } = $props();
  
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
    <p class="font-hand {textSize} text-gray-800 leading-tight">
      {text}
    </p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
