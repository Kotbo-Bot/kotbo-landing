<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from "$app/paths";
  import PostIt from "$lib/components/ui/PostIt.svelte";
  import MarkerCircle from "$lib/components/ui/MarkerCircle.svelte";
  import HandDrawnArrow from "$lib/components/ui/HandDrawnArrow.svelte";
  import { reveal } from '$lib/actions/reveal';

  import MockTickets from "$lib/components/mockups/MockTickets.svelte";
  import MockSanction from "$lib/components/mockups/MockSanction.svelte";
  import MockStaff from "$lib/components/mockups/MockStaff.svelte";
  import MockOverview from "$lib/components/mockups/MockOverview.svelte";
  import MockProfile from "$lib/components/mockups/MockProfile.svelte";
  import MockDashboardLayout from "$lib/components/mockups/MockDashboardLayout.svelte";

  import { Shield, FileText, CheckCircle2, User, ArrowLeft } from "@lucide/svelte";

  let staffView = $state('list');
  let profileUser = $state('Lena');
  let profileRole = $state('Responsable Staff');
  let profileAvatar = $state('Lena');

  let sandboxActiveTab = $state('overview');
  let sandboxProfileUser = $state('Arka');
  let sandboxProfileRole = $state('Fondateur');
  let sandboxProfileAvatar = $state('Arka');

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => { scrolled = window.scrollY > 30; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const workflowSection = document.getElementById('workflow');
    if (workflowSection) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            workflowSection.classList.add('timeline-visible');
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(workflowSection);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>Kotbo | Le centre de contrôle de ta communauté Discord</title>
  <meta name="description" content="Modération, staff, tickets, candidatures. Kotbo remplace tes tableurs et centralise l'organisation de ton serveur Discord." />
</svelte:head>

<div class="min-h-screen relative overflow-hidden text-gray-800 font-sans">

  <!-- Navigation sticky avec backdrop au scroll -->
  <div class="sticky top-0 z-50 transition-all duration-300" class:nav-scrolled={scrolled}>
    <nav class="max-w-[90rem] mx-auto px-8 py-6 flex justify-between items-center relative">
      <div class="flex items-center gap-3">
        <img src="{base}/favicon.svg" alt="Kotbo Logo" class="w-10 h-10 rounded-xl shadow-md" />
        <span class="font-black text-2xl tracking-tight text-gray-900">Kotbo</span>
      </div>
      <div class="hidden md:flex gap-8 font-bold text-sm text-gray-600">
        <a href="#features" class="hover:text-indigo-600 transition-colors">Modules</a>
        <a href="#demo" class="hover:text-indigo-600 transition-colors">Démo Interactive</a>
        <a href="#workflow" class="hover:text-indigo-600 transition-colors">Flow</a>
      </div>
      <button class="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-800 shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        Ajouter Kotbo
      </button>
    </nav>
  </div>

  <!-- Hero Section -->
  <section class="max-w-[90rem] mx-auto px-8 pt-12 lg:pt-20 pb-24 lg:pb-36 relative">
    <!-- Hero texte — entrance en cascade -->
    <div class="max-w-4xl mx-auto text-center mb-16 relative z-20">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-8 text-gray-900 hero-enter">
        Le centre de contrôle de ta <br class="hidden md:inline"/> <MarkerCircle color="blue" class="text-indigo-600" animated>communauté</MarkerCircle>.
      </h1>
      <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-bold hero-enter hero-delay-2">
        Modération, staff, tickets, candidatures, statistiques.
        Kotbo remplace tes tableurs et centralise toute l'organisation de ton serveur Discord.
      </p>
      <div class="flex justify-center gap-4 hero-enter hero-delay-3">
        <a href="#demo" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 text-center">
          Tester la Démo
        </a>
        <button class="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
          Voir la doc
        </button>
      </div>
    </div>

    <!-- Hero mockup — entre en fondu puis flotte en boucle -->
    <div class="flex justify-center items-center relative w-full z-10 hero-enter hero-delay-4">
      <div class="relative w-full max-w-[1240px] float">
        <!-- Post-it -->
        <div class="absolute -left-8 xl:-left-16 2xl:-left-32 -top-28 pointer-events-none hidden xl:block z-25 w-60">
          <PostIt text="Regarde ça, c'est le profil d'un mec" color="yellow" rotation={-8} class="w-60 py-4 px-5 shadow-2xl" textSize="text-2xl" />
          <div class="absolute left-44 top-20">
            <HandDrawnArrow direction="down-right" class="w-24 h-24 text-indigo-600 drop-shadow-md" />
          </div>
        </div>

        <!-- Sticky Tapes -->
        <div class="absolute -top-4 left-6 w-24 h-6 bg-yellow-100/70 border-x border-dashed border-yellow-300/30 rotate-[-12deg] shadow-xs backdrop-blur-xs z-25 pointer-events-none"></div>
        <div class="absolute -top-5 right-6 w-28 h-6 bg-yellow-100/70 border-x border-dashed border-yellow-300/30 rotate-[8deg] shadow-xs backdrop-blur-xs z-25 pointer-events-none"></div>

        <!-- Interactive Mock Profile Window -->
        <div class="relative w-full h-[750px] md:h-[840px] rounded-2xl shadow-[0_35px_80px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden bg-white border border-gray-200/80 z-10">
          <div class="flex items-center gap-2 px-5 py-3.5 bg-gray-50/80 border-b border-gray-200/60 select-none shrink-0">
            <div class="flex gap-1.5 shrink-0">
              <span class="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></span>
              <span class="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></span>
            </div>
            <div class="mx-auto text-[10px] font-black text-gray-400 font-sans tracking-widest uppercase">
              dashboard.kotbo.fr • Fiche Membre : Arka
            </div>
            <div class="w-12 shrink-0"></div>
          </div>
          <div class="flex-1 overflow-hidden relative">
            <MockProfile user="Arka" role="Fondateur" avatar="Arka" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Problem Section (Le Bazar) -->
  <section class="border-y-2 border-gray-200 bg-white/50 backdrop-blur-sm relative overflow-hidden py-24">
    <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: repeating-linear-gradient(45deg, var(--color-marker-red) 0, var(--color-marker-red) 2px, transparent 2px, transparent 100px);"></div>

    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div use:reveal={{ direction: 'up' }}>
        <h2 class="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900 font-headline">Gérer une grosse communauté, <br/>ça devient vite <span class="text-red-500 underline decoration-wavy">le bazar</span>.</h2>
        <p class="text-xl text-gray-500 font-bold max-w-xl mx-auto mb-16">
          Entre les signalements perdus, les sanctions non documentées et les tableurs à remplir à la main, l'organisation s'effondre.
        </p>
      </div>

      <!-- PostIts en cascade -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4 relative mt-12 pb-12">
        <div use:reveal={{ delay: 0, direction: 'up' }} class="relative flex justify-center">
          <PostIt text="Un joueur signale un abus en vocal" color="pink" rotation={-5} class="w-full max-w-[220px]" />
          <HandDrawnArrow direction="right" stroke="var(--color-marker-red)" class="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 hidden md:block z-10 opacity-60" />
        </div>

        <div use:reveal={{ delay: 100, direction: 'up' }} class="relative flex justify-center">
          <PostIt text="Qui s'en occupe ? Le salon d'aide est submergé..." color="yellow" rotation={4} class="w-full max-w-[220px]" />
          <HandDrawnArrow direction="right" stroke="var(--color-marker-red)" class="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 hidden md:block z-10 opacity-60" />
        </div>

        <div use:reveal={{ delay: 200, direction: 'up' }} class="relative flex justify-center">
          <PostIt text="Sanction appliquée à la hâte, sans screen archivé" color="blue" rotation={-3} class="w-full max-w-[220px]" />
          <HandDrawnArrow direction="right" stroke="var(--color-marker-red)" class="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 hidden md:block z-10 opacity-60" />
        </div>

        <div use:reveal={{ delay: 300, direction: 'up' }} class="relative flex justify-center">
          <PostIt text="Tableur Excel des bannis obsolète depuis 3 mois" color="pink" rotation={6} class="w-full max-w-[220px]" />
        </div>
      </div>
    </div>
  </section>

  <!-- Solution Section (L'Ordre) -->
  <section id="features" class="py-32 relative bg-white">
    <div class="max-w-[90rem] mx-auto px-8">
      <div use:reveal={{ direction: 'up' }} class="text-center mb-28 relative">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12">
          <MarkerCircle color="red" class="text-2xl font-bold font-hand text-red-600 px-4 py-1">Stop au chaos</MarkerCircle>
        </div>
        <h2 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6 font-headline">Kotbo regroupe tout dans un <br/>seul système organisé.</h2>
        <p class="text-xl text-gray-500 font-bold max-w-xl mx-auto">Visualisez les vrais écrans d'administration du bot ci-dessous.</p>
      </div>

      <!-- Feature 1: Staff — mockup slide depuis la gauche, texte depuis la droite -->
      <div class="grid lg:grid-cols-[1.35fr_0.65fr] gap-12 xl:gap-16 items-center">
        <div use:reveal={{ direction: 'left' }} class="order-2 lg:order-1 relative group">
          <div class="w-full transform -rotate-2 shadow-[0_25px_50px_rgba(0,0,0,0.08)] rounded-[2rem] border border-outline-variant/10 bg-white p-6 transition-transform duration-500 group-hover:rotate-0 flex flex-col h-[580px] overflow-hidden">
            {#if staffView === 'list'}
              <MockStaff onSelectMember={(n, r, a) => {
                profileUser = n;
                profileRole = r;
                profileAvatar = a;
                staffView = 'profile';
              }} />
            {:else}
              <div class="flex flex-col h-full animate-in fade-in duration-350">
                <button
                  type="button"
                  onclick={() => staffView = 'list'}
                  class="self-start flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-primary mb-3 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <ArrowLeft size={10} /> Retour à la liste
                </button>
                <div class="flex-1 overflow-y-auto pr-1">
                  <MockProfile user={profileUser} role={profileRole} avatar={profileAvatar} />
                </div>
              </div>
            {/if}
          </div>
          <PostIt text="Les vrais rôles, grades et stats du staff (cliquez sur Profil !)" color="blue" rotation={-5} class="absolute -bottom-10 -right-8 w-56 z-10 hidden xl:block" />
        </div>
        <div use:reveal={{ direction: 'right', delay: 120 }} class="order-1 lg:order-2 pl-0 lg:pl-10">
          <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield size={28} />
          </div>
          <h3 class="text-4xl font-black tracking-tight mb-6 text-gray-900">Une équipe maîtrisée</h3>
          <p class="text-gray-600 text-xl mb-8 leading-relaxed font-medium">
            Fini les incertitudes sur qui fait quoi. Kotbo regroupe les membres du staff, leurs grades, leur activité et leurs avertissements dans la même vue.
          </p>
          <ul class="space-y-4 font-bold text-gray-700 text-lg">
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Historique des actions staff</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Gestion fine des permissions</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Périodes de test et avertissements</li>
          </ul>
        </div>
      </div>

      <!-- Feature 2: Sanctions — texte depuis la gauche, mockup depuis la droite -->
      <div class="grid lg:grid-cols-[0.65fr_1.35fr] gap-12 xl:gap-16 items-center mt-40">
        <div use:reveal={{ direction: 'left' }} class="pr-0 lg:pr-10">
          <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
            <FileText size={28} />
          </div>
          <h3 class="text-4xl font-black tracking-tight mb-6 text-gray-900">Modération chirurgicale</h3>
          <p class="text-gray-600 text-xl mb-8 leading-relaxed font-medium">
            Chaque sanction est documentée. Les preuves (screens, transcripts) sont attachées au rapport. Plus de "pourquoi il a été ban ?" 6 mois plus tard.
          </p>
          <ul class="space-y-4 font-bold text-gray-700 text-lg">
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Rapports détaillés avec preuves</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Historique infaillible par profil</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Automodération intelligente</li>
          </ul>
        </div>
        <div use:reveal={{ direction: 'right', delay: 120 }} class="relative group">
          <div class="w-full transform rotate-2 shadow-[0_25px_50px_rgba(0,0,0,0.08)] rounded-[2rem] border border-outline-variant/10 bg-white p-6 transition-transform duration-500 group-hover:rotate-0 flex flex-col h-[480px] overflow-hidden">
            <MockSanction />
          </div>
          <HandDrawnArrow direction="up-right" class="absolute -top-12 -left-12 w-24 h-24 hidden xl:block" />
          <PostIt text="Chaque sanction garde son rapport" color="yellow" rotation={10} class="absolute -top-16 -left-32 w-52 hidden xl:block" />
        </div>
      </div>

      <!-- Feature 3: Profil — mockup depuis la gauche, texte depuis la droite -->
      <div class="grid lg:grid-cols-[1.35fr_0.65fr] gap-12 xl:gap-16 items-center mt-40">
        <div use:reveal={{ direction: 'left' }} class="order-2 lg:order-1 relative group">
          <div class="w-full transform -rotate-2 transition-transform duration-500 group-hover:rotate-0 flex flex-col h-[720px] pointer-events-auto shadow-[0_35px_75px_rgba(0,0,0,0.14)] rounded-2xl overflow-hidden bg-white border border-gray-200/80">
            <div class="flex items-center gap-2 px-5 py-3.5 bg-gray-50/80 border-b border-gray-200/60 select-none shrink-0">
              <div class="flex gap-1.5 shrink-0">
                <span class="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></span>
                <span class="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></span>
              </div>
              <div class="mx-auto text-[10px] font-black text-gray-400 font-sans tracking-widest uppercase">
                dashboard.kotbo.fr • Fiche Membre : Arka
              </div>
              <div class="w-12 shrink-0"></div>
            </div>
            <div class="flex-1 overflow-hidden relative">
              <MockProfile user="Arka" role="Fondateur" avatar="Arka" />
            </div>
          </div>
          <PostIt text="Historique unifié et onglets interactifs" color="pink" rotation={4} class="absolute -bottom-10 -left-8 w-60 z-10 hidden xl:block" />
        </div>
        <div use:reveal={{ direction: 'right', delay: 120 }} class="order-1 lg:order-2 pl-0 lg:pl-10">
          <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <User size={28} />
          </div>
          <h3 class="text-4xl font-black tracking-tight mb-6 text-gray-900">Dossiers membres exhaustifs</h3>
          <p class="text-gray-600 text-xl mb-8 leading-relaxed font-medium">
            Accédez en un clic à l'historique complet d'un joueur. Nombre de messages envoyés, temps passé en vocal, logs d'activité récents, et sanctions appliquées : tout est réuni sur une seule fiche interactive.
          </p>
          <ul class="space-y-4 font-bold text-gray-700 text-lg">
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Profil d'activité (messages et vocal)</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Logs d'activité et audits détaillés</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Suivi de toutes les sanctions passées</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Sandbox -->
  <section id="demo" class="py-32 bg-gray-50 border-y border-gray-200 relative">
    <div use:reveal={{ direction: 'up' }} class="max-w-[70rem] mx-auto px-8 text-center mb-16">
      <div class="inline-block border-2 border-indigo-600 rounded-2xl px-6 py-2 mb-6 bg-white shadow-sm">
        <p class="text-xs font-black text-indigo-600 uppercase tracking-widest">Bac à sable interactif</p>
      </div>
      <h2 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">Essayez l'interface complète</h2>
      <p class="text-lg text-gray-600 max-w-xl mx-auto font-medium">
        Cliquez sur la barre latérale pour naviguer dans le dashboard, fermez ou répondez à des tickets, et ajoutez des sanctions.
      </p>
    </div>

    <div use:reveal={{ direction: 'up', delay: 150 }} class="max-w-[75rem] mx-auto px-6 relative">
      <div class="absolute -top-12 -left-12 pointer-events-none hidden lg:block z-10 w-24">
        <PostIt text="Clic !" color="yellow" rotation={-15} class="w-24 py-2 px-3 shadow-md" textSize="text-[11px]" />
        <HandDrawnArrow direction="down-right" class="w-12 h-12 mt-2 ml-4 text-indigo-600" />
      </div>

      <div class="w-full rounded-[2.5rem] bg-background shadow-2xl border border-outline-variant/15 overflow-hidden">
        <MockDashboardLayout bind:activeTab={sandboxActiveTab}>
          {#if sandboxActiveTab === 'overview'}
            <MockOverview onNavigate={(t) => sandboxActiveTab = t} />
          {:else if sandboxActiveTab === 'tickets'}
            <MockTickets />
          {:else if sandboxActiveTab === 'sanction'}
            <MockSanction />
          {:else if sandboxActiveTab === 'staff'}
            <MockStaff onSelectMember={(n, r, a) => {
              sandboxProfileUser = n;
              sandboxProfileRole = r;
              sandboxProfileAvatar = a;
              sandboxActiveTab = 'profile';
            }} />
          {:else if sandboxActiveTab === 'profile'}
            <MockProfile user={sandboxProfileUser} role={sandboxProfileRole} avatar={sandboxProfileAvatar} />
          {/if}
        </MockDashboardLayout>
      </div>
    </div>
  </section>

  <!-- Dans la vraie vie (Workflow) — timeline se dessine au scroll -->
  <section id="workflow" class="py-32 bg-gray-900 text-white relative">
    <div class="max-w-5xl mx-auto px-6">
      <h2 use:reveal={{ direction: 'up' }} class="text-4xl md:text-5xl font-black tracking-tight mb-24 text-center font-headline">Dans la vraie vie, ça donne quoi ?</h2>

      <div class="relative pl-8 md:pl-0">
        <!-- Ligne verticale qui se trace -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 md:-translate-x-1/2 timeline-track"></div>

        <!-- Step 1 -->
        <div use:reveal={{ direction: 'up', delay: 0 }} class="relative flex flex-col md:flex-row items-center mb-24">
          <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">1. Un membre ouvre un ticket</h4>
            <p class="text-gray-400 text-lg font-medium leading-relaxed">Le joueur toxique est signalé. Le ticket atterrit directement dans le centre de tri de Kotbo avec priorité haute.</p>
          </div>
          <div class="absolute left-0 md:left-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-900 transform -translate-x-[11px] md:-translate-x-1/2"></div>
          <div class="md:w-1/2 md:pl-16 w-full ml-8 md:ml-0 mt-6 md:mt-0">
            <div class="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-sm">
              <span class="text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-red-500/20">Urgent</span>
              <p class="text-xl font-black mt-4 text-white">Joueur toxique en vocal</p>
              <p class="text-sm text-gray-500 font-bold mt-2">Ticket #102 • Par Maxou</p>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div use:reveal={{ direction: 'up', delay: 100 }} class="relative flex flex-col md:flex-row-reverse items-center mb-24">
          <div class="md:w-1/2 md:pl-16 text-left w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">2. Modération et rapport</h4>
            <p class="text-gray-400 text-lg font-medium leading-relaxed">Le staff intervient, applique la sanction, et Kotbo génère le rapport avec les screens en pièce jointe.</p>
          </div>
          <div class="absolute left-0 md:left-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-900 transform -translate-x-[11px] md:-translate-x-1/2"></div>
          <div class="md:w-1/2 md:pr-16 w-full ml-8 md:ml-0 mt-6 md:mt-0 flex justify-end">
            <PostIt text="Dossier bouclé et archivé" color="yellow" rotation={-5} class="w-56 text-gray-900" />
          </div>
        </div>

        <!-- Step 3 -->
        <div use:reveal={{ direction: 'up', delay: 200 }} class="relative flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">3. Profil mis à jour</h4>
            <p class="text-gray-400 text-lg font-medium leading-relaxed">L'historique du membre garde la trace indélébile de la sanction. Le reste du staff est au courant.</p>
          </div>
          <div class="absolute left-0 md:left-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-900 transform -translate-x-[11px] md:-translate-x-1/2"></div>
          <div class="md:w-1/2 md:pl-16 w-full ml-8 md:ml-0 mt-6 md:mt-0">
            <div class="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-sm flex gap-4 items-start">
              <Shield size={24} class="text-red-500 mt-1 shrink-0" />
              <div>
                <span class="text-xs font-black text-red-500 uppercase tracking-widest">BAN (7 JOURS)</span>
                <p class="text-lg font-bold mt-1 text-white">Insultes répétées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Credibility & CTA -->
  <section class="py-32 relative overflow-hidden bg-white">
    <div use:reveal={{ direction: 'up' }} class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div class="inline-block border-4 border-gray-900 rounded-2xl px-10 py-5 mb-12 transform -rotate-2 hand-drawn-border bg-white shadow-2xl">
        <p class="text-xl font-black text-gray-900 uppercase tracking-widest">Pensé pour les staffs de 20+ membres</p>
      </div>

      <h2 class="text-5xl font-black tracking-tight mb-8 text-gray-900 font-headline">Prêt à professionnaliser <br/>ta communauté ?</h2>
      <p class="text-2xl text-gray-600 mb-12 font-bold">Rejoins les serveurs qui ont arrêté de bricoler avec des tableurs Excel.</p>

      <div class="flex flex-col sm:flex-row justify-center gap-6">
        <button class="bg-indigo-600 text-white px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
          Ajouter Kotbo à mon serveur
        </button>
        <button class="bg-white border-2 border-gray-200 text-gray-900 px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:border-gray-300 transition-colors cursor-pointer">
          Contact & Démo
        </button>
      </div>
    </div>

    <MarkerCircle color="blue" class="absolute bottom-10 left-10 w-40 h-40 opacity-20"><div class="w-full h-full"></div></MarkerCircle>
    <MarkerCircle color="red" class="absolute top-20 right-20 w-56 h-56 opacity-20"><div class="w-full h-full"></div></MarkerCircle>
  </section>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 py-10 text-center text-gray-500 text-sm font-bold">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <img src="{base}/favicon.svg" alt="Kotbo Logo" class="w-8 h-8 rounded-lg shadow-sm grayscale opacity-50" />
        <span class="font-black text-lg text-gray-400">Kotbo</span>
      </div>
      <p>© 2026 Kotbo. Le centre de contrôle Discord.</p>
      <div class="flex gap-6 uppercase tracking-widest text-[10px] font-black">
        <a href="{base}/" class="hover:text-gray-900 transition-colors">Twitter</a>
        <a href="{base}/" class="hover:text-gray-900 transition-colors">Discord</a>
        <a href="{base}/" class="hover:text-gray-900 transition-colors">Documentation</a>
      </div>
    </div>
  </footer>
</div>
