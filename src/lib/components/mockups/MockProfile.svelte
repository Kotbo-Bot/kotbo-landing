<script lang="ts">
  import Papicon from '../Papicon.svelte';
  import MetricCard from '../MetricCard.svelte';
</script>

<div class="space-y-6 font-body">
  <div class="relative overflow-hidden rounded-[2.5rem] border border-outline-variant/10 bg-surface-container-lowest shadow-2xl">
    <div class="relative h-32 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-amber-400 via-orange-500 to-rose-600 opacity-40 blur-3xl scale-150"></div>
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-surface-container-lowest"></div>
    </div>
    
    <div class="relative px-6 pb-6 -mt-16">
      <div class="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
        <div class="relative shrink-0">
          <div class="absolute -inset-2 bg-linear-to-br from-amber-400 via-orange-500 to-rose-600 rounded-[2rem] blur-xl opacity-40"></div>
          <div class="relative w-24 h-24 rounded-[1.5rem] border-[4px] border-surface-container-lowest shadow-xl overflow-hidden bg-surface-container-low">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arka" alt="Avatar" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="space-y-1 pb-1">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 class="text-3xl font-black text-on-surface tracking-tighter font-headline leading-none">
              Arka
            </h2>
            <span class="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-500/20 bg-surface-container-low/60 backdrop-blur-md px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-on-surface-variant shadow-sm">
              <Papicon icon="Crown" size={12} class="text-primary" />
              Fondateur
            </span>
          </div>
          <p class="text-sm text-on-surface-variant/60 font-bold">
            @arka_boss • <span class="font-mono text-[10px] opacity-50">23490234098234</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <MetricCard label="Messages" value="3452" note="Total envoyé" icon="MessageSquare" toneClass="bg-primary/10 text-primary" />
    <MetricCard label="Vocal" value="2075m" note="Temps passé" icon="Mic" toneClass="bg-secondary/10 text-secondary" />
  </div>

  <div class="rounded-[2.5rem] bg-surface-container-low/50 p-6 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
    <div class="absolute -right-8 -bottom-8 opacity-[0.03] rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
      <Papicon icon="User" size={120} />
    </div>
    
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Papicon icon="Badge" size={20} />
      </div>
      <div>
        <p class="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Carrière Staff</p>
        <h4 class="text-lg font-black text-on-surface">Identité & Ancienneté</h4>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Staff depuis</p>
        <p class="text-lg font-black text-on-surface">2 ans</p>
      </div>
      <div class="space-y-1">
        <p class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Statut Tuteur</p>
        <span class="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          Tuteur Actif
        </span>
      </div>
    </div>
  </div>
</div>
