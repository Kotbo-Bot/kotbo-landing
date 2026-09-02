<script lang="ts">
  /**
   * Dernier appel avant le pied de page.
   *
   * Placé après le comparatif et les tarifs : le visiteur qui arrive ici a vu
   * ce que ça fait et ce que ça coûte, il ne lui manque que la permission de
   * commencer. La section ne réexplique donc rien - elle lève les deux objections
   * qui restent à ce stade, « ça va me prendre la journée » et « je m'engage ».
   */
  import { reveal } from '$lib/actions/reveal';
  import Emph from '$lib/components/ui/Emph.svelte';

  interface Props {
    inviteUrl: string;
    salesUrl: string;
  }

  const { inviteUrl, salesUrl }: Props = $props();

  const TRIAL_DAYS = 15;

  const reassurance = [
    { title: 'Rien à payer pour configurer', body: "Le serveur se met en place entièrement avant qu'on vous demande quoi que ce soit." },
    { title: 'Aucune carte pour commencer', body: "L'installation et le tableau de bord s'ouvrent dès l'ajout du bot." },
    { title: 'Rien à refaire ensuite', body: 'Les modules configurés s\'activent le jour où vous choisissez une offre.' },
  ];
</script>

<section class="py-28 lg:py-36 bg-gray-900 text-white relative overflow-hidden">
  <!-- Halo discret : la page est claire de bout en bout, cette section est la
       seule sombre. Un dégradé franc la ferait basculer dans un autre site. -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] bg-indigo-600/20 rounded-full blur-[140px]"></div>
  </div>

  <div class="max-w-[90rem] mx-auto px-8 relative">
    <div use:reveal={{ direction: 'up' }} class="text-center max-w-3xl mx-auto">
      <h2 class="text-4xl md:text-6xl font-black tracking-tight mb-6 font-headline leading-[1.08]">
        Installez Kotbo,<br />payez <Emph>ensuite</Emph>.
      </h2>
      <p class="text-lg lg:text-xl text-white/60 font-bold leading-relaxed mb-10">
        Ajoutez le bot, laissez-vous guider, et décidez une fois votre serveur en place.
        {TRIAL_DAYS} jours d'essai quand vous y arrivez.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <a
          href={inviteUrl}
          class="bg-white text-gray-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all hover:-translate-y-1 shadow-xl"
        >
          Ajouter le bot à mon serveur
        </a>
        <a
          href={salesUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:border-white/40 hover:bg-white/5 transition-all"
        >
          Demander une démo
        </a>
      </div>
    </div>

    <div use:reveal={{ direction: 'up', delay: 120 }} class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
      {#each reassurance as item}
        <div class="text-center sm:text-left">
          <p class="text-sm font-black tracking-tight mb-2">{item.title}</p>
          <p class="text-sm font-bold text-white/45 leading-relaxed">{item.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
