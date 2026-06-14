<script lang="ts">
  let { title = "Kotbo", class: className = "", children } = $props();
</script>

<div class="bg-white rounded-xl shadow-[var(--shadow-card)] overflow-hidden border border-gray-100 flex flex-col {className}">
  <div class="h-10 bg-gray-50/80 border-b border-gray-100 flex items-center px-4 gap-2 shrink-0">
    <div class="flex gap-1.5 shrink-0">
      <div class="w-3 h-3 rounded-full bg-gray-300"></div>
      <div class="w-3 h-3 rounded-full bg-gray-300"></div>
      <div class="w-3 h-3 rounded-full bg-gray-300"></div>
    </div>
    <div class="mx-auto text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</div>
    <div class="w-10"></div> <!-- Spacer for centering -->
  </div>
  <div class="flex-1 bg-white p-5 overflow-hidden relative text-sm">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
