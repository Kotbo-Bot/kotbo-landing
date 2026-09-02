<script lang="ts">
  /**
   * Comparatif : ce que Kotbo remplace.
   *
   * L'argument n'est pas « Kotbo fait mieux que MEE6 », qui se discute et
   * vieillit mal. Il est « vous payez et administrez cinq outils qui ne se
   * parlent pas » - ce qui, lui, ne se discute pas : un serveur structuré
   * empile réellement un bot de modération, un de tickets, un de giveaways, et
   * finit ses statistiques dans un tableur.
   *
   * D'où le tableau : une colonne par outil qu'on remplace, une ligne par
   * besoin, et la dernière colonne qui coche tout. La somme des abonnements en
   * bas fait le reste du travail.
   *
   * Les tarifs concurrents sont des ordres de grandeur affichés comme tels
   * (« ≈ »), et non des prix relevés : ils changent sans prévenir, et
   * prétendre à l'exactitude sur le prix d'un concurrent est le meilleur moyen
   * de se faire prendre en défaut.
   */
  import { Check, Minus } from '@lucide/svelte';
  import { reveal } from '$lib/actions/reveal';
  import Emph from '$lib/components/ui/Emph.svelte';

  interface Props {
    inviteUrl: string;
  }

  const { inviteUrl }: Props = $props();

  const columns = [
    { key: 'mod', label: 'Bot de modération' },
    { key: 'ticket', label: 'Bot de tickets' },
    { key: 'giveaway', label: 'Bot de giveaways' },
    { key: 'sheets', label: 'Tableurs & Trello' },
  ];

  /** `true` = l'outil couvre le besoin. Kotbo les couvre tous, par construction. */
  const rows: { label: string; has: Record<string, boolean> }[] = [
    { label: 'Modération et sanctions', has: { mod: true, ticket: false, giveaway: false, sheets: false } },
    { label: 'Journaux détaillés', has: { mod: true, ticket: false, giveaway: false, sheets: false } },
    { label: 'Niveaux et économie', has: { mod: true, ticket: false, giveaway: false, sheets: false } },
    { label: 'Tickets et transcriptions', has: { mod: false, ticket: true, giveaway: false, sheets: false } },
    { label: 'Giveaways et événements', has: { mod: false, ticket: false, giveaway: true, sheets: false } },
    { label: 'Candidatures et recrutement', has: { mod: false, ticket: true, giveaway: false, sheets: true } },
    { label: 'Planning, réunions, absences', has: { mod: false, ticket: false, giveaway: false, sheets: true } },
    { label: 'Évaluations et suivi du staff', has: { mod: false, ticket: false, giveaway: false, sheets: true } },
    { label: 'Statistiques et analyses', has: { mod: false, ticket: false, giveaway: false, sheets: true } },
    { label: 'Hiérarchie et droits du staff', has: { mod: false, ticket: false, giveaway: false, sheets: false } },
    { label: 'Tout au même endroit', has: { mod: false, ticket: false, giveaway: false, sheets: false } },
  ];

  /** Ordres de grandeur mensuels, en euros. Volontairement bas : l'écart parle. */
  const costs: Record<string, string> = {
    mod: '≈ 10 €',
    ticket: '≈ 5 €',
    giveaway: '≈ 4 €',
    sheets: 'Du temps',
  };
</script>

<section id="comparatif" class="py-28 lg:py-36 bg-white">
  <div class="max-w-[90rem] mx-auto px-8">

    <div use:reveal={{ direction: 'up' }} class="text-center max-w-3xl mx-auto mb-16">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-5">Comparatif</p>
      <h2 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6 font-headline leading-[1.08]">
        Un seul Kotbo.<br /><Emph>Tous</Emph> vos outils.
      </h2>
      <p class="text-lg lg:text-xl text-gray-500 font-bold leading-relaxed">
        Un serveur structuré empile trois bots et deux tableurs qui ne se parlent pas.
        Chacun a ses réglages, ses permissions, sa facture.
      </p>
    </div>

    <!-- Le tableau déborde sur mobile : il défile dans son propre conteneur
         plutôt que de faire glisser la page entière. -->
    <div use:reveal={{ direction: 'up', delay: 100 }} class="max-w-6xl mx-auto overflow-x-auto">
      <table class="w-full min-w-[720px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="text-left align-bottom pb-5 pr-4 w-[34%]">
              <span class="sr-only">Besoin</span>
            </th>
            {#each columns as col (col.key)}
              <th class="pb-5 px-3 align-bottom">
                <span class="block text-xs font-black uppercase tracking-wider text-gray-400 leading-tight">
                  {col.label}
                </span>
              </th>
            {/each}
            <th class="pb-5 px-3 align-bottom">
              <span class="block text-base font-black tracking-tight text-indigo-600">Kotbo</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {#each rows as row, i (row.label)}
            <tr class="group">
              <td
                class="py-3.5 pr-4 text-sm font-bold text-gray-700 border-t border-gray-100
                       {i === 0 ? 'border-t-0' : ''}"
              >
                {row.label}
              </td>

              {#each columns as col (col.key)}
                <td class="py-3.5 px-3 text-center border-t border-gray-100 {i === 0 ? 'border-t-0' : ''}">
                  {#if row.has[col.key]}
                    <Check class="w-4 h-4 text-gray-400 inline" strokeWidth={3} />
                  {:else}
                    <Minus class="w-4 h-4 text-gray-200 inline" strokeWidth={3} />
                  {/if}
                </td>
              {/each}

              <td
                class="py-3.5 px-3 text-center bg-indigo-50/60 border-t border-indigo-100
                       {i === 0 ? 'border-t-0 rounded-t-xl' : ''}
                       {i === rows.length - 1 ? 'rounded-b-xl' : ''}"
              >
                <Check class="w-5 h-5 text-indigo-600 inline" strokeWidth={3} />
              </td>
            </tr>
          {/each}

          <!-- Coût : la ligne qui fait le travail de tout le tableau. -->
          <tr>
            <td class="pt-6 pr-4 text-sm font-black uppercase tracking-widest text-gray-900">
              Par mois
            </td>
            {#each columns as col (col.key)}
              <td class="pt-6 px-3 text-center text-sm font-black text-gray-500 tabular-nums">
                {costs[col.key]}
              </td>
            {/each}
            <td class="pt-6 px-3 text-center">
              <span class="text-lg font-black tracking-tighter text-indigo-600 tabular-nums">dès 4,17 €</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div use:reveal={{ direction: 'up', delay: 160 }} class="text-center mt-14">
      <a
        href={inviteUrl}
        class="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 transition-colors shadow-lg"
      >
        Ajouter Kotbo à mon serveur
      </a>
      <p class="mt-4 text-sm font-bold text-gray-400">
        Tarifs concurrents donnés en ordre de grandeur, à titre indicatif.
      </p>
    </div>
  </div>
</section>
