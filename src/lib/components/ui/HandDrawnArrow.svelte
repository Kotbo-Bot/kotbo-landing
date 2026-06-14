<script lang="ts">
  let { direction = "down-right", class: className = "", stroke = "currentColor" } = $props();
  
  const paths: Record<string, string> = {
    "down-right": "M10,10 Q40,30 80,80 M65,80 L82,82 L75,65",
    "up-right": "M10,90 Q40,60 80,20 M65,20 L82,18 L75,35",
    "right": "M10,50 Q40,40 90,50 M75,40 L92,50 L75,60",
    "curved-down": "M10,10 C40,10 70,50 70,90 M55,75 L70,92 L85,75"
  };
</script>

<svg class="{className} opacity-80" viewBox="0 0 100 100" fill="none" {stroke} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d={paths[direction] || paths["down-right"]} />
</svg>
