<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Cookies et stockage local | Kotbo</title>
  <meta name="description" content="Informations sur les cookies et stockages locaux utilisés par Kotbo." />
</svelte:head>

<main class="min-h-screen bg-gray-50 text-gray-800 py-14 px-6">
  <article class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl p-7 md:p-12 shadow-sm prose-legal">
    <a href="{base}/" class="text-sm font-bold text-indigo-700 hover:underline">← Retour à Kotbo</a>
    <h1>Cookies et stockage local</h1>
    <p class="lead">Dernière mise à jour : 6 juillet 2026</p>

    <div class="notice">
      Kotbo n'utilise actuellement aucun cookie publicitaire ni outil de mesure d'audience web. Les opérations décrites
      ci-dessous sont nécessaires à la sécurité, à l'authentification ou aux fonctionnalités demandées. Elles ne nécessitent
      donc pas de bannière de consentement, mais restent documentées par transparence.
    </div>

    <h2>Cookies du dashboard</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Nom</th><th>Finalité</th><th>Durée</th></tr></thead>
      <tbody>
        <tr><td><code>__Host-kotbo_session</code></td><td>Maintenir la session authentifiée. Cookie sécurisé, <em>HttpOnly</em> et inaccessible à JavaScript.</td><td>7 jours maximum</td></tr>
        <tr><td><code>kotbo_oauth_state</code></td><td>Empêcher les attaques CSRF pendant la connexion Discord.</td><td>5 minutes</td></tr>
        <tr><td><code>kotbo_oauth_verifier</code></td><td>Vérifier le flux OAuth PKCE.</td><td>5 minutes</td></tr>
        <tr><td><code>kotbo_oauth_return_to</code></td><td>Revenir à la page demandée après connexion.</td><td>5 minutes</td></tr>
        <tr><td><code>cf_clearance</code>, <code>__cf_bm</code> ou équivalent</td><td>Protection Cloudflare contre les attaques et robots, uniquement lorsque le contrôle de sécurité l'exige.</td><td>Selon le contrôle de sécurité</td></tr>
      </tbody>
    </table></div>

    <h2>Stockage local du navigateur</h2>
    <p>Le dashboard peut mémoriser localement, sans les envoyer à un service publicitaire :</p>
    <ul>
      <li>le serveur sélectionné, le thème, la sidebar, les favoris et les préférences d'interface ;</li>
      <li>la progression des tutoriels et l'état temporaire de certaines erreurs ;</li>
      <li>les brouillons explicitement enregistrés, modèles d'embed, disposition du dashboard et notes locales du staff ;</li>
      <li>le langage choisi et les données temporaires de l'IDE.</li>
    </ul>
    <p>Le jeton d'authentification Discord ou Kotbo n'est pas conservé dans <code>localStorage</code>.</p>

    <h2>Gérer ces données</h2>
    <p>Les préférences peuvent être réinitialisées depuis les paramètres du dashboard. Le stockage peut aussi être supprimé
      depuis les réglages du navigateur ; cela réinitialise les préférences et peut supprimer des brouillons locaux.</p>

    <h2>Évolution</h2>
    <p>Si Kotbo ajoute ultérieurement un traceur non strictement nécessaire, il sera bloqué par défaut et un mécanisme de
      consentement permettant d'accepter ou refuser avec la même facilité sera présenté avant son activation.</p>

    <footer><a href="{base}/terms">Confidentialité</a><a href="{base}/dpa">DPA</a><a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></footer>
  </article>
</main>

<style>
  .prose-legal{line-height:1.75}.prose-legal h1{font:800 2.4rem Manrope,sans-serif;margin:1.5rem 0 .25rem;color:#111827}.lead{color:#6b7280;font-weight:600}.prose-legal h2{font:800 1.35rem Manrope,sans-serif;margin:2.25rem 0 .6rem;color:#111827}.notice{margin:2rem 0;padding:1.25rem;border:1px solid #c7d2fe;background:#eef2ff;border-radius:1rem}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.9rem}th,td{text-align:left;vertical-align:top;padding:.85rem;border-bottom:1px solid #e5e7eb}th{background:#f9fafb}code{background:#f3f4f6;padding:.1rem .3rem;border-radius:.3rem}ul{padding-left:1.4rem;list-style:disc}footer{display:flex;flex-wrap:wrap;gap:1.25rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;font-weight:700;color:#4338ca}
</style>
