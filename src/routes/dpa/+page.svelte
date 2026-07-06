<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'objet', label: 'Objet et durée' },
    { id: 'nature', label: 'Nature et finalités' },
    { id: 'donnees', label: 'Données concernées' },
    { id: 'kotbo', label: 'Obligations de Kotbo' },
    { id: 'administrateur', label: "Obligations de l'administrateur" },
    { id: 'sous-traitants', label: 'Sous-traitants ultérieurs' },
    { id: 'violations', label: 'Violations et audits' },
    { id: 'contact', label: 'Contact et droits' },
  ];
</script>

<svelte:head>
  <title>Accord de sous-traitance RGPD | Kotbo</title>
  <meta name="description" content="Conditions de sous-traitance des données applicables aux administrateurs utilisant Kotbo." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Accord de sous-traitance des données"
  subtitle="Version du 6 juillet 2026 · Article 28 du RGPD"
  {sections}
  activePage="dpa"
>
  <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 flex gap-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <div>
      <p class="font-bold text-amber-800 text-sm mb-1">Répartition des responsabilités</p>
      <p class="text-amber-700 text-sm leading-relaxed mb-0">
        L'administrateur du serveur est responsable du traitement des données propres à sa communauté. Kotbo, opéré par
        Elouan Passereau et Nathan Rontey, intervient comme sous-traitant. Contact :
        <a href="mailto:privacy@kotbo.fr" class="font-bold underline">privacy@kotbo.fr</a>.
      </p>
    </div>
  </div>

  <section id="objet" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Objet et durée</h2>
    <p>
      Kotbo traite, pour le compte de l'administrateur, les données nécessaires aux modules activés sur son serveur Discord.
      Le traitement dure pendant la fourniture du service, sous réserve des durées et modalités présentées dans la
      <a href="{base}/terms">politique de confidentialité</a>.
    </p>
  </section>

  <section id="nature" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Nature, finalités et personnes concernées</h2>
    <p>
      Les opérations comprennent la collecte depuis Discord ou les formulaires, l'organisation, la consultation, la modification,
      l'export et la suppression sur instruction. Les finalités couvrent la gestion communautaire, le staff, la modération, les tickets,
      les candidatures, les événements, les statistiques et les sauvegardes.
    </p>
    <div class="info-box">
      Les personnes concernées sont les membres, candidats, participants, membres du staff, modérateurs et administrateurs des serveurs configurés avec Kotbo.
    </div>
  </section>

  <section id="donnees" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Données concernées</h2>
    <p>Les catégories susceptibles d'être traitées selon les modules activés sont notamment :</p>
    <ul>
      <li>identifiants, profils et métadonnées Discord ;</li>
      <li>activité, participations, invitations et statistiques communautaires ;</li>
      <li>contenus fournis dans les formulaires, candidatures et tickets ;</li>
      <li>sanctions, données staff, sauvegardes et journaux d'audit ;</li>
      <li>données techniques nécessaires à la sécurité et au fonctionnement.</li>
    </ul>
    <p>Le détail complet est publié dans la <a href="{base}/terms">politique de confidentialité</a>.</p>
  </section>

  <section id="kotbo" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Instructions et obligations de Kotbo</h2>
    <ul>
      <li>traiter les données uniquement sur les instructions documentées résultant de la configuration et des demandes de l'administrateur ;</li>
      <li>garantir la confidentialité des personnes autorisées et limiter leurs accès au besoin d'en connaître ;</li>
      <li>mettre en œuvre des mesures adaptées de sécurité, d'isolation logique, de contrôle d'accès, de chiffrement en transit et de journalisation ;</li>
      <li>informer l'administrateur si une instruction paraît contraire au RGPD ;</li>
      <li>assister l'administrateur pour les demandes de droits, les analyses d'impact, la sécurité et les violations de données ;</li>
      <li>mettre à disposition les informations nécessaires à la démonstration de conformité et permettre un audit raisonnable.</li>
    </ul>
  </section>

  <section id="administrateur" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Obligations de l'administrateur</h2>
    <ul>
      <li>disposer d'une base légale pour chaque module activé, informer les membres et limiter les accès du staff ;</li>
      <li>ne collecter que les données pertinentes, définir les durées applicables et traiter les demandes des personnes ;</li>
      <li>ne pas utiliser les champs libres pour collecter des données sensibles sans nécessité, base légale et garanties appropriées ;</li>
      <li>configurer Kotbo conformément au droit applicable et transmettre des instructions licites.</li>
    </ul>
    <div class="info-box">
      Un <a href="{base}/admin-notice">modèle d'information des membres</a> est fourni et doit être adapté aux modules, finalités et durées réellement retenus par le serveur.
    </div>
  </section>

  <section id="sous-traitants" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Sous-traitants ultérieurs</h2>
    <p>
      L'administrateur donne une autorisation générale au recours aux prestataires ci-dessous. Kotbo informera d'un changement
      substantiel afin de permettre une objection motivée avant son entrée en vigueur.
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Prestataire</th><th>Fonction</th><th>Zone ou transfert</th></tr></thead>
        <tbody>
          <tr><td>Hébergeur PostgreSQL et infrastructure Kotbo</td><td>Hébergement et sauvegardes</td><td>Europe</td></tr>
          <tr><td>Cloudflare</td><td>Réseau, cache et sécurité</td><td>Réseau mondial, garanties contractuelles applicables</td></tr>
          <tr><td>Discord Inc.</td><td>Plateforme source et destination des données</td><td>États-Unis, garanties annoncées par Discord</td></tr>
          <tr><td>Sentry, si activé</td><td>Diagnostic d'erreurs</td><td>Selon la région et le contrat configurés</td></tr>
          <tr><td>LibreTranslate, YouTube, Twitch</td><td>Modules optionnels</td><td>Selon le service activé</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="violations" class="policy-section">
    <div class="section-badge">07</div>
    <h2>Violations, restitution et audits</h2>
    <p>
      Kotbo notifie l'administrateur dans les meilleurs délais après avoir pris connaissance d'une violation affectant ses données,
      avec les informations disponibles. À la fin du service, les données sont restituées ou supprimées selon les modalités publiées
      et les obligations applicables.
    </p>
    <p>Les audits sont réalisés sur préavis raisonnable, sans compromettre la sécurité des autres clients.</p>
  </section>

  <section id="contact" class="policy-section">
    <div class="section-badge">08</div>
    <h2>Contact et exercice des droits</h2>
    <p>
      Les demandes, instructions et questions contractuelles sont adressées à
      <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.
    </p>
    <div class="info-box">
      Consultez également la <a href="{base}/terms">politique de confidentialité</a>, la <a href="{base}/cookies">politique cookies</a> et le <a href="{base}/admin-notice">modèle d'information des membres</a>.
    </div>
  </section>
</LegalPageLayout>
