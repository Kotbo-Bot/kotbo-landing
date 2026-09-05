<script lang="ts">
  /**
   * Tarifs.
   *
   * La grille Kotbo a une particularité qu'aucun tableau de coches ne sait
   * montrer : les offres payantes sont *identiques*. Elles ne diffèrent que par
   * la taille de serveur visée. Aligner trois colonnes de coches mentirait donc
   * par la forme - on afficherait des différences là où il n'y en a pas.
   *
   * D'où cette mise en page : ce qui est inclus est dit **une seule fois**, et
   * les cartes ne portent qu'un prix et une tranche. Le curseur fait le reste :
   * comme une seule offre est achetable par serveur (`planForMemberCount` côté
   * bot), donner sa taille suffit à répondre « voilà votre prix », sans laisser
   * le visiteur comparer des colonnes qu'il n'a de toute façon pas le choix de
   * prendre.
   */
  import { Check } from '@lucide/svelte';
  import { reveal } from '$lib/actions/reveal';
  import { track } from '$lib/funnel';
  import Emph from '$lib/components/ui/Emph.svelte';

  interface Props {
    /** Où mène « Ajouter le bot ». Défini une seule fois par la page hôte. */
    inviteUrl: string;
    /** Prise de rendez-vous commercial, pour l'offre sur mesure. */
    salesUrl: string;
  }

  const { inviteUrl, salesUrl }: Props = $props();

  /** Aligné sur `TRIAL_DAYS` du bot. */
  const TRIAL_DAYS = 15;

  let yearly = $state(false);

  /**
   * Position du curseur, 0 à 100. Ce n'est pas un nombre de membres : l'échelle
   * est logarithmique, sans quoi les 95 % de serveurs situés sous 10 000
   * membres se retrouveraient tassés sur le premier dixième de la course.
   */
  let slider = $state(38);

  /** 100 membres à un million, réparti à peu près régulièrement à l'oeil. */
  const memberCount = $derived(Math.round(100 * Math.pow(10_000, slider / 100)));

  const activeKey = $derived(
    memberCount > 100_000
      ? 'CUSTOM'
      : memberCount > 10_000
        ? 'ULTIMATE'
        : memberCount > 1_000
          ? 'PRO'
          : 'STARTER',
  );
  const customActive = $derived(activeKey === 'CUSTOM');

  /**
   * Montants en centimes, repris de `PLAN_REGISTRY`. En dur ici parce que la
   * landing est un site statique sans accès à `@kotbo/contracts` : une
   * divergence se verrait tout de suite, la page tarifs du dashboard affichant
   * les mêmes chiffres.
   */
  const tiers = [
    {
      key: 'STARTER',
      name: 'Starter',
      range: "Jusqu'à 1 000 membres",
      monthCents: 500,
      yearCents: 3_000,
      note: 'La très grande majorité des serveurs Discord.',
    },
    {
      key: 'PRO',
      name: 'Pro',
      range: 'De 1 001 à 10 000 membres',
      monthCents: 999,
      yearCents: 4_999,
      note: 'Les communautés déjà installées.',
    },
    {
      key: 'ULTIMATE',
      name: 'Ultimate',
      range: 'De 10 001 à 100 000 membres',
      monthCents: 2_500,
      yearCents: 14_999,
      note: 'Mêmes fonctionnalités, dimensionnées au volume.',
    },
  ];

  /** Nom de l'offre désignée par le curseur, hors sur mesure qui a sa propre carte. */
  const activeName = $derived(tiers.find((t) => t.key === activeKey)?.name ?? '');

  const euros = (cents: number) =>
    (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /** Mensuel équivalent d'un abonnement annuel, pour comparer à armes égales. */
  const perMonth = (yearCents: number) =>
    (yearCents / 12 / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /** Économie réelle de l'annuel, arrondie vers le bas : on ne gonfle pas. */
  const savingPercent = (monthCents: number, yearCents: number) =>
    Math.floor((1 - yearCents / (monthCents * 12)) * 100);

  const formatMembers = (n: number) =>
    n >= 1_000_000 ? '1 M+' : n.toLocaleString('fr-FR');

  /**
   * Dit une fois, au lieu de trois colonnes de coches identiques. Regroupé par
   * famille : la liste des modules serait illisible et vieillirait mal.
   */
  const included = [
    'Modération, sanctions et journaux',
    'Gestion du staff, réunions, absences',
    'Tickets et candidatures',
    'Niveaux, économie, événements',
    'Statistiques et analyses',
    'Intégrations YouTube, Twitch, workflows',
    'Tableau de bord web complet',
    'Les modules ajoutés plus tard',
  ];
</script>

<section id="pricing" class="py-20 lg:py-24 relative bg-gray-50 border-y border-gray-200/70">
  <div class="max-w-[90rem] mx-auto px-8">

    <!-- ── Titre ──────────────────────────────────────────────────────── -->
    <div use:reveal={{ direction: 'up' }} class="text-center max-w-3xl mx-auto mb-12">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-5">Tarifs</p>
      <h2 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 font-headline leading-[1.08]">
        Un seul produit.<br />Le prix suit la <Emph>taille</Emph> du serveur.
      </h2>
      <p class="text-base lg:text-lg text-gray-500 font-bold leading-relaxed">
        Toutes les offres contiennent tout Kotbo. Aucun module en option,
        aucune fonctionnalité réservée au palier au-dessus.
      </p>
    </div>

    <!-- ── Curseur : votre taille, votre prix ─────────────────────────── -->
    <div use:reveal={{ direction: 'up', delay: 60 }} class="max-w-2xl mx-auto mb-10">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm px-7 py-6">
        <div class="flex items-baseline justify-between mb-5 gap-4">
          <label for="member-slider" class="text-sm font-black uppercase tracking-widest text-gray-500">
            Votre serveur
          </label>
          <p class="text-xl font-black tracking-tighter text-gray-900 tabular-nums">
            {formatMembers(memberCount)} <span class="text-sm font-black text-gray-400">membres</span>
          </p>
        </div>

        <input
          id="member-slider"
          type="range"
          min="0"
          max="100"
          bind:value={slider}
          class="kotbo-range w-full"
          aria-label="Nombre de membres de votre serveur"
        />

        <p class="mt-4 text-sm font-bold text-gray-500">
          {#if activeKey === 'CUSTOM'}
            Au-delà de 100 000 membres, l'offre se construit avec vous.
          {:else}
            Votre offre : <span class="text-indigo-600">{activeName}</span>.
            C'est la seule que ce serveur puisse souscrire - le catalogue étant le même partout,
            payer plus n'ouvrirait rien de plus.
          {/if}
        </p>
      </div>
    </div>

    <!-- ── Mensuel / annuel ───────────────────────────────────────────── -->
    <div use:reveal={{ direction: 'up', delay: 80 }} class="flex justify-center mb-12">
      <div class="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <button
          type="button"
          onclick={() => (yearly = false)}
          class="px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-colors {yearly
            ? 'text-gray-500 hover:text-gray-800'
            : 'bg-gray-900 text-white'}"
        >
          Mensuel
        </button>
        <button
          type="button"
          onclick={() => (yearly = true)}
          class="px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-2 {yearly
            ? 'bg-gray-900 text-white'
            : 'text-gray-500 hover:text-gray-800'}"
        >
          Annuel
          <span class="text-[10px] px-1.5 py-0.5 rounded-md {yearly ? 'bg-white/15 text-white' : 'bg-indigo-50 text-indigo-600'}">
            -50 % min.
          </span>
        </button>
      </div>
    </div>

    <!-- ── Cartes ─────────────────────────────────────────────────────── -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">

      {#each tiers as tier, i (tier.key)}
        {@const active = activeKey === tier.key}
        <div
          use:reveal={{ direction: 'up', delay: 120 + i * 90 }}
          class="relative flex flex-col bg-white rounded-2xl p-8 lg:p-10 transition-all duration-300 {active
            ? 'border-2 border-indigo-600 shadow-xl shadow-indigo-100 md:-translate-y-1'
            : 'border border-gray-200 shadow-sm hover:shadow-lg'}"
        >
          {#if active}
            <span class="absolute -top-3 left-8 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full">
              Votre offre
            </span>
          {/if}

          <p class="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">{tier.range}</p>
          <h3 class="text-xl font-black tracking-tight text-gray-900 mb-6">{tier.name}</h3>

          <div class="mb-2 flex items-end gap-1.5">
            <span class="text-4xl font-black tracking-tighter text-gray-900 tabular-nums">
              {yearly ? perMonth(tier.yearCents) : euros(tier.monthCents)} €
            </span>
            <span class="text-sm font-black text-gray-400 pb-2">/ mois</span>
          </div>

          <p class="text-sm font-bold text-gray-500 mb-7 min-h-[2.75rem] leading-snug">
            {#if yearly}
              Soit {euros(tier.yearCents)} € par an,
              <span class="text-indigo-600">{savingPercent(tier.monthCents, tier.yearCents)} % de moins</span>
              qu'au mois.
            {:else}
              Sans engagement, résiliable à tout moment.
            {/if}
          </p>

          <a
            href={inviteUrl}
            class="block text-center px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors mb-5 {active
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'}"
          >
            Essayer {TRIAL_DAYS} jours
          </a>

          <p class="text-xs font-bold text-gray-400 text-center mt-auto">{tier.note}</p>
        </div>
      {/each}

      <!-- Sur mesure : aucun prix affiché, parce qu'il n'y en a pas. Une
           fourchette inventée ici se ferait démentir au rendez-vous. -->
      <div
        use:reveal={{ direction: 'up', delay: 390 }}
        class="relative flex flex-col bg-gray-900 text-white rounded-2xl p-8 lg:p-10 transition-all duration-300 {customActive
          ? 'ring-2 ring-indigo-400 shadow-2xl md:-translate-y-1'
          : 'shadow-xl'}"
      >
        {#if customActive}
          <span class="absolute -top-3 left-8 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full">
            Votre offre
          </span>
        {/if}

        <p class="text-[11px] font-black uppercase tracking-[0.18em] text-white/40 mb-2">Au-delà de 100 000 membres</p>
        <h3 class="text-xl font-black tracking-tight mb-6">Sur mesure</h3>

        <div class="mb-2">
          <span class="text-4xl font-black tracking-tighter">On en parle</span>
        </div>

        <p class="text-sm font-bold text-white/50 mb-7 min-h-[2.75rem] leading-snug">
          Volumétrie, infrastructure dédiée, marque blanche, partenariat.
        </p>

        <a
          href={salesUrl}
          onclick={() => track('sales_clicked', { content: 'pricing' })}
          target="_blank"
          rel="noopener noreferrer"
          class="block text-center bg-white text-gray-900 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-colors mb-5"
        >
          Prendre rendez-vous
        </a>

        <p class="text-xs font-bold text-white/40 text-center mt-auto">Conditions convenues au cas par cas.</p>
      </div>
    </div>

    <!-- ── Ce qui est inclus, dit une fois ────────────────────────────── -->
    <div use:reveal={{ direction: 'up', delay: 160 }} class="max-w-6xl mx-auto mt-6">
      <div class="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
        <p class="text-sm font-black uppercase tracking-widest text-gray-900 mb-7">
          Compris dans <span class="text-indigo-600">toutes</span> les offres payantes
        </p>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {#each included as item}
            <li class="flex items-start gap-2.5">
              <Check class="w-4 undefined text-indigo-600 shrink-0 mt-0.5" strokeWidth={3} />
              <span class="text-sm font-bold text-gray-600 leading-snug">{item}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- ── Mentions ───────────────────────────────────────────────────── -->
    <p use:reveal={{ direction: 'up', delay: 200 }} class="text-center text-sm font-bold text-gray-400 mt-10 max-w-2xl mx-auto leading-relaxed">
      {TRIAL_DAYS} jours d'essai, une fois par serveur. Configurez tout avant de payer :
      les modules se mettent en place dès l'installation et s'activent quand vous choisissez une offre.
      Prix hors taxes.
    </p>
  </div>
</section>

<style>
  /* Curseur : les navigateurs ne partagent aucun style natif, chacun a ses
     pseudo-éléments. Écrits à la main plutôt que laissés au défaut, qui jure
     avec le reste de la page. */
  .kotbo-range {
    -webkit-appearance: none;
    appearance: none;
    height: 0.5rem;
    border-radius: 999px;
    background: #e5e7eb;
    outline: none;
    cursor: pointer;
  }

  .kotbo-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    background: #4f46e5;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgb(79 70 229 / 0.4);
    cursor: grab;
  }

  .kotbo-range::-moz-range-thumb {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    background: #4f46e5;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgb(79 70 229 / 0.4);
    cursor: grab;
  }

  .kotbo-range:active::-webkit-slider-thumb { cursor: grabbing; }
  .kotbo-range:active::-moz-range-thumb { cursor: grabbing; }

  .kotbo-range:focus-visible {
    box-shadow: 0 0 0 3px rgb(79 70 229 / 0.35);
  }
</style>
