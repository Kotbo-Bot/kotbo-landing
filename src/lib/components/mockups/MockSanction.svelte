<script lang="ts">
  import Papicon from '../Papicon.svelte';

  // Reactive state for sanctions list
  let sanctions = $state([
    { type: 'BAN', target: 'ToxicoBoy', moderator: 'Admin_Lena', reason: 'Insultes répétées', status: 'Actif', statusColor: 'bg-emerald-500/10 text-emerald-600' },
    { type: 'TIMEOUT', target: 'Maxou', moderator: 'Zenox', reason: 'Spam en vocal', status: 'Terminé', statusColor: 'bg-slate-500/10 text-slate-600' },
    { type: 'WARN', target: 'Kylian', moderator: 'Admin_Lena', reason: 'Publicité non autorisée', status: 'Actif', statusColor: 'bg-emerald-500/10 text-emerald-600' }
  ]);

  let searchQuery = $state('');
  let showNewSanctionForm = $state(false);

  // Form inputs
  let newType = $state('BAN');
  let newTarget = $state('');
  let newReason = $state('');

  // Derived stats
  const activeCount = $derived(sanctions.filter(s => s.status === 'Actif').length);
  const totalCount = $derived(sanctions.length);

  const filteredSanctions = $derived(
    sanctions.filter(s => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        s.target.toLowerCase().includes(query) ||
        s.moderator.toLowerCase().includes(query) ||
        s.reason.toLowerCase().includes(query) ||
        s.type.toLowerCase().includes(query)
      );
    })
  );

  function createSanction(e: Event) {
    e.preventDefault();
    if (!newTarget.trim() || !newReason.trim()) return;

    sanctions = [
      {
        type: newType,
        target: newTarget.trim(),
        moderator: 'Arka',
        reason: newReason.trim(),
        status: 'Actif',
        statusColor: 'bg-emerald-500/10 text-emerald-600'
      },
      ...sanctions
    ];

    // Reset form
    newTarget = '';
    newReason = '';
    showNewSanctionForm = false;
  }
</script>

<div class="flex h-full flex-col gap-4 font-body text-on-surface">
  <div class="flex items-end justify-between">
    <div>
      <h2 class="text-xl font-black">Sanctions</h2>
      <p class="text-[9px] font-bold text-on-surface-variant/50">Suivi des sanctions et gestion des rapports.</p>
    </div>
    <button 
      onclick={() => showNewSanctionForm = !showNewSanctionForm}
      class="rounded-xl bg-primary px-3 py-2 text-[8px] font-black uppercase text-white hover:bg-primary/95 transition-all active:scale-95"
    >
      {showNewSanctionForm ? 'Fermer' : 'Nouvelle sanction'}
    </button>
  </div>

  <div class="grid grid-cols-3 gap-2">
    {#each [
      ['Sanctions actives', activeCount.toString(), 'shieldwarning'],
      ['Rapports complétés', totalCount.toString(), 'paper'],
      ['Cette semaine', '3', 'activity']
    ] as stat}
      <div class="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3 shadow-inner">
        <div class="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Papicon icon={stat[2]} size={13}/>
        </div>
        <div>
          <p class="text-[7px] font-black uppercase text-on-surface-variant/40">{stat[0]}</p>
          <p class="text-base font-black leading-tight">{stat[1]}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Content section with Toggle for Form / Table -->
  <div class="flex-1 overflow-hidden flex flex-col rounded-2xl border border-outline-variant/20 bg-surface-container-lowest relative">
    {#if showNewSanctionForm}
      <!-- Create Sanction Form -->
      <form onsubmit={createSanction} class="p-4 flex flex-col gap-3 h-full overflow-y-auto animate-in fade-in duration-300">
        <h3 class="text-xs font-black">Appliquer une modération</h3>
        
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <label for="sanction-type" class="text-[8px] font-black uppercase text-on-surface-variant/50">Type de sanction</label>
            <select 
              id="sanction-type"
              bind:value={newType} 
              class="rounded-lg border border-outline-variant/20 bg-surface px-2.5 py-1.5 text-[10px] font-bold outline-none"
            >
              <option value="BAN">BANNISSEMENT (BAN)</option>
              <option value="TIMEOUT">EXCLUSION (TIMEOUT)</option>
              <option value="WARN">AVERTISSEMENT (WARN)</option>
              <option value="KICK">EXPULSION (KICK)</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="sanction-target" class="text-[8px] font-black uppercase text-on-surface-variant/50">Cible (Pseudo)</label>
            <input 
              id="sanction-target"
              type="text" 
              bind:value={newTarget}
              placeholder="Ex: Maxou"
              class="rounded-lg border border-outline-variant/20 bg-surface px-2.5 py-1.5 text-[10px] font-bold outline-none placeholder-on-surface-variant/35"
              required
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="sanction-reason" class="text-[8px] font-black uppercase text-on-surface-variant/50">Raison de la sanction</label>
          <input 
            id="sanction-reason"
            type="text" 
            bind:value={newReason}
            placeholder="Ex: Insultes répétées dans le salon #général"
            class="rounded-lg border border-outline-variant/20 bg-surface px-2.5 py-1.5 text-[10px] font-bold outline-none placeholder-on-surface-variant/35"
            required
          />
        </div>

        <button 
          type="submit" 
          class="mt-2 rounded-xl bg-primary py-2 text-[8px] font-black uppercase text-white shadow-md hover:bg-primary/95 transition-all"
        >
          Créer la sanction
        </button>
      </form>
    {:else}
      <!-- Sanctions List / Table -->
      <div class="flex items-center justify-between border-b border-outline-variant/15 p-3">
        <p class="text-[10px] font-black">Liste des sanctions</p>
        <div class="relative w-48">
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Rechercher cible, raison…" 
            class="w-full rounded-lg border border-outline-variant/20 bg-surface px-2 py-1 text-[8px] font-bold outline-none placeholder-on-surface-variant/40"
          />
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-[0.8fr_1fr_0.8fr_0.8fr] sm:grid-cols-[0.8fr_1fr_1.1fr_1.6fr_0.8fr_0.8fr] gap-2 bg-surface-container/60 px-3 py-2 text-[6px] font-black uppercase text-on-surface-variant/45">
          <span>Type</span>
          <span>Cible</span>
          <span class="hidden sm:block">Modérateur</span>
          <span class="hidden sm:block">Raison</span>
          <span>Statut</span>
          <span>Rapport</span>
        </div>
        
        <div class="divide-y divide-outline-variant/10">
          {#each filteredSanctions as row}
            <div class="grid grid-cols-[0.8fr_1fr_0.8fr_0.8fr] sm:grid-cols-[0.8fr_1fr_1.1fr_1.6fr_0.8fr_0.8fr] items-center gap-2 px-3 py-2 text-[7px] animate-in slide-in-from-top-1 duration-200">
              <span class="font-black text-rose-600">{row.type}</span>
              <span class="font-bold truncate">@{row.target}</span>
              <span class="truncate hidden sm:block">{row.moderator}</span>
              <span class="truncate text-on-surface-variant/60 hidden sm:block">{row.reason}</span>
              <span>
                <span class="w-fit rounded-full px-1.5 py-0.5 font-black {row.statusColor}">{row.status}</span>
              </span>
              <span>
                <span class="rounded-lg bg-primary/10 px-1.5 py-1 text-center font-black text-primary cursor-pointer hover:bg-primary/15">Voir</span>
              </span>
            </div>
          {/each}
          {#if filteredSanctions.length === 0}
            <div class="py-8 text-center text-[8px] font-bold text-on-surface-variant/40">Aucune sanction trouvée</div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
