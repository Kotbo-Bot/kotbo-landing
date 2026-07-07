<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from "$app/paths";
  import PostIt from "$lib/components/ui/PostIt.svelte";
  import MarkerCircle from "$lib/components/ui/MarkerCircle.svelte";
  import HandDrawnArrow from "$lib/components/ui/HandDrawnArrow.svelte";
  import { reveal } from '$lib/actions/reveal';
  import { mockAvatar } from '$lib/mockMedia';

  import MockSanction from "$lib/components/mockups/MockSanction.svelte";
  import MockStaff from "$lib/components/mockups/MockStaff.svelte";
  import MockProfile from "$lib/components/mockups/MockProfile.svelte";

  import { Shield, FileText, CheckCircle2, User, Server, Users } from "@lucide/svelte";

  let scrolled = $state(false);
  let mx = $state(0);
  let my = $state(0);

  function onHeroMouseMove(e: MouseEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
  }

  function onHeroMouseLeave() {
    mx = 0;
    my = 0;
  }

  // Répulsion magnétique — chipNx/Ny sont les positions normalisées
  // des chips dans l'espace mx/my (-0.5 à +0.5, centre = 0)
  function chipRepel(chipNx: number, chipNy: number, maxPx: number) {
    const dx = mx - chipNx;
    const dy = my - chipNy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 0.30;
    if (dist >= radius) return { rx: 0, ry: 0, op: 1 };
    const t = 1 - dist / radius;
    const force = t * t * maxPx;
    const d = dist || 1e-4;
    return {
      rx: -(dx / d) * force,
      ry: -(dy / d) * force,
      op: 1 - t * t * 0.94,
    };
  }

  // Position approximative de chaque chip dans l'espace my
  // (le hero section inclut ~35% de texte en haut, puis ~65% de mockup)
  const rA = $derived(chipRepel( 0.44, -0.11, 210));
  const rB = $derived(chipRepel(-0.44,  0.32, 210));
  const rC = $derived(chipRepel( 0.44,  0.43, 210));
  const rD = $derived(chipRepel(-0.44,  0.08, 210));
  const rE = $derived(chipRepel( 0.44,  0.19, 210));

  // Ombre dynamique — lumière suit la souris
  const cardShadow = $derived(
    `${mx * -55}px ${my * -40}px 90px rgba(0,0,0,0.22), 0 8px 30px rgba(0,0,0,0.10)`
  );

  interface ServerStats {
    name: string;
    iconUrl: string;
    memberCount: number;
    description: string;
    note?: string;
  }

  interface StatsResponse {
    totalGuilds: number;
    totalUsers: number;
    servers: ServerStats[];
  }

  let stats = $state<StatsResponse | null>(null);
  let statsLoading = $state(true);
  let statsError = $state<string | null>(null);

  function formatCompact(n: number): string {
    if (n >= 1000) {
      const k = n / 1000;
      return `+${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
    }
    return `+${n}`;
  }

  const featuredServers = [
    {
      name: "Communauté Minecraft Fr",
      iconUrl: "https://cdn.discordapp.com/icons/506029988680695818/6fbbb2b172d8677d849cee9c80485cf8.webp?size=128",
      memberCount: 7690,
      description: "Le plus grand serveur communautaire Minecraft francophone. Survie, mini-jeux et entraide au quotidien.",
    },
    {
      name: "Jojo - Communauté",
      iconUrl: "https://cdn.discordapp.com/icons/913791560615854120/051ac19a35c8692f2ae8889ffa1fe7bf.webp?size=128",
      memberCount: 4375,
      description: "La communauté de Jojo est très accueillante ! Ici, vous pouvez discuter, échanger des idées ou même jouer ensemble.",
    },
    {
      name: "Zenode",
      iconUrl: "https://cdn.discordapp.com/icons/1386848639732809759/e3e252b02264eb99b526afb1c8d93eb0.webp?size=128",
      memberCount: 1846,
      description: "Zenode - Serveur de Développement De Bots et Serveurs Discord, entraide autour de Discord.",
    },
    {
      name: "Les nerds",
      iconUrl: "https://cdn.discordapp.com/icons/1477350874740424986/61bd3237903270c5db2581a313f6a701.webp?size=128",
      memberCount: 1109,
      description: "Espace d'échange et d'entraide pour passionnés d'informatique, de programmation et de technologies.",
    },
  ];

  async function fetchStats() {
    try {
      const res = await fetch('https://api.kotbo.fr/api/public/stats');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      stats = {
        totalGuilds: data.totalGuilds ?? 15,
        totalUsers: data.totalUsers ?? 17486,
        servers: data.servers ?? featuredServers,
      };
    } catch (err: any) {
      console.warn("Failed to fetch bot stats, using fallback:", err);
      statsError = err.message || "Failed to fetch stats";
      stats = {
        totalGuilds: 15,
        totalUsers: 17486,
        servers: featuredServers,
      };
    } finally {
      statsLoading = false;
    }
  }

  onMount(() => {
    fetchStats();

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
  <title>Kotbo — ERP et bot de gestion pour serveur Discord</title>
  <meta name="description" content="Kotbo est l'ERP Discord qui centralise la gestion de ton serveur : modération, staff, tickets, candidatures et statistiques dans un bot Discord tout-en-un." />
  <meta name="keywords" content="ERP Discord, bot Discord, bot de gestion Discord, bot modération Discord, gestion serveur Discord, dashboard Discord" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://kotbo.fr/" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="Kotbo" />
  <meta property="og:title" content="Kotbo — ERP et bot de gestion pour serveur Discord" />
  <meta property="og:description" content="Centralise la modération, le staff, les tickets, les candidatures et les statistiques de ton serveur avec un ERP Discord tout-en-un." />
  <meta property="og:url" content="https://kotbo.fr/" />

  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kotbo',
    url: 'https://kotbo.fr/',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Discord, Web',
    inLanguage: 'fr-FR',
    description: "ERP et bot Discord tout-en-un pour la gestion des communautés, du staff, de la modération, des tickets et des candidatures.",
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/LimitedAvailability',
      url: 'mailto:contact@kotbo.fr'
    }
  })}</script>`}
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
        <a href="#trust" class="hover:text-indigo-600 transition-colors">Communautés</a>
        <a href="#workflow" class="hover:text-indigo-600 transition-colors">Flow</a>
      </div>
      <a href="https://dash.kotbo.fr" target="_blank" rel="noopener noreferrer" class="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-800 shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        Aller au dashboard
      </a>
    </nav>
  </div>

  <!-- Hero Section -->
  <section
    class="max-w-[90rem] mx-auto px-8 pt-12 lg:pt-20 pb-24 lg:pb-36 relative"
    onmousemove={onHeroMouseMove}
    onmouseleave={onHeroMouseLeave}
  >
    <!-- Hero texte — entrance en cascade -->
    <div class="max-w-4xl mx-auto text-center mb-16 relative z-20">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-8 text-gray-900 hero-enter">
        Le centre de contrôle de ta <br class="hidden md:inline"/> <MarkerCircle color="blue" class="text-indigo-600" animated>communauté</MarkerCircle>.
      </h1>
      <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-bold hero-enter hero-delay-2">
        Modération, staff, tickets, candidatures, statistiques.
        Kotbo est l'ERP et bot Discord tout-en-un qui remplace tes tableurs et centralise l'organisation de ton serveur.
      </p>
      <div class="flex flex-wrap justify-center gap-4 hero-enter hero-delay-3">
        <a href="mailto:contact@kotbo.fr" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 text-center">
          Demander une démo
        </a>
        <a href="https://docs.kotbo.fr" target="_blank" rel="noopener" class="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:border-gray-300 hover:bg-gray-50 transition-all">
          Documentation
        </a>
      </div>
      <p class="mt-5 text-sm text-gray-400 font-bold hero-enter hero-delay-3">Bot privé · accès sur devis uniquement</p>
    </div>

    <!-- Hero mockup — parallaxe souris multicouche -->
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

        <!-- Chip A — Ticket #147 (droite, haut) -->
        <div class="absolute -right-3 lg:-right-10 xl:-right-20 top-[11%] z-20 pointer-events-none hidden sm:block chip-float-a">
          <div style="transform: translate({mx * 62 + rA.rx}px, {my * 44 + rA.ry}px); opacity: {rA.op}; transition: transform 0.12s cubic-bezier(0.22, 0.1, 0.36, 1), opacity 0.22s ease;">
            <div class="w-64 bg-white rounded-2xl overflow-hidden border border-gray-100 rotate-[1.5deg]" style="box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);">
              <div class="h-[3px] bg-red-500"></div>
              <div class="px-4 py-3.5">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Ticket #147</span>
                  <span class="text-[8px] font-black text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Urgent</span>
                </div>
                <p class="text-[12px] font-black text-gray-900 leading-snug mb-2.5">Joueur toxique en vocal</p>
                <div class="flex items-center gap-2">
                  <img src={mockAvatar('Maxou')} alt="" class="w-5 h-5 rounded-full bg-gray-100 shrink-0" />
                  <p class="text-[9px] text-gray-400 font-semibold">@Maxou · il y a 2 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chip B — Sanction BAN (gauche, bas) -->
        <div class="absolute -left-3 lg:-left-10 xl:-left-20 bottom-[26%] z-20 pointer-events-none hidden sm:block chip-float-b">
          <div style="transform: translate({mx * 44 + rB.rx}px, {my * 30 + rB.ry}px); opacity: {rB.op}; transition: transform 0.16s cubic-bezier(0.22, 0.1, 0.36, 1), opacity 0.22s ease;">
            <div class="w-60 bg-white rounded-2xl overflow-hidden border border-gray-100 -rotate-[1.5deg]" style="box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);">
              <div class="h-[3px] bg-amber-400"></div>
              <div class="px-4 py-3.5">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Sanction</span>
                  <span class="text-[8px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">BAN</span>
                </div>
                <p class="text-[12px] font-black text-gray-900 leading-snug mb-1">@ToxicoBoy</p>
                <p class="text-[9px] text-gray-400 font-semibold">Admin_Lena · Permanent</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chip C — Staff en ligne (droite, bas) -->
        <div class="absolute -right-3 lg:-right-8 xl:-right-14 bottom-[9%] z-20 pointer-events-none hidden md:block chip-float-c">
          <div style="transform: translate({mx * 88 + rC.rx}px, {my * 60 + rC.ry}px); opacity: {rC.op}; transition: transform 0.09s cubic-bezier(0.22, 0.1, 0.36, 1), opacity 0.22s ease;">
            <div class="bg-gray-950 rounded-2xl px-4 py-3 flex items-center gap-3 rotate-[1deg]" style="box-shadow: 0 20px 60px rgba(0,0,0,0.28);">
              <div class="flex -space-x-2 shrink-0">
                <img src={mockAvatar('Lena')} alt="" class="w-7 h-7 rounded-full border-[2.5px] border-gray-950 bg-gray-800" />
                <img src={mockAvatar('Zenox')} alt="" class="w-7 h-7 rounded-full border-[2.5px] border-gray-950 bg-gray-800" />
                <img src={mockAvatar('Aiden')} alt="" class="w-7 h-7 rounded-full border-[2.5px] border-gray-950 bg-gray-800" />
              </div>
              <div>
                <p class="text-[11px] font-black text-white leading-tight">3 modérateurs</p>
                <p class="text-[9px] text-gray-500 font-medium">En ligne</p>
              </div>
              <div class="relative ml-1 shrink-0">
                <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                <div class="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chip D — Messages stat (gauche, milieu) -->
        <div class="absolute -left-3 lg:-left-8 xl:-left-14 top-[38%] z-20 pointer-events-none hidden lg:block chip-float-d">
          <div style="transform: translate({mx * 28 + rD.rx}px, {my * 18 + rD.ry}px); opacity: {rD.op}; transition: transform 0.22s cubic-bezier(0.22, 0.1, 0.36, 1), opacity 0.22s ease;">
            <div class="bg-white rounded-2xl border border-gray-100 px-4 py-3.5 -rotate-[1deg]" style="box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);">
              <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">Messages aujourd'hui</p>
              <div class="flex items-baseline gap-2">
                <span class="text-[22px] font-black text-gray-900 leading-none tracking-tight">1 247</span>
                <span class="text-[10px] font-black text-emerald-500">+18 %</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chip E — Promotion (droite, milieu) -->
        <div class="absolute -right-3 lg:-right-8 xl:-right-16 top-[53%] z-20 pointer-events-none hidden lg:block chip-float-e">
          <div style="transform: translate({mx * 54 + rE.rx}px, {my * 36 + rE.ry}px); opacity: {rE.op}; transition: transform 0.14s cubic-bezier(0.22, 0.1, 0.36, 1), opacity 0.22s ease;">
            <div class="w-56 bg-white rounded-2xl overflow-hidden border border-gray-100 rotate-[1deg]" style="box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);">
              <div class="h-[3px] bg-indigo-500"></div>
              <div class="px-4 py-3.5">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Promotion</span>
                  <span class="text-[8px] font-black text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">Staff</span>
                </div>
                <p class="text-[12px] font-black text-gray-900 leading-snug mb-1">@Aiden promu</p>
                <p class="text-[9px] text-gray-400 font-semibold">Modérateur Senior · par Lena</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Couche 1 — MockProfile window · parallaxe minimal (fond de scène) -->
        <div
          class="relative w-full h-[820px] md:h-[920px] rounded-2xl flex flex-col overflow-hidden bg-white border border-gray-200/80 z-10"
          style="box-shadow: {cardShadow}; transform: perspective(1000px) rotateX({my * -5}deg) rotateY({mx * 7}deg); transition: transform 0.45s cubic-bezier(0.22, 0.1, 0.36, 1), box-shadow 0.45s ease;"
        >
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
      <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 xl:gap-16 items-center">
        <div use:reveal={{ direction: 'left' }} class="order-2 lg:order-1 relative group">
          <div class="w-full transform -rotate-2 shadow-[0_25px_50px_rgba(0,0,0,0.08)] rounded-[2rem] border border-outline-variant/10 bg-white p-0 transition-transform duration-500 group-hover:rotate-0 flex flex-col h-[580px] overflow-hidden">
            <MockStaff />
          </div>
          <PostIt text="Les vrais grades, stats et actions du staff" color="blue" rotation={-5} class="absolute -bottom-10 -right-8 w-56 z-10 hidden xl:block" />
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
      <div class="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 xl:gap-16 items-center mt-40">
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
          <div class="w-full transform rotate-2 shadow-[0_25px_50px_rgba(0,0,0,0.08)] rounded-[2rem] border border-outline-variant/10 bg-white p-0 transition-transform duration-500 group-hover:rotate-0 flex flex-col h-[480px] overflow-hidden">
            <MockSanction />
          </div>
          <HandDrawnArrow direction="up-right" class="absolute -top-12 -left-12 w-24 h-24 hidden xl:block" />
          <PostIt text="Chaque sanction garde son rapport" color="yellow" rotation={10} class="absolute -top-16 -left-32 w-52 hidden xl:block" />
        </div>
      </div>

      <!-- Feature 3: Modules — bento avec previews Discord -->
      <div class="mt-40">
        <div use:reveal={{ direction: 'up' }} class="text-center mb-16">
          <h3 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-5 font-headline">Un bot, une douzaine de modules.</h3>
          <p class="text-xl text-gray-500 font-bold max-w-xl mx-auto">Chaque module fait ce qu'il doit faire, et le fait bien. Voilà à quoi ça ressemble en vrai.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <!-- Tickets -->
          <div use:reveal={{ direction: 'up', delay: 0 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-blue-500">Tickets · Support</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Tickets de support complets</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Claim, escalade, transcripts HTML — tout sans quitter Discord.</p>
            </div>
            <!-- Discord embed preview -->
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex gap-0">
                <div class="w-1 bg-[#5865f2] shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                      <span class="text-white text-[7px] font-black">K</span>
                    </div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-white mb-0.5">Ticket #147 — Support général</p>
                  <p class="text-[8px] text-[#b9bbbe] mb-2.5">Ouvert par <span class="text-[#5865f2]">@Maxou</span> · il y a 2 min</p>
                  <div class="flex gap-1.5 flex-wrap">
                    <span class="bg-[#5865f2] text-white text-[8px] font-black px-2.5 py-1 rounded cursor-pointer">Claim</span>
                    <span class="bg-[#4e5058] text-white text-[8px] font-black px-2.5 py-1 rounded cursor-pointer">Fermer</span>
                    <span class="bg-[#4e5058] text-white text-[8px] font-black px-2.5 py-1 rounded cursor-pointer">Escalader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Veille RSS -->
          <div use:reveal={{ direction: 'up', delay: 60 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-amber-500">Veille RSS · Monitoring</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Flux de veille automatisés</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Toutes les 5 min, les nouveaux articles passent par validation staff avant publication.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-amber-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                      <span class="text-white text-[7px] font-black">K</span>
                    </div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[9px] text-[#b9bbbe] mb-0.5">the-hacker-news.com</p>
                  <p class="text-[10px] font-black text-[#00aff4] mb-1 hover:underline cursor-pointer">Nouvelle faille 0-day détectée dans OpenSSL 3.x</p>
                  <p class="text-[8px] text-[#b9bbbe] mb-2">Les équipes de sécurité sont invitées à mettre à jour immédiatement...</p>
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] text-[#72767d]">il y a 3 min</span>
                    <div class="flex gap-1">
                      <span class="bg-emerald-600/80 text-white text-[7px] font-black px-2 py-0.5 rounded">Valider</span>
                      <span class="bg-[#4e5058] text-white text-[7px] font-black px-2 py-0.5 rounded">Ignorer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Algo quotidien -->
          <div use:reveal={{ direction: 'up', delay: 120 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500">Algo Quotidien · Dev</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Défi de code chaque matin</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Classement en temps réel, Code Police pour remettre en forme les snippets postés.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-emerald-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                      <span class="text-white text-[7px] font-black">K</span>
                    </div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-white mb-0.5">Défi #214 — Difficulté Intermédiaire</p>
                  <p class="text-[9px] text-[#b9bbbe] mb-2">Implémentez un algorithme de tri topologique pour un graphe orienté acyclique.</p>
                  <div class="rounded bg-[#202225] p-2 mb-2 font-mono">
                    <p class="text-[8px] text-emerald-400">def topo_sort(graph):</p>
                    <p class="text-[8px] text-[#b9bbbe]">&nbsp;&nbsp;&nbsp;&nbsp;visited = set()</p>
                    <p class="text-[8px] text-[#b9bbbe]">&nbsp;&nbsp;&nbsp;&nbsp;result = []</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-[8px] text-emerald-400 font-black">+250 XP</span>
                    <span class="text-[7px] text-[#72767d]">23 réponses déjà</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Doubles comptes -->
          <div use:reveal={{ direction: 'up', delay: 0 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-violet-500">Doubles Comptes · Sécurité</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Détection automatique des alts</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Chaque arrivée est comparée aux comptes connus et liés via la base du serveur.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-violet-500 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                      <span class="text-white text-[7px] font-black">K</span>
                    </div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-amber-400 mb-1">Compte lié détecté</p>
                  <div class="space-y-1 mb-2">
                    <div class="flex items-center gap-2">
                      <img src={mockAvatar('xX_alt')} alt="" class="w-4 h-4 rounded-full bg-gray-600" />
                      <span class="text-[8px] text-white font-bold">@xX_hacker2</span>
                      <span class="text-[7px] text-[#b9bbbe]">vient d'arriver</span>
                    </div>
                    <div class="flex items-center gap-1.5 ml-5">
                      <div class="w-px h-3 bg-[#4e5058]"></div>
                      <img src={mockAvatar('xX_hacker')} alt="" class="w-4 h-4 rounded-full bg-gray-600" />
                      <span class="text-[8px] text-amber-300 font-bold">@xX_hacker</span>
                      <span class="text-[7px] text-rose-400 font-bold">BANNI</span>
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <span class="bg-rose-600/80 text-white text-[7px] font-black px-2 py-0.5 rounded">Bannir aussi</span>
                    <span class="bg-[#4e5058] text-white text-[7px] font-black px-2 py-0.5 rounded">Ignorer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Analytics -->
          <div use:reveal={{ direction: 'up', delay: 60 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-indigo-500">Statistiques · Analytics</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Stats en direct dans Discord</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Salons dédiés qui se mettent à jour automatiquement. Audit log complet.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] p-3 mt-auto space-y-2">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[9px] font-black text-white">Activité — 7 derniers jours</span>
                <span class="text-[8px] text-emerald-400 font-black">+18%</span>
              </div>
              <div class="flex items-end gap-1 h-10">
                {#each [38,55,42,71,58,83,76] as h, i}
                  <div
                    class="flex-1 rounded-t transition-all"
                    style="height:{h}%; background: {i === 6 ? '#5865f2' : 'rgba(88,101,242,0.3)'}"
                  ></div>
                {/each}
              </div>
              <div class="flex gap-3 pt-1">
                {#each [['membres','1 247'],['messages','12 845'],['tickets','18']] as [label, val]}
                  <div class="flex-1 rounded-lg bg-[#202225] px-2 py-1.5">
                    <p class="text-[6px] text-[#72767d] uppercase font-black mb-0.5">{label}</p>
                    <p class="text-[11px] font-black text-white">{val}</p>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- YouTube / GitHub -->
          <div use:reveal={{ direction: 'up', delay: 120 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-rose-500">YouTube & GitHub · Veille</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Notifications en temps réel</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Nouvelle vidéo, nouveau Short, nouveau release GitHub — le serveur est alerté en quelques secondes.</p>
            </div><!-- split -->
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto space-y-px">
              <div class="flex">
                <div class="w-1 bg-rose-500 shrink-0"></div>
                <div class="p-2.5 flex-1">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0">
                      <span class="text-white text-[7px] font-black">K</span>
                    </div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[9px] text-[#b9bbbe] mb-0.5">Fireship · YouTube</p>
                  <p class="text-[10px] font-black text-[#00aff4] hover:underline cursor-pointer">I built an app in 100 seconds</p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="bg-rose-600/80 text-white text-[7px] font-black px-1.5 py-0.5 rounded">Voir la vidéo</span>
                    <span class="text-[7px] text-[#72767d]">Rôle <span class="text-[#b9bbbe]">@devwatch</span> pingé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Auto-modération -->
          <div use:reveal={{ direction: 'up', delay: 0 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-red-500">Auto-Mod · Sécurité</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Modération sans lever le doigt</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Spam, liens malveillants, mots bannis — supprimés et signalés avant que le staff s'en rende compte.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto space-y-px">
              <div class="flex">
                <div class="w-1 bg-red-500 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[9px] font-black text-red-400 mb-0.5">⚠ Message supprimé automatiquement</p>
                  <div class="rounded bg-[#202225] p-2 mb-2 space-y-1">
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">AUTEUR</span><span class="text-[8px] text-[#b9bbbe]">@SpamUser42</span></div>
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">RAISON</span><span class="text-[8px] text-amber-400">Spam répété (×5 en 10s)</span></div>
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">ACTION</span><span class="text-[8px] text-red-400">Timeout 10 min</span></div>
                  </div>
                  <div class="flex gap-1">
                    <span class="bg-[#4e5058] text-white text-[7px] font-black px-2 py-0.5 rounded">Voir le log</span>
                    <span class="bg-red-600/80 text-white text-[7px] font-black px-2 py-0.5 rounded">Escalader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Leveling & XP -->
          <div use:reveal={{ direction: 'up', delay: 60 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-yellow-500">Leveling · Engagement</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">XP, niveaux et rôles automatiques</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Chaque message rapporte de l'XP. Les rôles se débloquent automatiquement au bon palier.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-yellow-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-yellow-300 mb-0.5">🎉 Niveau atteint — <span class="text-white">Maxou</span></p>
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-[8px] text-[#72767d] font-black">Niv. 14</span>
                    <span class="text-[9px] text-yellow-300 font-black">→</span>
                    <span class="text-[8px] text-yellow-300 font-black">Niv. 15</span>
                  </div>
                  <div class="rounded-full h-2 bg-[#202225] mb-2 overflow-hidden">
                    <div class="h-full bg-yellow-400 rounded-full" style="width:62%"></div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[7px] text-[#72767d]">Récompense :</span>
                    <span class="bg-yellow-500/20 text-yellow-300 text-[7px] font-black px-1.5 py-0.5 rounded-full">@Membre Actif débloqué</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sondages -->
          <div use:reveal={{ direction: 'up', delay: 120 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-cyan-500">Sondages · Staff</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Votes staff intégrés à Discord</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Créez des sondages anonymes ou publics, le dashboard centralise les résultats en temps réel.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-cyan-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-white mb-0.5">Nouvelle règle à valider</p>
                  <p class="text-[8px] text-[#b9bbbe] mb-2">Interdire le partage de streams en direct hors <span class="text-cyan-300">#stream</span> ?</p>
                  {#each [['✅ Oui', 71, 'bg-emerald-500'], ['❌ Non', 21, 'bg-red-500/70'], ['🤷 Abstention', 8, 'bg-[#4e5058]']] as [opt, pct, color]}
                    <div class="mb-1.5">
                      <div class="flex justify-between mb-0.5">
                        <span class="text-[8px] text-[#b9bbbe]">{opt}</span>
                        <span class="text-[7px] text-[#72767d] font-black">{pct}%</span>
                      </div>
                      <div class="h-1.5 rounded-full bg-[#202225] overflow-hidden">
                        <div class="h-full rounded-full {color}" style="width:{pct}%"></div>
                      </div>
                    </div>
                  {/each}
                  <p class="text-[7px] text-[#72767d] mt-1">14 votes · ferme dans 2h</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Candidatures -->
          <div use:reveal={{ direction: 'up', delay: 0 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-indigo-500">Candidatures · RH</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Formulaires et recrutement staff</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Formulaires personnalisables, réponses centralisées, délibération d'équipe intégrée.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-indigo-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-white mb-0.5">Candidature Helper — Nora</p>
                  <div class="rounded bg-[#202225] p-2 mb-2 space-y-1">
                    <div class="flex gap-2"><span class="text-[7px] text-[#72767d] font-black w-14 shrink-0">Âge</span><span class="text-[8px] text-[#b9bbbe]">19 ans</span></div>
                    <div class="flex gap-2"><span class="text-[7px] text-[#72767d] font-black w-14 shrink-0">Dispo</span><span class="text-[8px] text-[#b9bbbe]">10h / semaine</span></div>
                    <div class="flex gap-2"><span class="text-[7px] text-[#72767d] font-black w-14 shrink-0">Motiv.</span><span class="text-[8px] text-[#b9bbbe] truncate">Passionnée de gestion de commu…</span></div>
                  </div>
                  <div class="flex gap-1">
                    <span class="bg-emerald-600/80 text-white text-[7px] font-black px-2 py-0.5 rounded">Accepter</span>
                    <span class="bg-red-600/70 text-white text-[7px] font-black px-2 py-0.5 rounded">Refuser</span>
                    <span class="bg-[#4e5058] text-white text-[7px] font-black px-2 py-0.5 rounded">Détails</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Giveaways -->
          <div use:reveal={{ direction: 'up', delay: 60 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-pink-500">Giveaways · Communauté</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Tirages au sort automatisés</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Conditions d'entrée personnalisables, tirage instantané, re-roll en un clic depuis le dashboard.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-pink-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-pink-300 mb-0.5">🎁 GIVEAWAY — Abonnement Premium 1 mois</p>
                  <p class="text-[8px] text-[#b9bbbe] mb-1.5">Réagis avec 🎉 pour participer !</p>
                  <div class="rounded bg-[#202225] p-2 mb-2 space-y-1">
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">Participants</span><span class="text-[8px] text-pink-300 font-black">342 🎉</span></div>
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">Gagnants</span><span class="text-[8px] text-[#b9bbbe]">1</span></div>
                    <div class="flex justify-between"><span class="text-[7px] text-[#72767d] font-black">Fin dans</span><span class="text-[8px] text-amber-300 font-black">2h 14min</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggestions -->
          <div use:reveal={{ direction: 'up', delay: 120 }} class="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-teal-500">Suggestions · Communauté</span>
              <h4 class="text-lg font-black text-gray-900 mt-1">Idées de la communauté, traitées</h4>
              <p class="text-sm text-gray-500 font-medium mt-1">Les membres proposent, la communauté vote, le staff statue. Tout est archivé.</p>
            </div>
            <div class="rounded-lg bg-[#2f3136] overflow-hidden mt-auto">
              <div class="flex">
                <div class="w-1 bg-teal-400 shrink-0"></div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <div class="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0"><span class="text-white text-[7px] font-black">K</span></div>
                    <span class="text-[9px] font-black text-white">Kotbo</span>
                    <span class="text-[8px] text-[#5865f2] font-bold bg-[#5865f2]/20 px-1 rounded">BOT</span>
                  </div>
                  <p class="text-[10px] font-black text-white mb-0.5">💡 Suggestion — <span class="text-[#72767d]">par</span> <span class="text-teal-300">@Zara</span></p>
                  <p class="text-[8px] text-[#b9bbbe] mb-2">Ajouter un salon #ressources-dev avec des liens curatés chaque semaine</p>
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-[9px] font-black text-emerald-400">👍 48</span>
                    <div class="flex-1 h-1.5 rounded-full bg-[#202225] overflow-hidden"><div class="h-full bg-emerald-500 rounded-full" style="width:83%"></div></div>
                    <span class="text-[9px] font-black text-red-400">10 👎</span>
                  </div>
                  <div class="flex gap-1">
                    <span class="bg-emerald-600/80 text-white text-[7px] font-black px-2 py-0.5 rounded">Accepter</span>
                    <span class="bg-[#4e5058] text-white text-[7px] font-black px-2 py-0.5 rounded">En cours</span>
                    <span class="bg-red-600/70 text-white text-[7px] font-black px-2 py-0.5 rounded">Refuser</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
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

  <!-- Section: Ils nous font confiance (Statistiques) -->
  <section id="trust" class="py-32 bg-gray-50 border-t border-b border-gray-200 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none opacity-5" style="background-image: radial-gradient(circle at 20% 30%, var(--color-primary) 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="max-w-[85rem] mx-auto px-8 relative z-10">
      <div use:reveal={{ direction: 'up' }} class="text-center mb-20">
        <div class="inline-block border-2 border-indigo-600 rounded-2xl px-6 py-2 mb-6 bg-white shadow-sm">
          <p class="text-xs font-black text-indigo-600 uppercase tracking-widest">Des chiffres qui parlent d'eux-mêmes</p>
        </div>
        <h2 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 font-headline mb-6">
          Ils nous font <MarkerCircle color="blue" class="text-indigo-600" animated>confiance</MarkerCircle> au quotidien
        </h2>
        <p class="text-lg text-gray-500 font-bold max-w-xl mx-auto">
          Kotbo propulse la gestion et la modération des plus grandes communautés Discord au quotidien.
        </p>
      </div>

      <!-- Global Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
        <!-- Servers card -->
        <div use:reveal={{ direction: 'left', delay: 100 }} class="relative group bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Server size={120} class="text-indigo-600" />
          </div>
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
              <Server size={32} />
            </div>
            <div>
              <p class="text-xs font-black uppercase tracking-wider text-gray-400">Communautés gérées</p>
              {#if statsLoading}
                <div class="h-12 w-28 bg-gray-200 animate-pulse rounded-lg mt-1"></div>
              {:else}
                <p class="text-4xl md:text-5xl font-black text-gray-900 mt-1 font-headline tracking-tight">
                  {stats ? stats.totalGuilds : 0}
                </p>
              {/if}
            </div>
          </div>
        </div>

        <!-- Users card -->
        <div use:reveal={{ direction: 'right', delay: 100 }} class="relative group bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={120} class="text-indigo-600" />
          </div>
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
              <Users size={32} />
            </div>
            <div>
              <p class="text-xs font-black uppercase tracking-wider text-gray-400">Membres</p>
              {#if statsLoading}
                <div class="h-12 w-36 bg-gray-200 animate-pulse rounded-lg mt-1"></div>
              {:else}
                <p class="text-4xl md:text-5xl font-black text-gray-900 mt-1 font-headline tracking-tight">
                  {stats ? formatCompact(stats.totalUsers) : '0'}
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Individual servers heading -->
      <div use:reveal={{ direction: 'up', delay: 150 }} class="text-center mb-12">
        <h3 class="text-2xl font-black text-gray-900 font-headline">Quelques communautés équipées</h3>
        <p class="text-sm text-gray-500 font-bold mt-1">Des serveurs Discord de toutes tailles qui font confiance à Kotbo.</p>
      </div>

      <!-- Servers Grid (2x2 Centered) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 md:px-0">
        {#if statsLoading}
          {#each Array(4) as _}
            <div class="bg-white border border-gray-200/60 rounded-3xl p-6 flex flex-col justify-between h-56 shadow-sm">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl bg-gray-200 animate-pulse shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                  <div class="h-3 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div class="border-t border-gray-100 pt-4 flex justify-between items-center">
                <div class="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div class="h-6 w-24 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            </div>
          {/each}
        {:else if stats && stats.servers}
          {#each stats.servers as server, idx}
            <div
              use:reveal={{ direction: 'up', delay: 80 * idx }}
              class="relative bg-[#fefdfa] border-2 border-gray-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[17.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 group"
              style="transform: rotate({[ -1.2, 0.8, -0.6, 1.4 ][idx % 4]}deg);"
            >
              <!-- Masking Tape Effect -->
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-50/70 border-l border-r border-black/5 backdrop-blur-xs transform rotate-[-2deg] opacity-80 pointer-events-none" style="box-shadow: inset 0 0 4px rgba(0,0,0,0.03);"></div>

              <div>
                <div class="flex items-center gap-4 relative z-10">
                  {#if server.iconUrl}
                    <img
                      src={server.iconUrl}
                      alt="{server.name} icon"
                      class="w-14 h-14 rounded-2xl border-2 border-white shadow-md object-cover bg-gray-50 shrink-0"
                      onerror={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `${base}/favicon.svg`;
                      }}
                    />
                  {:else}
                    <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border-2 border-white font-black text-xl shadow-md uppercase shrink-0">
                      {server.name.substring(0, 2)}
                    </div>
                  {/if}

                  <div class="min-w-0 flex-1">
                    <h4 class="font-black text-gray-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{server.name}</h4>
                  </div>
                </div>

                <p class="text-sm text-gray-500 font-medium leading-relaxed mt-4">
                  {server.description}
                </p>
              </div>

              <div class="border-t border-dashed border-gray-200/80 pt-4 flex justify-between items-center mt-6 relative z-10">
                <span class="text-xs font-black uppercase tracking-wider text-gray-400">Membres</span>
                <span class="text-sm font-black text-gray-800 bg-gray-100/80 px-3 py-1 rounded-xl border border-gray-200/50">{server.memberCount.toLocaleString('fr-FR')}</span>
              </div>
            </div>
          {/each}
        {/if}
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
      <p class="text-2xl text-gray-600 mb-4 font-bold">Kotbo est un bot privé — l'accès se fait sur devis.</p>
      <p class="text-base text-gray-400 font-bold mb-12">Contacte-nous pour une démo personnalisée ou consulte la documentation pour en savoir plus.</p>

      <div class="flex flex-col sm:flex-row justify-center gap-6">
        <a href="mailto:contact@kotbo.fr" class="bg-indigo-600 text-white px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
          Demander une démo
        </a>
        <a href="https://docs.kotbo.fr" target="_blank" rel="noopener" class="bg-white border-2 border-gray-200 text-gray-900 px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
          Documentation
        </a>
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
        <a href="https://nathaan.me/u/discord" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Discord</a>
        <a href="https://docs.kotbo.fr" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Documentation</a>
        <a href="https://status.kotbo.fr" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Services Status</a>
        <a href="{base}/terms" class="text-indigo-500 hover:text-indigo-700 transition-colors">Confidentialité</a>
        <a href="{base}/cookies" class="hover:text-gray-900 transition-colors">Cookies</a>
        <a href="{base}/dpa" class="hover:text-gray-900 transition-colors">DPA</a>
      </div>
    </div>
  </footer>
</div>
