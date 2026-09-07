<script lang="ts">
  /**
   * Cookies et stockage local.
   *
   * Cette page affirmait « Kotbo n'utilise aucun outil de mesure d'audience
   * web », ce qui cesse d'etre vrai avec la sonde du tunnel d'acquisition. Elle
   * decrit desormais cette mesure, et surtout elle porte le moyen de s'y
   * opposer - une page qui annonce un droit d'opposition sans l'offrir ne vaut
   * pas mieux que celle qui taisait la mesure.
   *
   * L'interrupteur ecrit `kotbo:no-measure` dans `localStorage`. C'est le seul
   * usage durable que fait le site du stockage local, et il est ici pour une
   * raison precise : un refus doit survivre a la fermeture de l'onglet, alors
   * que l'identifiant de visite, lui, ne doit pas. La sonde lit ce drapeau
   * avant tout envoi.
   */
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  /** Clé lue par la sonde avant tout envoi. */
  const OPT_OUT_KEY = 'kotbo:no-measure';

  let optedOut = $state(false);
  /** Tant que le navigateur n'a pas répondu, on n'affiche pas d'état trompeur. */
  let ready = $state(false);
  /**
   * Signal navigateur déjà émis : dans ce cas la mesure est désactivée quoi
   * qu'affiche l'interrupteur, et le dire évite de laisser croire qu'il faut
   * encore agir.
   */
  let browserSignal = $state(false);

  onMount(() => {
    try {
      optedOut = localStorage.getItem(OPT_OUT_KEY) === '1';
    } catch {
      // Stockage inaccessible (navigation privée stricte, réglages) : on reste
      // sur la valeur par défaut plutôt que de casser la page.
    }
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    browserSignal = nav.doNotTrack === '1' || nav.globalPrivacyControl === true;
    ready = true;
  });

  function toggleOptOut(next: boolean) {
    optedOut = next;
    try {
      if (next) localStorage.setItem(OPT_OUT_KEY, '1');
      else localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      // Rien à faire : sans stockage, le refus ne peut pas être mémorisé. Les
      // signaux navigateur restent respectés de toute façon.
    }
  }

  const sections = [
    { id: 'mesure', label: "Mesure d'audience" },
    { id: 'dashboard', label: 'Cookies du dashboard' },
    { id: 'local', label: 'Stockage local' },
    { id: 'gestion', label: 'Gérer ces données' },
    { id: 'evolution', label: 'Évolution' },
  ];
</script>

<svelte:head>
  <title>Cookies et stockage local | Kotbo</title>
  <meta name="description" content="Informations sur les cookies et stockages locaux utilisés par Kotbo." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Cookies et stockage local"
  subtitle="Dernière mise à jour : 5 septembre 2026 · Landing et Dashboard Kotbo"
  {sections}
  activePage="cookies"
>
  <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10 flex gap-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <div>
      <p class="font-bold text-indigo-900 text-sm mb-1">Aucune bannière de consentement</p>
      <p class="text-indigo-800 text-sm leading-relaxed mb-0">
        Kotbo n'utilise <strong>aucun cookie publicitaire</strong>, aucun outil tiers et ne suit personne d'un site à
        l'autre. La mesure d'audience décrite ci-dessous est faite par nos propres moyens et reste dans les conditions
        d'exemption prévues par la CNIL&nbsp;; les autres opérations sont nécessaires à la sécurité, à
        l'authentification ou aux fonctionnalités demandées. Vous pouvez malgré tout vous opposer à la mesure en un
        clic, <a href="#mesure" class="underline font-bold">ci-dessous</a>.
      </p>
    </div>
  </div>

  <section id="mesure" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Mesure d'audience</h2>
    <p>
      Nous mesurons comment le site est utilisé&nbsp;: combien de personnes le visitent, par quel canal elles arrivent,
      quelles sections elles lisent et combien vont jusqu'à installer Kotbo. Cette mesure sert à décider quoi améliorer
      sur le site, et à rien d'autre.
    </p>
    <p>Elle est faite <strong>sans cookie</strong> et sans aucun outil tiers&nbsp;:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Donnée</th><th>Finalité</th><th>Durée</th></tr></thead>
        <tbody>
          <tr>
            <td><code>kotbo:vid</code><br /><span class="art">sessionStorage</span></td>
            <td>Identifiant aléatoire, propre à votre navigateur et à cette seule visite. Il permet de savoir qu'une même visite a lu les tarifs <em>puis</em> installé le bot, plutôt que de compter deux personnes.</td>
            <td>Effacé à la fermeture de l'onglet&nbsp;; 30 jours au maximum côté serveur</td>
          </tr>
          <tr>
            <td>Catégorie du site d'où vous venez</td>
            <td>Savoir si vous arrivez d'un moteur de recherche, de Discord ou en direct. Seule la <strong>catégorie</strong> est enregistrée — jamais l'adresse complète, qui pourrait contenir votre recherche.</td>
            <td>13 mois</td>
          </tr>
          <tr>
            <td>Pages et sections consultées, boutons cliqués</td>
            <td>Comprendre ce qui est lu et ce qui déclenche une installation.</td>
            <td>13 mois</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Ce que cette mesure <strong>ne fait pas</strong>, et ne fera pas sans vous le demander d'abord&nbsp;:</p>
    <ul>
      <li>elle ne pose aucun cookie et ne conserve pas votre adresse IP&nbsp;;</li>
      <li>elle ne vous suit pas sur d'autres sites, et ne recoupe rien avec un autre service&nbsp;;</li>
      <li>elle ne transmet rien à un tiers — pas de Google Analytics, pas de régie, pas de service externe&nbsp;;</li>
      <li>elle n'est jamais rapprochée de votre compte Discord, ni d'aucune identité.</li>
    </ul>
    <div class="opt-out-card">
      <div class="flex items-start justify-between gap-6 flex-wrap">
        <div class="min-w-[16rem] flex-1">
          <p class="font-black text-gray-900 text-sm mb-1">Refuser la mesure d'audience</p>
          <p class="text-sm text-gray-500 mb-0">
            Votre choix est mémorisé dans ce navigateur et prend effet immédiatement. Le site fonctionne exactement de
            la même façon.
          </p>
        </div>
        {#if ready}
          <button
            type="button"
            role="switch"
            aria-checked={optedOut || browserSignal}
            aria-label="Refuser la mesure d'audience"
            disabled={browserSignal}
            onclick={() => toggleOptOut(!optedOut)}
            class="switch"
            class:switch-on={optedOut || browserSignal}
          >
            <span class="switch-knob"></span>
          </button>
        {/if}
      </div>

      {#if ready}
        <p class="mt-4 mb-0 text-sm font-bold" class:text-emerald-700={optedOut || browserSignal} class:text-gray-500={!optedOut && !browserSignal}>
          {#if browserSignal}
            Votre navigateur émet déjà un signal «&nbsp;Do Not Track&nbsp;» ou «&nbsp;Global Privacy Control&nbsp;»&nbsp;:
            rien n'est envoyé, vous n'avez rien à faire.
          {:else if optedOut}
            La mesure est désactivée dans ce navigateur.
          {:else}
            La mesure est active. Elle ne pose aucun cookie et ne vous identifie pas.
          {/if}
        </p>
      {/if}
    </div>
    <p>
      Si vous effacez les données de ce site, ce refus disparaît avec elles et devra être reposé. Vous pouvez également
      nous écrire à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.
    </p>
    <p class="text-sm text-gray-500">
      Ces caractéristiques — finalité limitée, absence de recoupement et de suivi inter-sites, portée limitée à ce seul
      site, durée courte, pas de transmission à un tiers — sont celles auxquelles la CNIL subordonne l'exemption de
      consentement pour la mesure d'audience. C'est pourquoi aucune bannière ne vous est présentée.
    </p>
  </section>

  <section id="dashboard" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Cookies du dashboard</h2>
    <p>Ces cookies permettent d'établir une connexion sécurisée et de protéger le parcours OAuth Discord.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Nom</th><th>Finalité</th><th>Durée</th></tr></thead>
        <tbody>
          <tr><td><code>__Host-kotbo_session</code></td><td>Maintenir la session authentifiée. Cookie sécurisé, <em>HttpOnly</em> et inaccessible à JavaScript.</td><td>7 jours maximum</td></tr>
          <tr><td><code>kotbo_oauth_state</code></td><td>Empêcher les attaques CSRF pendant la connexion Discord.</td><td>5 minutes</td></tr>
          <tr><td><code>kotbo_oauth_verifier</code></td><td>Vérifier le flux OAuth PKCE.</td><td>5 minutes</td></tr>
          <tr><td><code>kotbo_oauth_return_to</code></td><td>Revenir à la page demandée après connexion.</td><td>5 minutes</td></tr>
          <tr><td><code>cf_clearance</code>, <code>__cf_bm</code> ou équivalent</td><td>Protection Cloudflare contre les attaques et robots, uniquement lorsqu'un contrôle de sécurité l'exige.</td><td>Selon le contrôle de sécurité</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="local" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Stockage local du navigateur</h2>
    <p>Le dashboard peut mémoriser localement, sans transmettre ces informations à un service publicitaire :</p>
    <ul>
      <li>le serveur sélectionné, le thème, la barre latérale, les favoris et les préférences d'interface ;</li>
      <li>la progression des tutoriels et l'état temporaire de certaines erreurs ;</li>
      <li>les brouillons enregistrés, modèles d'embed, disposition du dashboard et notes locales du staff ;</li>
      <li>le langage choisi et les données temporaires de l'IDE.</li>
    </ul>
    <div class="info-box">
      Le jeton d'authentification Discord ou Kotbo n'est pas conservé dans <code>localStorage</code>. La session repose sur un cookie <em>HttpOnly</em> inaccessible au code JavaScript du navigateur.
    </div>
  </section>

  <section id="gestion" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Gérer ces données</h2>
    <p>
      Les préférences peuvent être réinitialisées depuis les paramètres du dashboard. Le stockage peut également être supprimé
      depuis les réglages du navigateur ; cela réinitialise les préférences et peut supprimer des brouillons locaux.
    </p>
    <p>Pour toute question, contactez <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.</p>
  </section>

  <section id="evolution" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Évolution</h2>
    <p>
      Si Kotbo ajoute un jour un traceur qui sort des conditions d'exemption décrites plus haut — identifiant durable,
      recoupement avec un autre service, outil tiers, usage publicitaire — il sera <strong>bloqué par défaut</strong>, et
      un mécanisme permettant d'accepter ou de refuser avec la même facilité sera présenté avant son activation.
    </p>
    <div class="info-box">
      Les traitements de données personnelles sont détaillés dans la <a href="{base}/privacy">politique de confidentialité</a> et les relations avec les administrateurs dans l'<a href="{base}/dpa">accord de sous-traitance</a>.
    </div>
  </section>
</LegalPageLayout>

<style>
  .opt-out-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    margin: 1.25rem 0;
  }

  /* Interrupteur : large cible tactile, etat lisible sans couleur seule
     (le texte sous l'interrupteur dit toujours l'etat en toutes lettres). */
  .switch {
    position: relative;
    width: 3.25rem;
    height: 1.85rem;
    border-radius: 999px;
    background: #d1d5db;
    border: none;
    cursor: pointer;
    transition: background 0.18s ease;
    flex-shrink: 0;
  }
  .switch:disabled { cursor: not-allowed; opacity: 0.65; }
  .switch:focus-visible { outline: 2px solid #4f46e5; outline-offset: 3px; }
  .switch-on { background: #059669; }

  .switch-knob {
    position: absolute;
    top: 0.235rem;
    left: 0.235rem;
    width: 1.38rem;
    height: 1.38rem;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: transform 0.18s ease;
  }
  .switch-on .switch-knob { transform: translateX(1.4rem); }

  @media (prefers-reduced-motion: reduce) {
    .switch, .switch-knob { transition: none; }
  }
</style>
