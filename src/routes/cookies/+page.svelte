<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
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
  subtitle="Dernière mise à jour : 6 juillet 2026 · Landing et Dashboard Kotbo"
  {sections}
  activePage="cookies"
>
  <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10 flex gap-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <div>
      <p class="font-bold text-indigo-900 text-sm mb-1">Aucune bannière de consentement nécessaire actuellement</p>
      <p class="text-indigo-800 text-sm leading-relaxed mb-0">
        Kotbo n'utilise aucun cookie publicitaire ni outil de mesure d'audience web. Les opérations décrites ci-dessous
        sont nécessaires à la sécurité, à l'authentification ou aux fonctionnalités demandées et restent documentées par transparence.
      </p>
    </div>
  </div>

  <section id="dashboard" class="policy-section">
    <div class="section-badge">01</div>
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
    <div class="section-badge">02</div>
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
    <div class="section-badge">03</div>
    <h2>Gérer ces données</h2>
    <p>
      Les préférences peuvent être réinitialisées depuis les paramètres du dashboard. Le stockage peut également être supprimé
      depuis les réglages du navigateur ; cela réinitialise les préférences et peut supprimer des brouillons locaux.
    </p>
    <p>Pour toute question, contactez <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.</p>
  </section>

  <section id="evolution" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Évolution</h2>
    <p>
      Si Kotbo ajoute ultérieurement un traceur non strictement nécessaire, celui-ci sera bloqué par défaut. Un mécanisme
      permettant d'accepter ou de refuser avec la même facilité sera alors présenté avant son activation.
    </p>
    <div class="info-box">
      Les traitements de données personnelles sont détaillés dans la <a href="{base}/terms">politique de confidentialité</a> et les relations avec les administrateurs dans l'<a href="{base}/dpa">accord de sous-traitance</a>.
    </div>
  </section>
</LegalPageLayout>
