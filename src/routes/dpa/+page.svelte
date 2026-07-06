<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Accord de sous-traitance RGPD | Kotbo</title>
  <meta name="description" content="Conditions de sous-traitance des données applicables aux administrateurs utilisant Kotbo." />
</svelte:head>

<main class="min-h-screen bg-gray-50 text-gray-800 py-14 px-6">
  <article class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl p-7 md:p-12 shadow-sm prose-legal">
    <a href="{base}/" class="text-sm font-bold text-indigo-700 hover:underline">← Retour à Kotbo</a>
    <h1>Accord de sous-traitance des données</h1>
    <p class="lead">Version du 6 juillet 2026 — Article 28 du RGPD</p>

    <div class="notice">Cet accord complète les conditions d'utilisation de Kotbo. L'administrateur du serveur est le
      responsable du traitement ; Kotbo, opéré par Elouan Passereau et Nathan Rontey, est le sous-traitant. Contact :
      <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.</div>

    <h2>1. Objet et durée</h2>
    <p>Kotbo traite, pour le compte de l'administrateur, les données nécessaires aux modules activés sur son serveur Discord.
      Le traitement dure pendant la fourniture du service, sous réserve des durées et modalités présentées dans la politique de confidentialité.</p>

    <h2>2. Nature, finalités et personnes concernées</h2>
    <p>Les opérations comprennent la collecte depuis Discord ou les formulaires, l'organisation, la consultation, la modification,
      l'export et la suppression sur instruction. Les finalités sont la gestion communautaire, du staff, de la modération, des tickets,
      candidatures, événements, statistiques et sauvegardes. Sont concernés les membres, candidats, participants, membres du staff,
      modérateurs et administrateurs.</p>

    <h2>3. Données</h2>
    <p>Identifiants et profils Discord, activité, contenus fournis dans les formulaires et tickets, sanctions, données staff,
      invitations, événements, sauvegardes, journaux d'audit et données techniques. Le détail est publié dans la
      <a href="{base}/terms">politique de confidentialité</a>.</p>

    <h2>4. Instructions et obligations de Kotbo</h2>
    <ul>
      <li>traiter les données uniquement sur les instructions documentées résultant de la configuration et des demandes de l'administrateur ;</li>
      <li>garantir la confidentialité des personnes autorisées et limiter leurs accès au besoin d'en connaître ;</li>
      <li>mettre en œuvre des mesures adaptées de sécurité, d'isolation logique, de contrôle d'accès, de chiffrement en transit et de journalisation ;</li>
      <li>informer l'administrateur si une instruction paraît contraire au RGPD ;</li>
      <li>assister l'administrateur pour les demandes de droits, les analyses d'impact, la sécurité et les violations de données ;</li>
      <li>mettre à disposition les informations nécessaires à la démonstration de conformité et permettre un audit raisonnable.</li>
    </ul>

    <h2>5. Obligations de l'administrateur</h2>
    <ul>
      <li>disposer d'une base légale pour chaque module activé, informer les membres et limiter les accès du staff ;</li>
      <li>ne collecter que les données pertinentes, définir les durées applicables et traiter les demandes des personnes ;</li>
      <li>ne pas utiliser les champs libres pour collecter des données sensibles sans nécessité, base légale et garanties appropriées ;</li>
      <li>configurer Kotbo conformément au droit applicable et transmettre des instructions licites.</li>
    </ul>

    <h2>6. Sous-traitants ultérieurs</h2>
    <p>L'administrateur donne une autorisation générale au recours aux prestataires de la liste ci-dessous. Kotbo informera d'un
      changement substantiel afin de permettre une objection motivée avant son entrée en vigueur.</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Prestataire</th><th>Fonction</th><th>Zone ou transfert</th></tr></thead>
      <tbody>
        <tr><td>Hébergeur PostgreSQL et infrastructure Kotbo</td><td>Hébergement et sauvegardes</td><td>Europe</td></tr>
        <tr><td>Cloudflare</td><td>Réseau, cache et sécurité</td><td>Réseau mondial, garanties contractuelles applicables</td></tr>
        <tr><td>Discord Inc.</td><td>Plateforme source et destination des données</td><td>États-Unis, garanties annoncées par Discord</td></tr>
        <tr><td>Sentry, si activé</td><td>Diagnostic d'erreurs</td><td>Selon la région et le contrat configurés</td></tr>
        <tr><td>LibreTranslate, YouTube, Twitch</td><td>Modules optionnels</td><td>Selon le service activé</td></tr>
      </tbody>
    </table></div>

    <h2>7. Violations, restitution et audits</h2>
    <p>Kotbo notifie l'administrateur dans les meilleurs délais après avoir pris connaissance d'une violation affectant ses données,
      avec les informations disponibles. À la fin du service, les données sont restituées ou supprimées selon les modalités publiées
      et les obligations applicables. Les audits sont réalisés sur préavis raisonnable, sans compromettre la sécurité des autres clients.</p>

    <h2>8. Contact et exercice des droits</h2>
    <p>Les demandes et instructions sont adressées à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>. Un
      <a href="{base}/admin-notice">modèle d'information des membres</a> est fourni aux administrateurs.</p>

    <footer><a href="{base}/terms">Confidentialité</a><a href="{base}/cookies">Cookies</a><a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></footer>
  </article>
</main>

<style>
  .prose-legal{line-height:1.75}.prose-legal h1{font:800 2.4rem Manrope,sans-serif;margin:1.5rem 0 .25rem;color:#111827}.lead{color:#6b7280;font-weight:600}.prose-legal h2{font:800 1.35rem Manrope,sans-serif;margin:2.25rem 0 .6rem;color:#111827}.notice{margin:2rem 0;padding:1.25rem;border:1px solid #c7d2fe;background:#eef2ff;border-radius:1rem}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.9rem}th,td{text-align:left;vertical-align:top;padding:.85rem;border-bottom:1px solid #e5e7eb}th{background:#f9fafb}ul{padding-left:1.4rem;list-style:disc}a{color:#4338ca}footer{display:flex;flex-wrap:wrap;gap:1.25rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;font-weight:700}
</style>
