<script lang="ts">
  import Papicon from '../Papicon.svelte';
</script>

<div class="flex flex-col h-full gap-4 font-body">
  <div class="flex justify-between items-center bg-surface-container-low p-4 rounded-[2rem] border border-outline-variant/10 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Papicon icon="Inbox" size={20} />
      </div>
      <div>
        <h3 class="text-lg font-black text-on-surface font-headline leading-none">Centre de tri</h3>
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Tickets ouverts</p>
      </div>
    </div>
    <div class="flex gap-2">
      <button class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors">
        <Papicon icon="Search" size={14} />
      </button>
      <button class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors">
        <Papicon icon="Filter" size={14} />
      </button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <!-- Ticket Item 1 -->
    <div class="bg-surface-container-lowest border border-outline-variant/20 p-4 rounded-[1.5rem] hover:border-primary/40 transition-colors cursor-pointer group shadow-sm relative overflow-hidden">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2">
          <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50">#T-104</span>
          <span class="px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-lg bg-surface-container-high text-on-surface">Recrutement</span>
        </div>
        <span class="text-[9px] font-bold text-on-surface-variant/40">10 min</span>
      </div>
      
      <p class="text-sm font-black text-on-surface mb-3 group-hover:text-primary transition-colors">Candidature Staff</p>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">K</div>
          <span class="text-[10px] text-on-surface-variant font-bold">Kylian</span>
        </div>
        
        <div class="flex gap-1.5">
          <span class="px-2 py-0.5 text-[8px] font-black bg-rose-500/10 text-rose-600 rounded-md border border-rose-500/20 uppercase tracking-widest">Urgent</span>
          <span class="px-2 py-0.5 text-[8px] font-black bg-emerald-500/10 text-emerald-600 rounded-md border border-emerald-500/20 uppercase tracking-widest">Ouvert</span>
        </div>
      </div>
    </div>
    
    <!-- Ticket Item 2 -->
    <div class="bg-surface-container-lowest border border-outline-variant/20 p-4 rounded-[1.5rem] hover:border-primary/40 transition-colors cursor-pointer group shadow-sm relative overflow-hidden opacity-80">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2">
          <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50">#T-103</span>
          <span class="px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-lg bg-surface-container-high text-on-surface">Support</span>
        </div>
        <span class="text-[9px] font-bold text-on-surface-variant/40">2h</span>
      </div>
      
      <p class="text-sm font-black text-on-surface mb-3 group-hover:text-primary transition-colors">Problème de rôle VIP</p>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">S</div>
          <span class="text-[10px] text-on-surface-variant font-bold">Sarah</span>
        </div>
        
        <div class="flex gap-1.5">
          <span class="px-2 py-0.5 text-[8px] font-black bg-blue-500/10 text-blue-600 rounded-md border border-blue-500/20 uppercase tracking-widest">En cours</span>
        </div>
      </div>
    </div>
  </div>
</div>
