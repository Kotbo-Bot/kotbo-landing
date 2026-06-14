<script lang="ts">
  import Papicon from '../Papicon.svelte';
  
  let { children, activeTab = 'tickets' }: { children: import('svelte').Snippet, activeTab?: string } = $props();
</script>

<div class="relative w-full aspect-[16/10] bg-surface rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-outline-variant/20 overflow-hidden flex font-body text-on-surface">
  
  <!-- Sidebar -->
  <aside class="w-[260px] h-full bg-surface-container-low border-r border-outline-variant/10 flex flex-col shrink-0">
    <!-- Header Logo -->
    <div class="flex items-center gap-3 px-6 pt-8 pb-6">
      <div class="relative w-10 h-10 shrink-0">
        <div class="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
        <img alt="Logo" src="/favicon.svg" class="relative w-full h-full object-cover rounded-xl"/>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-[16px] font-black tracking-tight text-on-surface leading-none">Kotbo</span>
        <span class="text-[11px] text-on-surface-variant/50 mt-0.5 font-bold uppercase tracking-widest">Dashboard</span>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-4 py-2 space-y-6">
      <!-- Group 1 -->
      <div>
        <div class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-3 px-2">Général</div>
        <div class="space-y-1">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container/50 cursor-pointer transition-colors">
            <Papicon icon="activity" size={18} />
            <span class="text-sm font-bold">Vue d'ensemble</span>
          </div>
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl {activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container/50'} cursor-pointer transition-colors">
            <Papicon icon="user" size={18} />
            <span class="text-sm font-bold">Mon Profil</span>
          </div>
        </div>
      </div>
      
      <!-- Group 2 -->
      <div>
        <div class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-3 px-2">Modération</div>
        <div class="space-y-1">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl {activeTab === 'sanction' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container/50'} cursor-pointer transition-colors">
            <Papicon icon="shieldwarning" size={18} />
            <span class="text-sm font-bold">Sanctions</span>
          </div>
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl {activeTab === 'tickets' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container/50'} cursor-pointer transition-colors">
            <Papicon icon="inbox" size={18} />
            <span class="text-sm font-bold">Tickets</span>
          </div>
        </div>
      </div>
      
      <!-- Group 3 -->
      <div>
        <div class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-3 px-2">Communauté</div>
        <div class="space-y-1">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl {activeTab === 'staff' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container/50'} cursor-pointer transition-colors">
            <Papicon icon="usersfour" size={18} />
            <span class="text-sm font-bold">Équipe</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 flex flex-col min-w-0 h-full bg-background relative z-10 overflow-hidden">
    <!-- Navbar -->
    <header class="h-20 border-b border-outline-variant/10 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
      <div class="flex items-center gap-4">
        <div class="text-sm font-black text-on-surface-variant/60 uppercase tracking-widest">
          {activeTab === 'profile' ? 'Mon Profil' : activeTab === 'tickets' ? 'Gestion des Tickets' : activeTab === 'staff' ? 'Équipe Staff' : 'Centre de modération'}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
          <Papicon icon="bell" size={18} />
        </div>
        <div class="flex items-center gap-3 bg-surface-container-low pl-2 pr-4 py-1.5 rounded-full border border-outline-variant/20">
          <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xs">
            A
          </div>
          <span class="text-xs font-bold">Arka</span>
        </div>
      </div>
    </header>
    
    <!-- Page Content Scrollable -->
    <div class="flex-1 overflow-y-auto p-8 no-scrollbar bg-background">
      {@render children()}
    </div>
  </main>
</div>
