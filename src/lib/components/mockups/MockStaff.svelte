<script lang="ts">
  import Papicon from '../Papicon.svelte';
</script>

<div class="flex flex-col h-full gap-4 font-body">
  <div class="flex justify-between items-center pb-2 mb-2 border-b border-outline-variant/10">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Papicon icon="Users" size={20} />
      </div>
      <div>
        <h3 class="text-lg font-black text-on-surface font-headline leading-none">Équipe</h3>
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Gestion et permissions</p>
      </div>
    </div>
    <button class="bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
      + Ajouter
    </button>
  </div>

  <div class="flex flex-col gap-2">
    <!-- Header -->
    <div class="grid grid-cols-12 gap-2 px-4 py-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">
      <div class="col-span-5">Membre</div>
      <div class="col-span-4">Grade</div>
      <div class="col-span-3 text-right">Activité</div>
    </div>
    
    <!-- Staff Item 1 -->
    <div class="grid grid-cols-12 gap-2 px-4 py-3 items-center rounded-[1.5rem] bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/10">
      <div class="col-span-5 flex items-center gap-3">
        <div class="relative shrink-0">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-black text-xs shadow-md">
            Z
          </div>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface-container-low bg-emerald-500"></div>
        </div>
        <span class="font-black text-sm text-on-surface truncate">Zenox</span>
      </div>
      
      <div class="col-span-4 flex items-center">
        <span class="px-2.5 py-1 bg-surface-container-high text-on-surface text-[8px] font-black uppercase tracking-wider rounded-lg truncate border border-outline-variant/10">
          Administrateur
        </span>
      </div>
      
      <div class="col-span-3 flex items-center justify-end gap-1.5 text-on-surface-variant/60">
        <Papicon icon="Activity" size={14} class="text-primary" />
        <span class="text-[10px] font-bold">452</span>
      </div>
    </div>

    <!-- Staff Item 2 -->
    <div class="grid grid-cols-12 gap-2 px-4 py-3 items-center rounded-[1.5rem] bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/10">
      <div class="col-span-5 flex items-center gap-3">
        <div class="relative shrink-0">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
            L
          </div>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface-container-low bg-rose-500"></div>
        </div>
        <span class="font-black text-sm text-on-surface truncate">Lena</span>
      </div>
      
      <div class="col-span-4 flex items-center">
        <span class="px-2.5 py-1 bg-surface-container-high text-on-surface text-[8px] font-black uppercase tracking-wider rounded-lg truncate border border-outline-variant/10">
          Responsable Staff
        </span>
      </div>
      
      <div class="col-span-3 flex items-center justify-end gap-1.5 text-on-surface-variant/60">
        <Papicon icon="Activity" size={14} class="text-primary" />
        <span class="text-[10px] font-bold">310</span>
      </div>
    </div>
  </div>
</div>
