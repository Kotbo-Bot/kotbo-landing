<script lang="ts">
  /**
   * Dernier appel avant le pied de page.
   *
   * Placé après le comparatif, les tarifs et la FAQ : le visiteur qui arrive
   * ici a vu ce que ça fait, ce que ça coûte, et a eu ses réponses. Il ne lui
   * manque que la permission de commencer. La section ne réexplique donc rien
   * - elle lève les deux objections qui restent à ce stade, « ça va me prendre
   * la journée » et « je m'engage ».
   *
   * Sur la forme, c'était jusqu'ici une bande sombre centrée avec deux boutons
   * : le bloc le plus interchangeable de la page, sur un site qui a par
   * ailleurs une identité forte. Il est repris ici dans la direction
   * artistique du reste - le tableau en pointillés du `body`, les post-it
   * scotchés, le marqueur, les flèches tracées à la main.
   *
   * D'où le fond transparent plutôt qu'un `bg-` : c'est la texture du `body`
   * (`--color-board` + grille de points) qui remonte, et les trois étapes sont
   * littéralement épinglées dessus. La page se termine sur sa propre métaphore
   * plutôt que sur un dégradé de plus.
   */
  import { reveal } from '$lib/actions/reveal';
  import { track } from '$lib/funnel';
  import PostIt from '$lib/components/ui/PostIt.svelte';
  import MarkerCircle from '$lib/components/ui/MarkerCircle.svelte';
  import HandDrawnArrow from '$lib/components/ui/HandDrawnArrow.svelte';

  interface Props {
    inviteUrl: string;
    salesUrl: string;
  }

  const { inviteUrl, salesUrl }: Props = $props();

  const TRIAL_DAYS = 15;

  /**
   * Trois post-it, trois objections. L'ordre est celui du parcours réel
   * (ajouter, configurer, décider) et non celui de l'argumentaire : c'est ce
   * qui rend la promesse « payez ensuite » vérifiable plutôt que jolie.
   */
  const steps = [
    {
      n: '1',
      color: 'yellow',
      rotation: -4,
      title: 'On ajoute le bot',
      body: "Aucune carte bancaire. Le dashboard s'ouvre dès que Kotbo rejoint le serveur.",
    },
    {
      n: '2',
      color: 'blue',
      rotation: 3,
      title: 'On configure tout',
      body: "Modules, staff, tickets, niveaux : le serveur se met en place entièrement, sans qu'on vous demande quoi que ce soit.",
    },
    {
      n: '3',
      color: 'pink',
      rotation: -2,
      title: 'On décide après',
      body: `Vous choisissez une offre quand le serveur tourne. ${TRIAL_DAYS} jours d'essai à ce moment-là, et rien à refaire.`,
    },
  ];
</script>

<section class="py-20 lg:py-28 relative overflow-hidden">
  <div class="max-w-[90rem] mx-auto px-8 relative">

    <div use:reveal={{ direction: 'up' }} class="text-center max-w-2xl mx-auto mb-20">
      <h2 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 font-headline leading-[1.12]">
        Installez Kotbo,<br />payez
        <MarkerCircle color="red" class="text-gray-900" animated>ensuite</MarkerCircle>.
      </h2>
      <p class="text-base lg:text-lg text-gray-500 font-bold leading-relaxed">
        Le serveur se monte en entier avant qu'on vous demande quoi que ce soit.
      </p>
    </div>

    <!-- Les trois etapes, epinglees sur le tableau. Les fleches ne sont
         tracees qu'a partir de lg : en dessous, les post-it s'empilent et une
         fleche horizontale pointerait dans le vide. -->
    <div class="relative max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
        {#each steps as step, i (step.n)}
          <div use:reveal={{ direction: 'up', delay: i * 110 }} class="relative flex justify-center">
            <!-- Pas de padding ici : celui du composant fait foi, deux
                 utilitaires concurrents se departageraient par l'ordre de la
                 feuille de style et non par celui du gabarit. -->
            <PostIt color={step.color} rotation={step.rotation} class="w-full max-w-[17rem]">
              <span
                class="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-gray-900 text-white font-hand text-xl
                       flex items-center justify-center shadow-md rotate-[-6deg] select-none"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <p class="font-hand text-2xl text-gray-800 leading-none mb-2">{step.title}</p>
              <p class="text-sm font-bold text-gray-700/80 leading-snug">{step.body}</p>
            </PostIt>

            {#if i < steps.length - 1}
              <HandDrawnArrow
                direction="right"
                stroke="var(--color-marker-red)"
                class="absolute top-1/2 -right-8 lg:-right-10 w-14 h-14 -translate-y-1/2 hidden md:block opacity-70 pointer-events-none"
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Appel final. Le bouton porte le contour trace a la main plutot qu'un
         rayon de 12px : c'est le dernier objet clique de la page, autant qu'il
         appartienne au meme dessin que le reste. -->
    <div use:reveal={{ direction: 'up', delay: 160 }} class="relative flex flex-col items-center mt-24">
      <div class="relative">
        <a
          href={inviteUrl}
          class="hand-drawn-border inline-block bg-gray-900 text-white px-10 py-5 font-black uppercase
                 tracking-widest text-sm hover:bg-indigo-600 transition-colors shadow-xl"
        >
          Ajouter le bot à mon serveur
        </a>

        <!-- Le mot qui leve la derniere hesitation, ecrit a la main a cote du
             bouton plutot que dans une puce de reassurance de plus. -->
        <div class="absolute -right-44 -top-6 hidden xl:block pointer-events-none select-none">
          <HandDrawnArrow
            direction="down-right"
            stroke="var(--color-marker-blue)"
            class="absolute -left-10 top-4 w-14 h-14 -scale-x-100 opacity-80"
          />
          <p class="font-hand text-2xl text-gray-500 rotate-[6deg] leading-tight">
            et pas de carte<br />bancaire
          </p>
        </div>
      </div>

      <a
        href={salesUrl}
        onclick={() => track('sales_clicked', { content: 'trial-cta' })}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-6 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
      >
        ou demander une démo
      </a>
    </div>
  </div>
</section>
