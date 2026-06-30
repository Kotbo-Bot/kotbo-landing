<script lang="ts">
  import Papicon from '../Papicon.svelte';

  let activeTab = $state('Sanctions');
  let searchQuery = $state('');

  const sanctions = [
    {
      type: 'BAN',     typeStyle: 'text-rose-600 bg-rose-50 border-rose-200',
      target: 'ToxicoBoy',  mod: 'Lena',  dur: 'Permanent',
      reason: 'Insultes répétées en vocal',
      status: 'ACTIF',    statusStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      type: 'TIMEOUT', typeStyle: 'text-amber-600 bg-amber-50 border-amber-200',
      target: 'Maxou',      mod: 'Zenox', dur: '1h',
      reason: 'Spam dans #général',
      status: 'EXPIRÉ',   statusStyle: 'bg-gray-100 text-gray-500 border-gray-200',
    },
    {
      type: 'WARN',    typeStyle: 'text-orange-500 bg-orange-50 border-orange-200',
      target: 'Kylian',     mod: 'Lena',  dur: '—',
      reason: 'Publicité non autorisée',
      status: 'ACTIF',    statusStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      type: 'KICK',    typeStyle: 'text-violet-600 bg-violet-50 border-violet-200',
      target: 'xX_hacker',  mod: 'Aiden', dur: '—',
      reason: 'Tentative de raid',
      status: 'RÉSOLU',   statusStyle: 'bg-blue-100 text-blue-600 border-blue-200',
    },
    {
      type: 'BAN',     typeStyle: 'text-rose-600 bg-rose-50 border-rose-200',
      target: 'SpamBot99',  mod: 'Zenox', dur: 'Permanent',
      reason: 'Bot de spam automatique',
      status: 'ACTIF',    statusStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
  ];

  const filtered = $derived(
    searchQuery.trim()
      ? sanctions.filter(s =>
          s.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : sanctions
  );
</script>

<div class="flex h-full flex-col font-body text-on-surface overflow-hidden">

  <!-- Header -->
  <div class="flex items-center justify-between border-b border-outline-variant/10 bg-linear-to-r from-surface-container/80 to-surface-container-low/50 px-5 py-3.5 shrink-0">
    <div class="flex items-center gap-3">
      <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
        <Papicon icon="shieldwarning" size={16} />
      </div>
      <div>
        <p class="text-sm font-black leading-tight">Sanctions</p>
        <p class="text-[9px] text-on-surface-variant/60">Historique des sanctions et rapports</p>
      </div>
    </div>
    <button class="rounded-lg border border-rose-500/20 bg-rose-500/8 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-rose-600">
      + Sanctionner
    </button>
  </div>

  {#if activeTab === 'Sanctions'}
    <!-- Search -->
    <div class="flex items-center gap-2 border-b border-outline-variant/10 px-5 py-3 shrink-0">
      <div class="relative flex-1">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Rechercher cible, raison, type…"
          class="w-full rounded-lg border border-outline-variant/20 bg-surface py-2 pl-8 pr-3 text-[10px] font-medium outline-none placeholder-on-surface-variant/40 transition focus:border-primary/40"
        />
        <Papicon icon="search" size={12} class="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none" />
      </div>
      <div class="flex gap-1.5">
        {#each ['Type', 'Statut'] as f}
          <button class="flex items-center gap-1 rounded-lg border border-outline-variant/20 bg-surface px-2.5 py-2 text-[9px] font-black uppercase tracking-wider text-on-surface-variant/60 hover:bg-surface-container-low transition">
            {f} <Papicon icon="chevron-down" size={9} />
          </button>
        {/each}
      </div>
    </div>

    <!-- Column headers -->
    <div class="grid grid-cols-[0.6fr_0.9fr_0.8fr_1.5fr_0.7fr_0.5fr] gap-x-3 border-b border-outline-variant/10 bg-surface-container/50 px-5 py-2.5 text-[8px] font-black uppercase tracking-widest text-on-surface-variant/45 shrink-0">
      <span>Type</span>
      <span>Cible</span>
      <span>Modérateur</span>
      <span>Raison</span>
      <span>Statut</span>
      <span>Rapport</span>
    </div>

    <!-- Rows -->
    <div class="flex-1 divide-y divide-outline-variant/8 overflow-y-auto">
      {#each filtered as s}
        <div class="group grid grid-cols-[0.6fr_0.9fr_0.8fr_1.5fr_0.7fr_0.5fr] gap-x-3 items-center px-5 py-3.5 transition-colors hover:bg-surface-container-low/40">
          <span class="rounded-full border px-2 py-1 text-[9px] font-black w-fit {s.typeStyle}">{s.type}</span>
          <span class="text-[11px] font-bold truncate">@{s.target}</span>
          <span class="text-[10px] text-on-surface-variant/70 truncate">{s.mod}</span>
          <span class="text-[10px] text-on-surface-variant/60 truncate">{s.reason}</span>
          <span class="rounded-full border px-2 py-1 text-[9px] font-black w-fit {s.statusStyle}">{s.status}</span>
          <span class="text-[10px] font-black text-primary cursor-pointer hover:underline">Voir</span>
        </div>
      {/each}
      {#if filtered.length === 0}
        <div class="py-12 text-center text-[10px] font-bold text-on-surface-variant/40">Aucune sanction trouvée</div>
      {/if}
    </div>

  {:else}
    <!-- Configuration tab -->
    <div class="flex-1 overflow-y-auto p-5 space-y-4">
      <div class="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
        <p class="text-[11px] font-black mb-3">Échelles progressives</p>
        <div class="space-y-3">
          {#each [
            { name: 'Spam', tiers: ['WARN', 'TIMEOUT 1h', 'BAN'] },
            { name: 'Toxicité', tiers: ['WARN', 'TIMEOUT 24h', 'KICK', 'BAN'] },
          ] as table}
            <div class="rounded-lg border border-outline-variant/15 p-3">
              <p class="text-[10px] font-black mb-2">{table.name}</p>
              <div class="flex gap-2 flex-wrap items-center">
                {#each table.tiers as tier, i}
                  <span class="flex items-center gap-1.5 text-[9px] font-black">
                    <span class="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-[8px] font-black">T{i + 1}</span>
                    <span class="rounded border border-outline-variant/20 bg-surface px-2 py-0.5 text-on-surface-variant/70">{tier}</span>
                    {#if i < table.tiers.length - 1}<span class="text-on-surface-variant/30">→</span>{/if}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 space-y-3">
        <p class="text-[11px] font-black mb-3">Options globales</p>
        {#each [
          ['Propagation multi-serveur', true],
          ['Génération de rapports auto', false],
          ['Notifier la cible par DM', true],
        ] as [label, on]}
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-medium text-on-surface-variant/80">{label}</span>
            <div class="w-9 h-5 rounded-full {on ? 'bg-primary' : 'bg-outline-variant/40'} relative transition-colors">
              <span class="absolute top-0.5 {on ? 'right-0.5' : 'left-0.5'} w-4 h-4 rounded-full bg-white shadow-sm transition-all"></span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
