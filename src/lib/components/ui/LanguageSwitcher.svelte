<script lang="ts">
  import { getLocale, setLocale } from '$lib/i18n/state.svelte';

  interface Props {
    class?: string;
  }

  const { class: className = '' }: Props = $props();

  function toggle() {
    setLocale(getLocale() === 'fr' ? 'en' : 'fr');
  }
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={getLocale() === 'fr' ? 'Switch to English' : 'Passer en français'}
  class="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:border-gray-300 hover:text-gray-800 transition-colors cursor-pointer {className}"
>
  <span class={getLocale() === 'fr' ? 'text-indigo-600' : ''}>FR</span>
  <span class="text-gray-300">/</span>
  <span class={getLocale() === 'en' ? 'text-indigo-600' : ''}>EN</span>
</button>
