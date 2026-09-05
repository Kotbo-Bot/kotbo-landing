<script lang="ts">
  /**
   * FAQ du comparatif.
   *
   * Les questions qui reviennent après le tableau, le calculateur et le
   * face-à-face - « d'accord, mais concrètement... ». Chaque réponse reste
   * alignée sur ce que `botMigrationService.ts` et `botRegistry.ts` font
   * réellement : la reprise de config est réelle mais partielle, les niveaux
   * des membres ne se transfèrent pas automatiquement, et DraftBot n'est pas
   * dans le registre de détection. Une FAQ qui promet plus que le produit ne
   * tient pas se paye à la première question posée en support.
   */
  import { ChevronDown } from '@lucide/svelte';
  import { slide } from 'svelte/transition';
  import { reveal } from '$lib/actions/reveal';
  import { track } from '$lib/funnel';

  const items = [
    {
      q: 'Kotbo remplace-t-il vraiment MEE6, Dyno ou Carl-bot ?',
      a: "Sur leur socle commun (modération, niveaux, rôles par réaction, logs), oui - Kotbo couvre ces fonctions nativement. Ce qu'il ajoute par-dessus (tickets, staff, candidatures, planning, économie) est justement ce que ces bots ne font pas, et qui pousse à en installer un deuxième à côté.",
    },
    {
      q: 'Puis-je garder mes autres bots à côté de Kotbo ?',
      a: "Oui, rien n'empêche de faire tourner plusieurs bots en parallèle. Le seul point d'attention : si deux bots répondent au même événement - un message de bienvenue, par exemple - il faut désactiver le doublon pour ne pas se retrouver avec deux messages.",
    },
    {
      q: 'Kotbo peut-il reprendre la configuration de mon ancien bot automatiquement ?',
      a: "En partie. À l'installation, Kotbo détecte les bots connus déjà présents sur le serveur (MEE6, Dyno, Carl-bot, Ticket Tool, YAGPDB, ProBot, Arcane, Tatsu, Amari, Wick, Sapphire...) et propose de reprendre ce qui est visible depuis Discord : rôles de niveau, salon de logs, catégorie de tickets. Rien n'est appliqué sans validation du staff.",
    },
    {
      q: 'Mes membres vont-ils perdre leurs niveaux en changeant de bot ?',
      a: "Non, ils peuvent être repris. L'onglet Import de la page Niveaux accepte un JSON (pseudo, niveau, XP par membre) : récupère le classement de ton ancien bot (export, capture d'écran, copier-coller), fais-le reformater par une IA au format attendu, colle le résultat - l'import se fait en quelques minutes, avec un aperçu avant validation. Kotbo peut en plus caler sa courbe de progression sur celle de MEE6 (formule publique, reproduite à moins de 6 % d'écart) pour que les paliers restent cohérents après la bascule.",
    },
    {
      q: 'Combien coûte Kotbo comparé à MEE6, Dyno ou Ticket Tool ?',
      a: "Kotbo démarre à 4,17 €/mois, contre environ 12 € pour MEE6, 15 € pour Dyno, ou 5 à 12 € pour Ticket Tool en formule payante. Le calculateur plus haut fait le total avec les bots que tu as vraiment sur ton serveur.",
    },
    {
      q: 'Kotbo est-il un bot français ?',
      a: 'Oui - développé, documenté et supporté en français, dashboard compris.',
    },
  ];

  let openItems = $state<Set<number>>(new Set([0]));

  function toggleItem(i: number) {
    const next = new Set(openItems);
    if (next.has(i)) {
      next.delete(i);
    } else {
      next.add(i);
      // Une question ouverte volontairement est un signal d'hesitation : c'est
      // ce que le visiteur voulait savoir avant de decider. Seule l'ouverture
      // compte, pas la fermeture, et la premiere question est deja depliee.
      track('faq_opened', { content: `q${i}` });
    }
    openItems = next;
  }
</script>

<section class="py-16 lg:py-24 bg-white">
  <div class="max-w-3xl mx-auto px-8">

    <div use:reveal={{ direction: 'up' }} class="text-center mb-10">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-5">Questions fréquentes</p>
      <h2 class="text-2xl md:text-4xl font-black tracking-tight text-gray-900 font-headline leading-[1.1]">
        Les questions qui reviennent.
      </h2>
    </div>

    <div use:reveal={{ direction: 'up', delay: 60 }} class="flex flex-col gap-3">
      {#each items as item, i (item.q)}
        <div class="rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
          <button
            type="button"
            onclick={() => toggleItem(i)}
            aria-expanded={openItems.has(i)}
            class="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5 cursor-pointer hover:bg-gray-50/80 transition-colors"
          >
            <span class="font-black text-gray-900 text-base sm:text-lg">{item.q}</span>
            <ChevronDown
              class="w-5 undefined text-gray-400 shrink-0 transition-transform duration-300 {openItems.has(i) ? 'rotate-180' : ''}"
              strokeWidth={3}
            />
          </button>
          {#if openItems.has(i)}
            <div transition:slide={{ duration: 250 }}>
              <p class="px-5 pb-5 sm:px-6 sm:pb-6 text-gray-500 font-medium leading-relaxed">
                {item.a}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
