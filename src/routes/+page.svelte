<script lang="ts">
  import PostIt from "$lib/components/ui/PostIt.svelte";
  import MarkerCircle from "$lib/components/ui/MarkerCircle.svelte";
  import HandDrawnArrow from "$lib/components/ui/HandDrawnArrow.svelte";
  
  import MockProfile from "$lib/components/mockups/MockProfile.svelte";
  import MockTickets from "$lib/components/mockups/MockTickets.svelte";
  import MockSanction from "$lib/components/mockups/MockSanction.svelte";
  import MockStaff from "$lib/components/mockups/MockStaff.svelte";
  import MockDashboardLayout from "$lib/components/mockups/MockDashboardLayout.svelte";
  
  import { Shield, MessageCircle, FileText, CheckCircle2 } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Kotbo | Le centre de contrôle de ta communauté Discord</title>
  <meta name="description" content="Modération, staff, tickets, candidatures. Kotbo remplace tes tableurs et centralise l'organisation de ton serveur Discord." />
</svelte:head>

<div class="min-h-screen relative overflow-hidden text-gray-800">
  <!-- Navigation -->
  <nav class="max-w-[90rem] mx-auto px-8 py-6 flex justify-between items-center relative z-10">
    <div class="flex items-center gap-3">
      <img src="/favicon.svg" alt="Kotbo Logo" class="w-10 h-10 rounded-xl shadow-sm" />
      <span class="font-black text-2xl tracking-tight text-gray-900">Kotbo</span>
    </div>
    <div class="hidden md:flex gap-8 font-bold text-sm text-gray-600">
      <a href="#features" class="hover:text-indigo-600 transition-colors">Modules</a>
      <a href="#workflow" class="hover:text-indigo-600 transition-colors">Flow</a>
    </div>
    <button class="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-gray-800 shadow-sm transition-transform hover:scale-105 active:scale-95">
      Ajouter Kotbo
    </button>
  </nav>

  <!-- Hero Section -->
  <section class="max-w-[90rem] mx-auto px-8 pt-16 pb-32 relative">
    <div class="max-w-2xl relative z-20">
      <h1 class="text-5xl md:text-[5rem] font-black tracking-tighter leading-[1.05] mb-8 text-gray-900">
        Le centre de <br/> contrôle de ta <br/> <MarkerCircle color="blue" class="text-indigo-600">communauté</MarkerCircle>.
      </h1>
      <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-bold">
        Modération, staff, tickets, candidatures, statistiques. 
        Kotbo remplace tes tableurs et centralise toute l'organisation de ton serveur Discord.
      </p>
      <div class="flex gap-4">
        <button class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1">
          Essayer la démo
        </button>
        <button class="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:border-gray-300 hover:bg-gray-50 transition-all">
          Voir la doc
        </button>
      </div>
    </div>

    <!-- Hero Graphics -->
    <div class="absolute right-0 top-0 w-1/2 h-[800px] hidden xl:block pointer-events-none">
      <PostIt text="Trop d'outils différents !" color="pink" rotation={-5} class="absolute top-10 -left-10 z-30 w-48" />
      <HandDrawnArrow direction="down-right" class="absolute top-28 -left-4 w-24 h-24 z-20" />
      
      <div class="absolute top-10 right-0 w-[850px] origin-top-right transform scale-75 rotate-2 hover:rotate-0 transition-transform duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.2)] rounded-[2.5rem] pointer-events-auto">
        <MockDashboardLayout activeTab="tickets">
          <MockTickets />
        </MockDashboardLayout>
      </div>
      
      <PostIt text="Regrouper ça ici 👇" color="yellow" rotation={8} class="absolute top-[380px] left-10 z-30 w-52" />
      <HandDrawnArrow direction="curved-down" stroke="var(--color-marker-red)" class="absolute top-[400px] left-32 w-20 h-20 z-20" />

      <div class="absolute top-[400px] right-20 w-[850px] origin-top-right transform scale-[0.65] -rotate-2 hover:rotate-0 transition-transform duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-[2.5rem] pointer-events-auto">
        <MockDashboardLayout activeTab="profile">
          <MockProfile />
        </MockDashboardLayout>
      </div>
    </div>
  </section>

  <!-- Problem Section (Le Bazar) -->
  <section class="border-y-2 border-gray-200 bg-white/50 backdrop-blur-sm relative overflow-hidden py-24">
    <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: repeating-linear-gradient(45deg, var(--color-marker-red) 0, var(--color-marker-red) 2px, transparent 2px, transparent 100px);"></div>
    
    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 class="text-4xl md:text-5xl font-black mb-16 tracking-tight text-gray-900">Gérer une grosse communauté, <br/>ça devient vite <span class="text-red-500 underline decoration-wavy">le bazar</span>.</h2>
      
      <div class="relative h-96 w-full mt-10 hidden md:block">
        <PostIt text="Qui a ban ce membre ???" color="pink" rotation={-12} class="absolute top-10 left-0 w-48" />
        <PostIt text="Lien du GForm stp ?" color="yellow" rotation={8} class="absolute top-20 right-0 w-44" />
        <PostIt text="Ticket #452 perdu" color="blue" rotation={-5} class="absolute top-52 left-32 w-40" />
        <PostIt text="Absent ce week-end (où je note ça ?)" color="yellow" rotation={15} class="absolute top-40 right-24 w-56" />
        <PostIt text="Mettre à jour le tableur Excel" color="pink" rotation={-8} class="absolute top-64 right-10 w-52" />
        
        <HandDrawnArrow direction="right" stroke="var(--color-marker-red)" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-50" />
      </div>
    </div>
  </section>

  <!-- Solution Section (L'Ordre) -->
  <section id="features" class="py-32 relative">
    <div class="max-w-[80rem] mx-auto px-8">
      <div class="text-center mb-28 relative">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12">
          <MarkerCircle color="red" class="text-2xl font-bold font-hand text-red-600 px-4 py-1">Stop au chaos</MarkerCircle>
        </div>
        <h2 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6">Kotbo regroupe tout dans un <br/>seul système organisé.</h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Feature 1 -->
        <div class="order-2 lg:order-1 relative group">
          <div class="w-full transform -rotate-1 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-[2.5rem] transition-transform duration-500 group-hover:rotate-0">
            <MockDashboardLayout activeTab="staff">
              <MockStaff />
            </MockDashboardLayout>
          </div>
          <PostIt text="Permissions gérées !" color="blue" rotation={-5} class="absolute -bottom-8 -right-8 w-44 z-10 hidden xl:block" />
        </div>
        <div class="order-1 lg:order-2 pl-0 lg:pl-10">
          <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield size={28} />
          </div>
          <h3 class="text-4xl font-black tracking-tight mb-6 text-gray-900">Une équipe maîtrisée</h3>
          <p class="text-gray-600 text-xl mb-8 leading-relaxed font-medium">
            Fini les incertitudes sur qui fait quoi. Kotbo offre une vue d'ensemble sur votre staff, leurs permissions, leur activité et leurs absences, en temps réel.
          </p>
          <ul class="space-y-4 font-bold text-gray-700 text-lg">
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Historique des actions staff</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Gestion fine des permissions</li>
            <li class="flex items-center gap-3"><CheckCircle2 size={24} class="text-green-500" /> Tracker d'activité en temps réel</li>
          </ul>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-center mt-40">
        <!-- Feature 2 -->
        <div class="pr-0 lg:pr-10">
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
        <div class="relative group">
          <div class="w-full transform rotate-1 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-[2.5rem] transition-transform duration-500 group-hover:rotate-0">
            <MockDashboardLayout activeTab="sanction">
              <MockSanction />
            </MockDashboardLayout>
          </div>
          <HandDrawnArrow direction="up-right" class="absolute -top-12 -left-12 w-24 h-24 hidden xl:block" />
          <PostIt text="Preuve stockée ici" color="yellow" rotation={10} class="absolute -top-16 -left-28 w-40 hidden xl:block" />
        </div>
      </div>
    </div>
  </section>

  <!-- Dans la vraie vie (Workflow) -->
  <section id="workflow" class="py-32 bg-gray-900 text-white relative">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-24 text-center">Dans la vraie vie, ça donne quoi ?</h2>
      
      <div class="relative pl-8 md:pl-0">
        <!-- Ligne verticale -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 md:-translate-x-1/2"></div>
        
        <!-- Step 1 -->
        <div class="relative flex flex-col md:flex-row items-center mb-24">
          <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">1. Un membre ouvre un ticket</h4>
            <p class="text-gray-400 text-lg font-medium">Le joueur toxique est signalé. Le ticket atterrit directement dans le centre de tri de Kotbo avec priorité haute.</p>
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
        <div class="relative flex flex-col md:flex-row-reverse items-center mb-24">
          <div class="md:w-1/2 md:pl-16 text-left w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">2. Modération et rapport</h4>
            <p class="text-gray-400 text-lg font-medium">Le staff intervient, applique la sanction, et Kotbo génère le rapport avec les screens en pièce jointe.</p>
          </div>
          <div class="absolute left-0 md:left-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-900 transform -translate-x-[11px] md:-translate-x-1/2"></div>
          <div class="md:w-1/2 md:pr-16 w-full ml-8 md:ml-0 mt-6 md:mt-0 flex justify-end">
            <PostIt text="Dossier bouclé 🔒" color="yellow" rotation={-5} class="w-56 text-gray-900" />
          </div>
        </div>
        
        <!-- Step 3 -->
        <div class="relative flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full ml-8 md:ml-0">
            <h4 class="text-2xl font-black mb-3">3. Profil mis à jour</h4>
            <p class="text-gray-400 text-lg font-medium">L'historique du membre garde la trace indélébile de la sanction. Le reste du staff est au courant.</p>
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
    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div class="inline-block border-4 border-gray-900 rounded-2xl px-10 py-5 mb-12 transform -rotate-2 hand-drawn-border bg-white shadow-2xl">
        <p class="text-xl font-black text-gray-900 uppercase tracking-widest">Pensé pour les staffs de 20+ membres</p>
      </div>
      
      <h2 class="text-5xl font-black tracking-tight mb-8 text-gray-900">Prêt à professionnaliser <br/>ta communauté ?</h2>
      <p class="text-2xl text-gray-600 mb-12 font-bold">Rejoins les serveurs qui ont arrêté de bricoler avec des tableurs Excel.</p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-6">
        <button class="bg-indigo-600 text-white px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
          Ajouter Kotbo à mon serveur
        </button>
        <button class="bg-white border-2 border-gray-200 text-gray-900 px-10 py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:border-gray-300 transition-colors">
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
        <img src="/favicon.svg" alt="Kotbo Logo" class="w-8 h-8 rounded-lg shadow-sm grayscale opacity-50" />
        <span class="font-black text-lg text-gray-400">Kotbo</span>
      </div>
      <p>© 2026 Kotbo. Le centre de contrôle Discord.</p>
      <div class="flex gap-6 uppercase tracking-widest text-[10px] font-black">
        <a href="/" class="hover:text-gray-900 transition-colors">Twitter</a>
        <a href="/" class="hover:text-gray-900 transition-colors">Discord</a>
        <a href="/" class="hover:text-gray-900 transition-colors">Documentation</a>
      </div>
    </div>
  </footer>
</div>
