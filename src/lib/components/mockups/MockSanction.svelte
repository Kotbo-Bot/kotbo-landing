<script lang="ts">
  import Papicon from '../Papicon.svelte';
</script>

<div class="flex flex-col h-full gap-4 font-body">
  <div class="rounded-[2.5rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm relative overflow-hidden">
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <Papicon icon="ShieldAlert" size={24} />
        </div>
        <div>
          <h4 class="text-lg font-black text-on-surface">Rapport #C-458</h4>
          <p class="text-[9px] font-black uppercase tracking-[0.2em] text-rose-500">Sanction appliquée sur <span class="text-on-surface font-mono">ToxicoBoy</span></p>
        </div>
      </div>
      <span class="px-3 py-1 bg-rose-500/10 text-rose-600 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">Ban (7j)</span>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="space-y-1">
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Date</p>
        <p class="text-sm font-bold text-on-surface">14 Juin 2026</p>
      </div>
      <div class="space-y-1">
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Modérateur</p>
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">L</div>
          <p class="text-sm font-bold text-on-surface">Admin_Lena</p>
        </div>
      </div>
    </div>

    <div class="bg-surface-container p-4 rounded-[1.5rem] border border-outline-variant/10 mb-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
      <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Motif</p>
      <p class="text-sm font-bold text-on-surface">"Insultes répétées et refus de coopération en vocal."</p>
    </div>

    <div>
      <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Preuves Jointes</p>
      <div class="flex gap-2">
        <div class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-3 py-2 shadow-sm hover:border-primary/40 transition-colors cursor-pointer">
          <Papicon icon="Image" size={14} class="text-blue-500" />
          <span class="text-[10px] font-bold text-on-surface truncate max-w-[100px]">capture-insulte.png</span>
        </div>
        <div class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-3 py-2 shadow-sm hover:border-primary/40 transition-colors cursor-pointer">
          <Papicon icon="FileText" size={14} class="text-on-surface-variant/60" />
          <span class="text-[10px] font-bold text-on-surface truncate max-w-[100px]">transcript.txt</span>
        </div>
      </div>
    </div>
  </div>
</div>
