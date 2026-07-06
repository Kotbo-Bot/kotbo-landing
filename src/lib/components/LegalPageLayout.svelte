<script lang="ts">
  import { base } from '$app/paths';
  import { onMount, type Snippet } from 'svelte';

  type SectionLink = { id: string; label: string };

  let {
    title,
    subtitle,
    sections,
    activePage,
    children,
  }: {
    title: string;
    subtitle: string;
    sections: SectionLink[];
    activePage: 'terms' | 'cookies' | 'dpa';
    children: Snippet;
  } = $props();

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => { scrolled = window.scrollY > 30; };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="sticky top-0 z-50 transition-all duration-300" class:nav-scrolled={scrolled}>
  <nav class="max-w-[90rem] mx-auto px-8 py-5 flex justify-between items-center">
    <a href="{base}/" class="flex items-center gap-3 group">
      <img src="{base}/favicon.svg" alt="Kotbo Logo" class="w-9 h-9 rounded-xl shadow-md" />
      <span class="font-black text-xl tracking-tight text-gray-900 group-hover:text-indigo-700 transition-colors">Kotbo</span>
    </a>
    <a
      href="{base}/"
      class="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm hover:shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Retour à l'accueil
    </a>
  </nav>
</div>

<div class="min-h-screen">
  <header class="bg-white border-b border-gray-100 py-14">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h1 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 font-headline">{title}</h1>
      <p class="text-gray-500 font-semibold text-sm mt-4">{subtitle}</p>
    </div>
  </header>

  <div class="max-w-[82rem] mx-auto px-6 py-14 flex flex-col lg:flex-row gap-10 items-start">
    <aside class="lg:sticky lg:top-24 lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 self-start">
      <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Sommaire</p>
      <nav class="flex flex-col gap-1">
        {#each sections as section}
          <a
            href="#{section.id}"
            class="text-sm font-semibold text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg px-3 py-2 transition-colors"
          >{section.label}</a>
        {/each}
      </nav>
    </aside>

    <main class="flex-1 max-w-3xl prose-policy">
      {@render children()}
    </main>
  </div>

  <footer class="bg-white border-t border-gray-200 py-10 text-center text-gray-500 text-sm font-bold mt-10">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <img src="{base}/favicon.svg" alt="Kotbo Logo" class="w-8 h-8 rounded-lg shadow-sm grayscale opacity-50" />
        <span class="font-black text-lg text-gray-400">Kotbo</span>
      </div>
      <p>© 2026 Kotbo. Le centre de contrôle Discord.</p>
      <div class="flex flex-wrap justify-center gap-6 uppercase tracking-widest text-[10px] font-black">
        <a href="{base}/terms" class:text-indigo-600={activePage === 'terms'} class="hover:text-gray-900 transition-colors">Confidentialité</a>
        <a href="{base}/cookies" class:text-indigo-600={activePage === 'cookies'} class="hover:text-gray-900 transition-colors">Cookies</a>
        <a href="{base}/dpa" class:text-indigo-600={activePage === 'dpa'} class="hover:text-gray-900 transition-colors">DPA</a>
        <a href="https://nathaan.me/u/discord" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Discord</a>
        <a href="https://docs.kotbo.fr" target="_blank" rel="noopener" class="hover:text-gray-900 transition-colors">Documentation</a>
      </div>
    </div>
  </footer>
</div>

<style>
  .prose-policy {
    font-family: var(--font-sans, 'Inter', sans-serif);
    color: #374151;
    line-height: 1.75;
  }

  .prose-policy :global(.policy-section) {
    position: relative;
    margin-bottom: 3.5rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid #f3f4f6;
    scroll-margin-top: 7rem;
  }

  .prose-policy :global(.policy-section:last-child) { border-bottom: none; }

  .prose-policy :global(.section-badge) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: #eef2ff;
    color: #4338ca;
    font-size: 0.65rem;
    font-weight: 900;
    border-radius: 0.5rem;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .prose-policy :global(h2) {
    font-size: 1.6rem;
    font-weight: 900;
    color: #111827;
    margin-bottom: 1rem;
    font-family: 'Manrope', sans-serif;
    letter-spacing: -0.02em;
  }

  .prose-policy :global(h3) {
    font-size: 1.05rem;
    font-weight: 800;
    color: #1f2937;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .prose-policy :global(p) { margin-bottom: 1rem; font-size: 0.9375rem; }

  .prose-policy :global(ul) { list-style: none; padding-left: 0; margin-bottom: 1rem; }
  .prose-policy :global(ul li) {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
  }
  .prose-policy :global(ul li::before) {
    content: '›';
    position: absolute;
    left: 0;
    color: #6366f1;
    font-weight: 900;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .prose-policy :global(a) {
    color: #4f46e5;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .prose-policy :global(a:hover) { color: #3730a3; }

  .prose-policy :global(.info-box) {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.875rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    color: #1e40af;
    line-height: 1.65;
  }

  .prose-policy :global(.info-box p:last-child) { margin-bottom: 0; }
  .prose-policy :global(.table-wrap) { overflow-x: auto; padding: 1px; }
  .prose-policy :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0 1.5rem;
    font-size: 0.875rem;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0 0 1px #e5e7eb;
  }
  .prose-policy :global(th) {
    background: #f3f4f6;
    font-weight: 800;
    color: #374151;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .prose-policy :global(td) {
    padding: 0.7rem 1rem;
    color: #4b5563;
    border-top: 1px solid #f3f4f6;
    vertical-align: top;
  }
  .prose-policy :global(tr:hover td) { background: #fafafa; }

  .prose-policy :global(code) {
    background: #f3f4f6;
    color: #4338ca;
    padding: 0.12rem 0.35rem;
    border-radius: 0.35rem;
    font-size: 0.82em;
    font-weight: 700;
  }
</style>
