<script lang="ts">
  let {
    color = "red",
    class: className = "",
    children,
    px = 10,
    py = 4,
    animated = false
  } = $props();
  
  const strokeColor = $derived(color === "red" ? "var(--color-marker-red)" : "var(--color-marker-blue)");

  let width = $state(0);
  let height = $state(0);

  // Calculate the hand-drawn path dynamically based on the bound client width/height.
  // This keeps the end caps perfectly round/proportional instead of stretching them.
  const d = $derived.by(() => {
    if (!width || !height) return "";

    const w = width;
    const h = height;

    // Bounds for the path in pixel coordinates
    const xMin = -px;
    const xMax = w + px;
    const yMin = -py;
    const yMax = h + py;
    const yMid = h / 2;

    // Side curve radius scales with height to make a perfect oval loop,
    // but is capped at half the width to avoid overlap on very short words.
    const rX = Math.min(h / 2 + py, w / 2);
    const rY = h / 2 + py;

    // Pass 1: Start near middle-left, draw the top curve from left to right
    const p1x = xMin + rX;
    const p1y = yMin + 2;
    const p2x = xMax - rX;
    const p2y = yMin - 1;

    // Top wave control points (subtle organic curve)
    const cp1x = xMin + rX + (w - 2 * rX) * 0.35;
    const cp1y = yMin - 2;
    const cp2x = xMin + rX + (w - 2 * rX) * 0.65;
    const cp2y = yMin + 1;

    // Right cap 1: Semicircular loop using bezier quadrants
    const p3x = xMax;
    const p3y = yMid;
    const p4x = xMax - rX;
    const p4y = yMax - 2;

    const cp3x = p2x + rX * 0.552;
    const cp3y = p2y;
    const cp4x = p3x;
    const cp4y = p3y - rY * 0.552;

    const cp5x = p3x;
    const cp5y = p3y + rY * 0.552;
    const cp6x = p4x + rX * 0.552;
    const cp6y = p4y;

    // Bottom wave 1: Right to left
    const p5x = xMin + rX;
    const p5y = yMax + 1;

    // Bottom wave control points
    const cp7x = xMax - rX - (w - 2 * rX) * 0.35;
    const cp7y = yMax + 2;
    const cp8x = xMax - rX - (w - 2 * rX) * 0.65;
    const cp8y = yMax - 1;

    // Left cap 1: Loop back around the left side
    const p7x = xMin;
    const p7y = yMid;
    const p6x = xMin + rX + 3; // slight horizontal overlap
    const p6y = yMin + 4; // slight vertical overlap

    const cp9x = p5x - rX * 0.552;
    const cp9y = p5y;
    const cp10x = p7x;
    const cp10y = p7y + rY * 0.552;

    const cp11x = p7x;
    const cp11y = p7y - rY * 0.552;
    const cp12x = p6x - rX * 0.552;
    const cp12y = p6y;

    // Pass 2: Overlapping top stroke to give that sketchy double-drawn look
    const p8x = xMin + rX + (w - 2 * rX) * 0.7;
    const p8y = yMin + 2;

    const cp13x = p6x + (w - 2 * rX) * 0.2;
    const cp13y = p6y - 1;
    const cp14x = p6x + (w - 2 * rX) * 0.5;
    const cp14y = p8y + 1;

    return `M ${p1x},${p1y} ` +
           `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2x},${p2y} ` +
           `C ${cp3x},${cp3y} ${cp4x},${cp4y} ${p3x},${p3y} ` +
           `C ${cp5x},${cp5y} ${cp6x},${cp6y} ${p4x},${p4y} ` +
           `C ${cp7x},${cp7y} ${cp8x},${cp8y} ${p5x},${p5y} ` +
           `C ${cp9x},${cp9y} ${cp10x},${cp10y} ${p7x},${p7y} ` +
           `C ${cp11x},${cp11y} ${cp12x},${cp12y} ${p6x},${p6y} ` +
           `C ${cp13x},${cp13y} ${cp14x},${cp14y} ${p8x},${p8y}`;
  });
</script>

<div class="relative inline-block {className}" bind:clientWidth={width} bind:clientHeight={height}>
  {#if children}
    {@render children()}
  {/if}
  {#if width > 0 && height > 0}
    <svg 
      class="absolute pointer-events-none overflow-visible" 
      style="left: {-px}px; top: {-py}px; width: {width + 2*px}px; height: {height + 2*py}px;" 
      viewBox="{-px} {-py} {width + 2*px} {height + 2*py}"
    >
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        stroke-width="3.5"
        stroke-linecap="round"
        pathLength={animated ? 1 : undefined}
        class="opacity-75 {animated ? 'marker-path-animated' : ''}"
      />
    </svg>
  {/if}
</div>
