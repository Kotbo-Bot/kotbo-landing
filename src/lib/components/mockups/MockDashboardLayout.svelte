<script lang="ts">
  import Papicon from '../Papicon.svelte';

  let { children, activeTab = $bindable('overview'), onTabChange }: { 
    children?: import('svelte').Snippet, 
    activeTab?: string,
    onTabChange?: (tab: string) => void
  } = $props();

  const groups = [
    { label: 'Général', items: [['overview', 'home', 'Vue d’ensemble'], ['profile', 'user', 'Mon Profil']] },
    { label: 'Modération', items: [['sanction', 'shieldwarning', 'Sanctions'], ['logs', 'scroll-text', 'Logs']] },
    { label: 'Staff', items: [['tickets', 'message-square', 'Tickets'], ['staff', 'briefcase', 'Gestion du staff']] }
  ];

  function handleTabClick(tab: string) {
    activeTab = tab;
    if (onTabChange) {
      onTabChange(tab);
    }
  }
</script>

<div class="relative flex h-[660px] w-full overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-background font-body text-on-surface shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
  <aside class="flex h-full w-16 md:w-[220px] shrink-0 flex-col border-r border-outline-variant/20 bg-surface-container-lowest transition-all duration-300">
    <div class="flex items-center gap-3 px-3 md:px-5 pb-4 pt-5 justify-center md:justify-start">
      <img alt="" src="/favicon.svg" class="size-9 rounded-xl" />
      <div class="hidden md:block">
        <p class="text-sm font-black leading-none">Kotbo</p>
        <p class="mt-1 text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">Control center</p>
      </div>
    </div>
    <button 
      type="button"
      onclick={() => handleTabClick('overview')}
      class="mx-2 md:mx-3 flex items-center justify-center md:justify-start gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low p-2 md:px-3 md:py-2 text-left hover:bg-surface-container-high transition-colors"
    >
      <div class="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary text-[9px] font-black text-white">K</div>
      <span class="truncate text-[10px] font-black hidden md:block">Kotbo Community</span>
      <Papicon icon="chevron-down" size={11} class="ml-auto text-on-surface-variant/50 hidden md:block" />
    </button>
    <nav class="flex-1 space-y-4 overflow-hidden px-2 md:px-3 py-4">
      {#each groups as group}
        <div>
          <p class="mb-1.5 px-2 text-[8px] font-black uppercase tracking-[0.18em] text-on-surface-variant/35 hidden md:block">{group.label}</p>
          <div class="space-y-0.5">
            {#each group.items as item}
              <button
                type="button"
                onclick={() => handleTabClick(item[0])}
                class="w-full flex items-center justify-center md:justify-start gap-2.5 rounded-xl p-2 md:px-2.5 md:py-2 text-left transition-all duration-200 {activeTab === item[0] ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}"
                title={item[2]}
              >
                <Papicon icon={item[1]} size={14} class="shrink-0" />
                <span class="text-[10px] font-bold hidden md:block">{item[2]}</span>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </nav>
  </aside>

  <main class="flex min-w-0 flex-1 flex-col">
    <header class="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant/20 bg-surface/80 px-4 md:px-6 backdrop-blur-md">
      <div class="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low px-2 py-1.5 md:px-3 md:py-2">
        <div class="size-5 rounded-md bg-primary/15 shrink-0"></div>
        <span class="text-[10px] font-black hidden sm:block">Kotbo Community</span>
        <Papicon icon="chevron-down" size={11} class="shrink-0" />
      </div>
      <div class="flex items-center gap-3">
        <div class="flex size-8 items-center justify-center rounded-xl border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer"><Papicon icon="bell" size={14} /></div>
        <button
          type="button"
          onclick={() => handleTabClick('profile')}
          class="flex items-center gap-3 text-right hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          <div class="hidden sm:block">
            <p class="text-[10px] font-black text-on-surface">Arka</p>
            <p class="text-[7px] font-bold uppercase text-on-surface-variant/40">Gérant</p>
          </div>
          <div class="flex size-8 items-center justify-center rounded-xl bg-primary text-[10px] font-black text-white shadow-sm shadow-primary/20 shrink-0">A</div>
        </button>
      </div>
    </header>
    <div class="flex-1 overflow-y-auto bg-background p-5">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </main>
</div>
