<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'parties', label: 'Parties & acceptation' },
    { id: 'objet', label: 'Objet et durée' },
    { id: 'nature', label: 'Nature et finalités' },
    { id: 'donnees', label: 'Données concernées' },
    { id: 'kotbo', label: 'Obligations de Kotbo' },
    { id: 'administrateur', label: "Obligations de l'administrateur" },
    { id: 'sous-traitants', label: 'Sous-traitants ultérieurs' },
    { id: 'transferts', label: 'Transferts internationaux' },
    { id: 'violations', label: 'Violations & notification' },
    { id: 'restitution', label: 'Restitution & suppression' },
    { id: 'audits', label: 'Audits' },
    { id: 'toms', label: 'Annexe — Mesures (TOMs)' },
    { id: 'contact', label: 'Contact et droits' },
  ];
</script>

<svelte:head>
  <title>Accord de sous-traitance RGPD | Kotbo</title>
  <meta name="description" content="Accord de sous-traitance (DPA, article 28 RGPD) applicable aux administrateurs utilisant Kotbo : obligations, sous-traitants, transferts, notification d'incident et mesures de sécurité." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Accord de sous-traitance des données"
  subtitle="Version 2.0 du 20 juillet 2026 · Article 28 du RGPD"
  {sections}
  activePage="dpa"
>
  <div class="info-box warn mb-10">
    <p class="font-bold mb-1">Répartition des responsabilités</p>
    <p class="mb-0">
      L'administrateur du serveur (le « <strong>Responsable</strong> ») détermine les finalités et moyens des traitements
      propres à sa communauté. Kotbo, opéré par Elouan Passereau et Nathan Rontey (le « <strong>Sous-traitant</strong> »),
      agit sur ses instructions pour ces traitements. Pour les traitements de sécurité globale, blacklist globale et
      journaux techniques, Kotbo agit en revanche comme responsable (voir la
      <a href="{base}/privacy">politique de confidentialité</a>, §1). Contact&nbsp;:
      <a href="mailto:privacy@kotbo.fr" class="font-bold underline">privacy@kotbo.fr</a>.
    </p>
  </div>

  <section id="parties" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Parties et modalités d'acceptation</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Partie</th><th>Identité</th></tr></thead>
        <tbody>
          <tr><td>Sous-traitant</td><td>Kotbo — Elouan Passereau &amp; Nathan Rontey · particuliers, édition à titre non professionnel · contact <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></td></tr>
          <tr><td>Responsable</td><td>L'administrateur du serveur Discord ayant invité et configuré Kotbo, identifié par son compte Discord et l'identifiant de serveur (Guild ID) concerné.</td></tr>
        </tbody>
      </table>
    </div>
    <p>
      <strong>Acceptation.</strong> Le présent accord est réputé accepté par le Responsable lors de l'invitation du bot
      et de l'activation des modules. Une acceptation horodatée et versionnée est enregistrée côté service (identifiant
      de serveur, identifiant administrateur, numéro de version et date). Le Responsable peut demander une copie de cette
      trace à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.
    </p>
    <div class="info-box">
      <strong>Version&nbsp;:</strong> 2.0 · <strong>Entrée en vigueur&nbsp;:</strong> 20 juillet 2026. Toute nouvelle
      version substantielle est notifiée (voir §7) et fait l'objet d'une nouvelle acceptation enregistrée.
    </div>
  </section>

  <section id="objet" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Objet et durée</h2>
    <p>
      Kotbo traite, pour le compte du Responsable, les données nécessaires aux modules activés sur son serveur. Le
      traitement dure pendant la fourniture du service, sous réserve des durées et modalités présentées dans la
      <a href="{base}/privacy">politique de confidentialité</a> (§7). Il prend fin au retrait du bot ou à la résiliation.
    </p>
  </section>

  <section id="nature" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Nature, finalités et personnes concernées</h2>
    <p>
      Les opérations comprennent la collecte (depuis Discord ou des formulaires), l'organisation, la consultation, la
      modification, l'export et la suppression sur instruction. Les finalités couvrent la gestion communautaire, le staff,
      la modération, les tickets, les candidatures, les événements, les statistiques, l'économie et les sauvegardes.
    </p>
    <div class="info-box">
      Personnes concernées&nbsp;: membres, candidats, participants, membres du staff, modérateurs et administrateurs des serveurs configurés avec Kotbo.
    </div>
  </section>

  <section id="donnees" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Données concernées</h2>
    <ul>
      <li>identifiants, profils et métadonnées Discord ;</li>
      <li>activité, participations, invitations et statistiques communautaires ;</li>
      <li>contenu des messages lorsque la journalisation est activée par le Responsable ;</li>
      <li>données de vérification de sécurité (IP, appareil, e-mail, connexions, serveurs, preuves de doublon) ;</li>
      <li>contenus des formulaires, candidatures et tickets ;</li>
      <li>sanctions, données staff, sauvegardes et journaux d'audit.</li>
    </ul>
    <p>Le détail complet est publié dans la <a href="{base}/privacy">politique de confidentialité</a> (§2 à §4).</p>
  </section>

  <section id="kotbo" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Instructions et obligations de Kotbo</h2>
    <ul>
      <li>traiter les données uniquement sur instructions documentées résultant de la configuration et des demandes du Responsable, y compris pour les transferts ;</li>
      <li>garantir la confidentialité des personnes autorisées et limiter les accès au besoin d'en connaître ;</li>
      <li>mettre en œuvre les mesures techniques et organisationnelles de l'annexe (§12) ;</li>
      <li>informer le Responsable si une instruction paraît contraire au RGPD ;</li>
      <li>assister le Responsable pour les demandes de droits, les analyses d'impact, la sécurité et les violations ;</li>
      <li>tenir un registre des catégories d'activités de traitement effectuées pour le compte du Responsable ;</li>
      <li>mettre à disposition les informations nécessaires à la démonstration de conformité et permettre les audits (§11).</li>
    </ul>
  </section>

  <section id="administrateur" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Obligations de l'administrateur (Responsable)</h2>
    <ul>
      <li>disposer d'une base légale pour chaque module activé, informer les membres et limiter les accès du staff ;</li>
      <li>informer préalablement les membres avant d'activer les modules intrusifs (journalisation des messages, vérification anti multi-comptes, suivi détaillé du staff) ;</li>
      <li>ne collecter que les données pertinentes, définir des durées proportionnées et traiter les demandes des personnes ;</li>
      <li>ne pas utiliser les champs libres pour collecter des données sensibles sans nécessité, base légale et garanties ;</li>
      <li>transmettre des instructions licites et configurer Kotbo conformément au droit applicable.</li>
    </ul>
    <div class="info-box">
      Un <a href="{base}/admin-notice">modèle d'information des membres</a> est fourni et doit être adapté aux modules, finalités et durées réellement retenus par le serveur.
    </div>
  </section>

  <section id="sous-traitants" class="policy-section">
    <div class="section-badge">07</div>
    <h2>Sous-traitants ultérieurs</h2>
    <p>
      Le Responsable donne une autorisation générale au recours aux prestataires ci-dessous. Kotbo informe de tout ajout
      ou remplacement <strong>au moins 30 jours avant</strong> son entrée en vigueur, afin de permettre une objection
      motivée&nbsp;; à défaut d'accord, le Responsable peut cesser d'utiliser le module concerné ou retirer le bot.
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Prestataire</th><th>Fonction</th><th>Pays / zone</th></tr></thead>
        <tbody>
          <tr><td>Contabo GmbH</td><td>Hébergement de la base et de l'infrastructure, sauvegardes</td><td>Allemagne (Union européenne)</td></tr>
          <tr><td>Cloudflare, Inc.</td><td>Réseau, cache et sécurité (WAF, anti-abus)</td><td>États-Unis / réseau mondial — clauses contractuelles types</td></tr>
          <tr><td>Discord Inc.</td><td>Plateforme source et destination des données</td><td>États-Unis — garanties annoncées par Discord</td></tr>
          <tr><td>Sentry (Functional Software, Inc.)</td><td>Diagnostic d'erreurs (si activé)</td><td>Selon la région et le contrat configurés</td></tr>
          <tr><td>LibreTranslate, YouTube, Twitch</td><td>Modules optionnels</td><td>Selon le service activé — pas de données personnelles de membres pour YouTube/Twitch</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="transferts" class="policy-section">
    <div class="section-badge">08</div>
    <h2>Transferts internationaux</h2>
    <p>
      Les données sont hébergées dans l'EEE. Les transferts hors EEE éventuels (Discord, Cloudflare, Sentry) sont encadrés
      par des <strong>clauses contractuelles types</strong> de la Commission européenne et/ou les mécanismes de conformité
      des prestataires concernés. Aucun transfert n'est réalisé en dehors de ces garanties.
    </p>
  </section>

  <section id="violations" class="policy-section">
    <div class="section-badge">09</div>
    <h2>Violations de données & notification</h2>
    <p>
      Kotbo notifie le Responsable <strong>dans les meilleurs délais et au plus tard 48 heures</strong> après avoir pris
      connaissance d'une violation affectant ses données, par e-mail à l'adresse de contact du serveur. La notification
      précise, dans la mesure du possible&nbsp;: la nature de la violation, les catégories et le volume approximatif de
      données et de personnes concernées, les conséquences probables et les mesures prises ou proposées. Kotbo assiste le
      Responsable dans son éventuelle notification à l'autorité de contrôle (72 h) et aux personnes concernées.
    </p>
  </section>

  <section id="restitution" class="policy-section">
    <div class="section-badge">10</div>
    <h2>Restitution et suppression</h2>
    <ul>
      <li>À la fin du service, les données sont, au choix du Responsable, <strong>restituées</strong> (export structuré) puis supprimées, ou directement <strong>supprimées</strong>.</li>
      <li>La suppression des données actives intervient dans un délai de <strong>30 jours</strong> après la fin du service ou une demande recevable.</li>
      <li>Les copies présentes dans les <strong>sauvegardes</strong> chiffrées expirent selon le cycle de rotation, dans un délai maximal de <strong>35 jours</strong>, période pendant laquelle elles ne sont plus utilisées activement.</li>
      <li>Kotbo peut conserver certaines données si une obligation légale l'impose, en le documentant.</li>
    </ul>
  </section>

  <section id="audits" class="policy-section">
    <div class="section-badge">11</div>
    <h2>Audits</h2>
    <p>
      Kotbo met à disposition les informations nécessaires à la démonstration de conformité. Le Responsable peut demander
      un audit <strong>une fois par an</strong> (ou après un incident), sur <strong>préavis raisonnable de 30 jours</strong>,
      par la fourniture de documentation, un questionnaire de sécurité ou une réunion, sans compromettre la sécurité ni la
      confidentialité des autres clients. Les audits sur site restent exceptionnels et encadrés.
    </p>
  </section>

  <section id="toms" class="policy-section">
    <div class="section-badge">12</div>
    <h2>Annexe — Mesures techniques et organisationnelles (TOMs)</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Domaine</th><th>Mesures</th></tr></thead>
        <tbody>
          <tr><td>Chiffrement</td><td>TLS/HTTPS en transit ; jetons Discord chiffrés côté serveur ; clés API stockées en hash SHA-256.</td></tr>
          <tr><td>Contrôle d'accès</td><td>OAuth2 Authorization Code, sessions serveur révocables, cookie HttpOnly ; permissions granulaires par serveur ; accès équipe restreint au besoin d'en connaître.</td></tr>
          <tr><td>Isolation</td><td>Cloisonnement logique par serveur (Guild ID) ; un serveur ne peut accéder aux données d'un autre.</td></tr>
          <tr><td>Journalisation</td><td>Journaux d'audit des actions administratives (auteur, action, horodatage).</td></tr>
          <tr><td>Sauvegardes</td><td>Sauvegardes régulières avec contrôle d'intégrité et expiration.</td></tr>
          <tr><td>Minimisation</td><td>Collecte limitée aux modules activés ; profils privés par défaut ; filtrage des secrets dans les journaux.</td></tr>
          <tr><td>Organisation</td><td>Obligation de confidentialité de l'équipe ; procédure d'exercice des droits ; revue à chaque nouveau module ou prestataire.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="info-box warn">
      Certaines mesures relèvent de la configuration d'infrastructure de production (TLS de la base, chiffrement et
      localisation des sauvegardes, isolation effective) et doivent être vérifiées et maintenues à jour indépendamment du
      code source public.
    </div>
  </section>

  <section id="contact" class="policy-section">
    <div class="section-badge">13</div>
    <h2>Contact et exercice des droits</h2>
    <p>
      Les demandes, instructions et questions contractuelles sont adressées à
      <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.
    </p>
    <div class="info-box">
      Consultez également la <a href="{base}/privacy">politique de confidentialité</a>, les <a href="{base}/terms">CGU</a>,
      la <a href="{base}/cookies">politique cookies</a>, les <a href="{base}/mentions-legales">mentions légales</a> et le
      <a href="{base}/admin-notice">modèle d'information des membres</a>.
    </div>
  </section>
</LegalPageLayout>
