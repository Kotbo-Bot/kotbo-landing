<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'objet',        label: 'Objet & éditeur' },
    { id: 'acces',        label: 'Accès & âge minimal' },
    { id: 'admin',        label: "Rôle de l'administrateur" },
    { id: 'interdits',    label: 'Usages interdits' },
    { id: 'suspension',   label: 'Suspension & blacklist' },
    { id: 'disponibilite',label: 'Disponibilité & maintenance' },
    { id: 'responsabilite',label: 'Responsabilité' },
    { id: 'pi',           label: 'Propriété intellectuelle' },
    { id: 'contenus',     label: 'Contenus des utilisateurs' },
    { id: 'discord',      label: 'Dépendance à Discord' },
    { id: 'donnees',      label: 'Données personnelles' },
    { id: 'modification', label: 'Modification des CGU' },
    { id: 'droit',        label: 'Droit applicable' },
  ];
</script>

<svelte:head>
  <title>Conditions Générales d'Utilisation | Kotbo</title>
  <meta name="description" content="Conditions générales d'utilisation du bot Discord Kotbo et de son dashboard : accès, obligations, usages interdits, disponibilité, responsabilité et droit applicable." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Conditions Générales d'Utilisation"
  subtitle="Dernière mise à jour : 20 juillet 2026 · Bot Discord Kotbo et Dashboard associé"
  {sections}
  activePage="terms"
>
  <div class="info-box warn mb-10">
    <p class="font-bold mb-1">Acceptation des présentes conditions</p>
    <p class="mb-0">
      En invitant le bot Kotbo sur un serveur Discord, en accédant au dashboard ou en utilisant l'une de ses
      fonctionnalités, vous acceptez les présentes Conditions Générales d'Utilisation (« CGU »). Si vous n'acceptez pas
      ces conditions, n'utilisez pas le service. Le traitement des données personnelles est décrit séparément dans la
      <a href="{base}/privacy">politique de confidentialité</a>.
    </p>
  </div>

  <section id="objet" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Objet & éditeur du service</h2>
    <p>
      Kotbo est un bot Discord et un tableau de bord web destinés aux communautés francophones (gestion du staff,
      modération, tickets, statistiques, niveaux, événements, candidatures, économie et organisation de serveur). Le
      service est édité et opéré par <strong>Elouan Passereau</strong> et <strong>Nathan Rontey</strong>
      (« Kotbo », « nous »). Les coordonnées complètes figurent sur la page <a href="{base}/mentions-legales">Mentions légales</a>.
    </p>
    <p>Le service est fourni gratuitement, sauf indication contraire pour d'éventuelles options payantes qui seraient présentées séparément.</p>
  </section>

  <section id="acces" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Accès & âge minimal</h2>
    <ul>
      <li>L'utilisation de Kotbo suppose un compte Discord valide et le respect des Conditions de Discord.</li>
      <li>Vous devez avoir l'âge minimal requis par Discord dans votre pays (au moins 13 ans, 16 ans dans certains pays de l'UE).</li>
      <li>L'invitation du bot sur un serveur requiert les permissions Discord appropriées&nbsp;; seul un administrateur du serveur peut l'installer et le configurer.</li>
    </ul>
  </section>

  <section id="admin" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Rôle et obligations de l'administrateur</h2>
    <p>L'administrateur qui installe et configure Kotbo est responsable de son usage sur son serveur. À ce titre, il s'engage à&nbsp;:</p>
    <ul>
      <li>n'activer que les modules pour lesquels il dispose d'une base légale, et informer ses membres (voir <a href="{base}/admin-notice">modèle d'information</a>)&nbsp;;</li>
      <li>informer préalablement ses membres avant d'activer les modules les plus intrusifs (journalisation complète des messages, vérification anti multi-comptes, suivi détaillé du staff)&nbsp;;</li>
      <li>configurer les permissions du staff selon le besoin d'en connaître&nbsp;;</li>
      <li>ne pas utiliser Kotbo pour surveiller ou cibler illégalement des personnes, ni pour collecter des données sensibles sans base légale&nbsp;;</li>
      <li>répondre aux demandes des personnes concernant les traitements dont il est responsable (voir <a href="{base}/dpa">DPA</a>).</li>
    </ul>
  </section>

  <section id="interdits" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Usages interdits</h2>
    <p>Il est notamment interdit d'utiliser Kotbo pour&nbsp;:</p>
    <ul>
      <li>enfreindre la loi, les Conditions de Discord ou les droits de tiers&nbsp;;</li>
      <li>harceler, menacer, diffamer ou porter atteinte à autrui&nbsp;;</li>
      <li>diffuser des contenus illégaux, haineux, pédopornographiques ou manifestement offensants&nbsp;;</li>
      <li>tenter d'accéder sans autorisation au service, à ses données ou à celles d'autres serveurs&nbsp;;</li>
      <li>contourner les limitations techniques, surcharger ou perturber le service (spam, abus d'API, déni de service)&nbsp;;</li>
      <li>revendre, redistribuer ou exploiter le service en dehors de son usage prévu&nbsp;;</li>
      <li>utiliser le service pour contourner une sanction ou usurper une identité.</li>
    </ul>
  </section>

  <section id="suspension" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Suspension, blacklist & suppression</h2>
    <p>
      Nous pouvons, à tout moment et sans préavis en cas de risque, <strong>suspendre ou restreindre</strong> l'accès
      d'un utilisateur ou d'un serveur, l'inscrire sur une <strong>blacklist globale</strong>, ou retirer le bot, en cas
      de&nbsp;: violation des présentes CGU ou des règles de Discord, abus, risque de sécurité, ou obligation légale.
    </p>
    <p>
      Un serveur peut cesser d'utiliser Kotbo à tout moment en retirant le bot. Les conséquences sur les données sont
      décrites dans la <a href="{base}/privacy">politique de confidentialité</a> (durées de conservation).
    </p>
  </section>

  <section id="disponibilite" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Disponibilité & maintenance</h2>
    <p>
      Le service est fourni « en l'état » et « selon disponibilité ». Nous ne garantissons pas une disponibilité continue
      ni l'absence d'erreurs. Des interruptions peuvent survenir pour maintenance, mise à jour, incident technique ou
      cause extérieure (dont une indisponibilité de Discord). Nous pouvons faire évoluer, limiter ou arrêter tout ou
      partie des fonctionnalités.
    </p>
  </section>

  <section id="responsabilite" class="policy-section">
    <div class="section-badge">07</div>
    <h2>Limitation de responsabilité</h2>
    <p>
      Dans les limites permises par la loi, Kotbo ne saurait être tenu responsable des dommages indirects, de la perte de
      données, de la perte d'exploitation ou d'un usage non conforme du service par un administrateur ou un membre. Le
      service étant fourni à titre gratuit, notre responsabilité est limitée aux dommages directs résultant d'une faute
      qui nous serait imputable. Rien dans les présentes ne limite une responsabilité qui ne peut légalement l'être.
    </p>
  </section>

  <section id="pi" class="policy-section">
    <div class="section-badge">08</div>
    <h2>Propriété intellectuelle & licence</h2>
    <p>
      Le nom, les logos, l'interface et le code de Kotbo restent la propriété de leurs auteurs. L'utilisation du service
      vous confère un droit d'usage personnel, non exclusif et non transférable, limité au fonctionnement prévu. Aucune
      disposition ne vous cède de droit de propriété intellectuelle sur le service.
    </p>
  </section>

  <section id="contenus" class="policy-section">
    <div class="section-badge">09</div>
    <h2>Contenus fournis par les utilisateurs</h2>
    <p>
      Vous restez responsable des contenus que vous fournissez via Kotbo (messages, candidatures, tickets, suggestions,
      etc.). Vous garantissez disposer des droits nécessaires et que ces contenus ne sont pas illicites. Nous pouvons
      retirer ou refuser tout contenu contraire aux présentes CGU ou à la loi.
    </p>
  </section>

  <section id="discord" class="policy-section">
    <div class="section-badge">10</div>
    <h2>Dépendance à Discord</h2>
    <p>
      Kotbo fonctionne sur la plateforme Discord et dépend de son API. Votre utilisation reste soumise aux
      <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Conditions</a> et aux
      <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">politiques</a> de Discord. Kotbo
      n'est ni affilié à, ni approuvé par Discord Inc.
    </p>
  </section>

  <section id="donnees" class="policy-section">
    <div class="section-badge">11</div>
    <h2>Données personnelles</h2>
    <p>
      Le traitement des données personnelles est régi par la <a href="{base}/privacy">politique de confidentialité</a>,
      la <a href="{base}/cookies">politique cookies</a> et, pour la relation avec les administrateurs, l'
      <a href="{base}/dpa">accord de sous-traitance (DPA)</a>.
    </p>
  </section>

  <section id="modification" class="policy-section">
    <div class="section-badge">12</div>
    <h2>Modification des CGU</h2>
    <p>
      Nous pouvons modifier les présentes CGU pour refléter des évolutions du service ou de la réglementation. En cas de
      modification substantielle, une information est fournie via le serveur Discord officiel et/ou le dashboard, et la
      date en tête de page est mise à jour. La poursuite de l'utilisation après entrée en vigueur vaut acceptation.
    </p>
  </section>

  <section id="droit" class="policy-section">
    <div class="section-badge">13</div>
    <h2>Droit applicable & juridiction</h2>
    <p>
      Les présentes CGU sont régies par le <strong>droit français</strong>. En cas de litige, et à défaut de résolution
      amiable, les tribunaux français sont compétents, sous réserve des règles impératives de protection des
      consommateurs. Pour toute question&nbsp;: <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a>.
    </p>
  </section>
</LegalPageLayout>
