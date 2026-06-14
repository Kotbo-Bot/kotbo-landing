<script lang="ts">
  import Papicon from '../Papicon.svelte';

  let { onNavigate }: {
    onNavigate?: (tab: string) => void;
  } = $props();
</script>

<div class="flex h-full flex-col gap-3 font-body text-on-surface">
  <div class="flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-low/50 p-4">
    <div class="flex items-center gap-3">
      <img src="/favicon.svg" alt="" class="size-10 rounded-xl shadow-sm"/>
      <div>
        <h2 class="text-base font-black">Bonjour, Arka !</h2>
        <p class="text-[8px] font-bold text-on-surface-variant/50">Tout fonctionne à merveille sur Kotbo Community.</p>
      </div>
    </div>
    <button class="rounded-xl bg-primary px-3 py-2 text-[7px] font-black text-white hover:bg-primary/95 transition-colors">
      Rafraîchir
    </button>
  </div>
  
  <div class="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-3">
    <!-- Inbox Widget -->
    <div class="sm:row-span-2 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 flex flex-col">
      <div class="flex items-center gap-2">
        <div class="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Papicon icon="inbox" size={15}/>
        </div>
        <div>
          <p class="text-sm font-black">Inbox</p>
          <p class="text-[7px] font-black uppercase text-primary">3 en attente</p>
        </div>
      </div>
      
      <div class="mt-4 space-y-2 flex-1 overflow-y-auto">
        <button 
          type="button"
          onclick={() => onNavigate && onNavigate('tickets')}
          class="w-full flex items-center gap-2 rounded-xl bg-surface-container-low p-2 text-left hover:bg-surface-container-high transition-colors"
        >
          <span class="size-1.5 rounded-full bg-primary shrink-0"></span>
          <p class="text-[8px] font-bold">Nouveau ticket de Maxou</p>
        </button>
        <button 
          type="button"
          onclick={() => onNavigate && onNavigate('sanction')}
          class="w-full flex items-center gap-2 rounded-xl bg-surface-container-low p-2 text-left hover:bg-surface-container-high transition-colors"
        >
          <span class="size-1.5 rounded-full bg-primary shrink-0"></span>
          <p class="text-[8px] font-bold">Rapport de sanction complété</p>
        </button>
        <button 
          type="button"
          onclick={() => onNavigate && onNavigate('staff')}
          class="w-full flex items-center gap-2 rounded-xl bg-surface-container-low p-2 text-left hover:bg-surface-container-high transition-colors"
        >
          <span class="size-1.5 rounded-full bg-primary shrink-0"></span>
          <p class="text-[8px] font-bold">Demande d’absence</p>
        </button>
      </div>
    </div>

    <!-- Messages Chart Widget -->
    <div class="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 flex flex-col">
      <div class="flex items-center justify-between">
        <p class="text-sm font-black">Messages</p>
        <span class="text-[8px] font-black text-emerald-600">+18%</span>
      </div>
      <p class="mt-1 text-2xl font-black tracking-tight">12 845</p>
      <div class="mt-2 flex h-8 items-end gap-1 flex-1">
        {#each [35,55,42,68,50,80,72] as h}
          <span class="flex-1 rounded-t bg-primary/20 hover:bg-primary/40 transition-colors" style="height:{h}%"></span>
        {/each}
      </div>
    </div>

    <!-- Staff / Tickets Stats Widget -->
    <div class="grid grid-cols-2 gap-2">
      <button 
        type="button"
        onclick={() => onNavigate && onNavigate('staff')}
        class="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-3 text-left hover:bg-surface-container-low transition-colors"
      >
        <p class="text-[7px] font-black uppercase text-on-surface-variant/40">Staff actif</p>
        <p class="mt-2 text-xl font-black leading-none">14</p>
      </button>
      <button 
        type="button"
        onclick={() => onNavigate && onNavigate('tickets')}
        class="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-3 text-left hover:bg-surface-container-low transition-colors"
      >
        <p class="text-[7px] font-black uppercase text-on-surface-variant/40">Tickets ouverts</p>
        <p class="mt-2 text-xl font-black leading-none">6</p>
      </button>
    </div>
  </div>
</div>
