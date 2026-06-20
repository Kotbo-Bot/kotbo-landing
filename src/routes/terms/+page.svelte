<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => { scrolled = window.scrollY > 30; };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const lastUpdate = "20 juin 2026";
  const sections = [
    { id: "responsable",   label: "Responsable du traitement" },
    { id: "collecte",      label: "Données collectées" },
    { id: "finalites",     label: "Finalités & bases légales" },
    { id: "destinataires", label: "Destinataires" },
    { id: "retention",     label: "Durée de conservation" },
    { id: "hebergement",   label: "Hébergement & transferts" },
    { id: "droits",        label: "Vos droits (RGPD)" },
    { id: "securite",      label: "Sécurité" },
    { id: "mineurs",       label: "Mineurs" },
    { id: "modifications", label: "Modifications" },
    { id: "contact",       label: "Contact" },
  ];
</script>

<svelte:head>
  <title>Politique de Confidentialité | Kotbo</title>
  <meta name="description" content="Politique de confidentialité et protection des données personnelles du bot Discord Kotbo. Informations sur la collecte, le traitement et vos droits." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<!-- Nav sticky -->
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Retour à l'accueil
    </a>
  </nav>
</div>

<div class="min-h-screen">
  <!-- Hero de la page -->
  <header class="bg-white border-b border-gray-100 py-14">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <div class="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.283-.638-4.42-1.748-6.243M6.95 5.975A12 12 0 0118 6c.34.07.674.154 1 .25" />
        </svg>
        <span class="text-indigo-700 font-bold text-xs uppercase tracking-widest">Conformité RGPD</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 font-headline">
        Politique de Confidentialité
      </h1>
      <p class="text-gray-500 font-semibold text-sm mt-4">
        Dernière mise à jour&nbsp;: <span class="text-gray-700">{lastUpdate}</span>
        &nbsp;·&nbsp;
        Applicable au bot Discord Kotbo et au Dashboard associé
      </p>
    </div>
  </header>

  <!-- Layout deux colonnes : sommaire + contenu -->
  <div class="max-w-[82rem] mx-auto px-6 py-14 flex flex-col lg:flex-row gap-10 items-start">

    <!-- Sommaire latéral (sticky) -->
    <aside class="lg:sticky lg:top-24 lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 self-start">
      <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Sommaire</p>
      <nav class="flex flex-col gap-1">
        {#each sections as s}
          <a
            href="#{s.id}"
            class="text-sm font-semibold text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg px-3 py-2 transition-colors"
          >{s.label}</a>
        {/each}
      </nav>
    </aside>

    <!-- Corps principal -->
    <main class="flex-1 max-w-3xl prose-policy">

      <!-- Préambule -->
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 flex gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div>
          <p class="font-bold text-amber-800 text-sm mb-1">À destination des administrateurs de serveur Discord</p>
          <p class="text-amber-700 text-sm leading-relaxed">
            En ajoutant Kotbo à votre serveur, vous agissez en tant que <strong>responsable de traitement conjoint</strong>.
            Vous êtes tenus d'informer vos membres de l'utilisation du bot et de la présente politique de confidentialité,
            conformément à l'article 13 du RGPD.
          </p>
        </div>
      </div>

      <!-- Section 1 -->
      <section id="responsable" class="policy-section">
        <div class="section-badge">01</div>
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées via le bot Discord <strong>Kotbo</strong> est
          l'équipe de développement de Kotbo, joignable à l'adresse&nbsp;:
          <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a>.
        </p>
        <p>
          Kotbo est un bot Discord conçu pour les communautés francophones. Il fournit des fonctionnalités de gestion
          de staff, de modération, de tickets, de statistiques, de niveaux, d'événements, de candidatures et
          d'organisation communautaire. Kotbo opère exclusivement au sein des serveurs Discord où il a été
          explicitement invité par un administrateur.
        </p>
        <div class="info-box">
          <strong>Rôles distincts :</strong>
          <ul>
            <li><strong>Kotbo (équipe de développement)</strong> — responsable de traitement pour les données techniques globales (journaux d'erreurs, statistiques d'utilisation agrégées, administration globale).</li>
            <li><strong>L'administrateur du serveur Discord</strong> — responsable de traitement pour les données collectées dans le cadre de son serveur spécifique (profils membres, sanctions, candidatures, etc.).</li>
          </ul>
        </div>
      </section>

      <!-- Section 2 -->
      <section id="collecte" class="policy-section">
        <div class="section-badge">02</div>
        <h2>Données collectées</h2>
        <p>
          Kotbo collecte uniquement les données nécessaires au fonctionnement des modules activés sur chaque serveur.
          Les données sont rattachées à l'identifiant de serveur Discord (<em>Guild ID</em>) concerné et
          supprimées en cascade si le serveur retire Kotbo. Voici le détail exhaustif par catégorie&nbsp;:
        </p>

        <h3>2.1 Données de profil Discord</h3>
        <p>Collectées automatiquement lorsqu'un utilisateur interagit avec le bot ou est présent sur un serveur utilisant Kotbo&nbsp;:</p>
        <table>
          <thead>
            <tr><th>Donnée</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Identifiant Discord (<em>userId</em>)</td><td>Identifiant unique Discord (Snowflake). Non modifiable.</td></tr>
            <tr><td>Nom d'utilisateur, tag, nom global, nom d'affichage</td><td>Tels que définis dans votre profil Discord public.</td></tr>
            <tr><td>URL de l'avatar et de la bannière</td><td>Liens vers les médias de profil Discord.</td></tr>
            <tr><td>Couleur d'accentuation</td><td>Couleur de profil Discord.</td></tr>
            <tr><td>Locale (langue)</td><td>Langue configurée sur Discord.</td></tr>
            <tr><td>Biographie</td><td>Bio Discord publique, si renseignée.</td></tr>
            <tr><td>Date de création du compte Discord</td><td>Calculée depuis le Snowflake Discord.</td></tr>
            <tr><td>Dates d'entrée et de sortie du serveur</td><td>Horodatages d'arrivée et de départ du serveur.</td></tr>
          </tbody>
        </table>

        <h3>2.2 Données d'activité et statistiques</h3>
        <p>Collectées quotidiennement pour les modules de statistiques et de niveaux&nbsp;:</p>
        <table>
          <thead>
            <tr><th>Donnée</th><th>Finalité</th></tr>
          </thead>
          <tbody>
            <tr><td>Nombre de messages envoyés (par jour et par salon)</td><td>Statistiques serveur, système de niveaux/XP</td></tr>
            <tr><td>Temps passé en salon vocal (minutes)</td><td>Statistiques serveur, niveaux, activité staff</td></tr>
            <tr><td>Nombre de réactions, threads créés, réponses</td><td>Statistiques détaillées serveur</td></tr>
            <tr><td>Points XP et niveau Kotbo</td><td>Système de niveaux par serveur</td></tr>
            <tr><td>Dernière activité (dernier message, dernière présence)</td><td>Profil membre, gestion de l'activité staff</td></tr>
            <tr><td>Sessions vocales staff (salon, heure d'arrivée, durée)</td><td>Suivi d'activité pour les membres du staff</td></tr>
          </tbody>
        </table>

        <h3>2.3 Données de modération et sanctions</h3>
        <p>Collectées lors de l'application d'une sanction via Kotbo&nbsp;:</p>
        <ul>
          <li>Identifiant Discord de l'utilisateur sanctionné et de son tag.</li>
          <li>Identifiant Discord du modérateur ayant appliqué la sanction.</li>
          <li>Type de sanction&nbsp;: avertissement, expulsion (<em>kick</em>), exclusion temporaire (<em>timeout</em>), bannissement temporaire, bannissement permanent, <em>softban</em>.</li>
          <li>Motif de la sanction, durée, date d'expiration.</li>
          <li>Rapports de sanction&nbsp;: description détaillée de l'incident, règles enfreintes, liens de preuves, notes additionnelles.</li>
          <li>Statut actif/résolu et notes de résolution.</li>
        </ul>

        <h3>2.4 Données du personnel (module Staff)</h3>
        <p>Collectées uniquement pour les utilisateurs ayant le rôle Staff sur un serveur utilisant le module de gestion du personnel&nbsp;:</p>
        <ul>
          <li>Grade, date d'entrée dans le staff, historique des grades.</li>
          <li>Avertissements internes staff (raison, émetteur, date d'expiration).</li>
          <li>Inscriptions sur liste noire staff (raison, dates).</li>
          <li>Périodes d'essai/tutorat&nbsp;: progression, rapports du mentor, journaux de tutorat.</li>
          <li>Absences&nbsp;: dates, type, raison, statut, décision du supérieur.</li>
          <li>Présences aux réunions&nbsp;: statut (présent, excusé, absent), heure de pointage.</li>
          <li>Notes confidentielles rédigées par des responsables.</li>
          <li>Votes dans les sondages staff (potentiellement anonymisés selon la configuration).</li>
          <li>Lecture et validation des procédures internes.</li>
          <li>Démissions&nbsp;: raison, statut, décision.</li>
        </ul>

        <h3>2.5 Suivi des invitations</h3>
        <p>
          Lorsque le module de suivi des invitations est activé, Kotbo enregistre&nbsp;: l'identifiant Discord de
          l'utilisateur ayant rejoint, le code d'invitation utilisé, l'identifiant Discord et le tag de l'invitant,
          ainsi que les horodatages d'arrivée et de départ. Ces données servent à produire des classements
          d'invitations et à détecter les abus.
        </p>

        <h3>2.6 Détection de multi-comptes</h3>
        <p>
          Le module de comptes liés (<em>LinkedAccounts</em>) peut associer deux identifiants Discord appartenant
          à une même personne, sur la base d'une détection automatique ou d'une décision manuelle d'un modérateur.
          Des métadonnées de preuve sont stockées. Cette fonctionnalité est exclusivement à la discrétion de
          l'administrateur du serveur.
        </p>

        <h3>2.7 Candidatures au staff</h3>
        <p>Lorsque le module de recrutement est actif, les données suivantes peuvent être collectées via des formulaires&nbsp;:</p>
        <ul>
          <li>Identifiant Discord et nom d'utilisateur.</li>
          <li>Adresse e-mail (si demandée dans le formulaire du serveur).</li>
          <li>Toutes les réponses fournies dans le formulaire de candidature (données JSON).</li>
          <li>Notes internes du staff, résultat de l'entretien oral, motif de refus éventuel.</li>
          <li>Période de cooldown de re-candidature.</li>
        </ul>

        <h3>2.8 Tickets de support</h3>
        <p>
          Lorsqu'un utilisateur ouvre un ticket via Kotbo, sont enregistrés&nbsp;: son identifiant Discord, son nom
          d'utilisateur, la raison et la description fournies à l'ouverture, ainsi qu'un <strong>transcript HTML
          complet</strong> de la conversation dans le salon du ticket. Ces transcripts peuvent contenir tout message
          échangé avec le staff.
        </p>

        <h3>2.9 Événements (Quiz, CTF)</h3>
        <p>
          Lors des événements organisés via Kotbo, sont enregistrés&nbsp;: l'identifiant Discord, le nom d'utilisateur
          et le tag du participant, son score, ses réponses aux questions (quiz) et ses résolutions de challenges (CTF),
          les horodatages de participation.
        </p>

        <h3>2.10 Suggestions, Giveaways et Flux</h3>
        <ul>
          <li><strong>Suggestions&nbsp;:</strong> identifiant Discord, nom d'utilisateur, contenu de la suggestion, identifiants des votants (pour/contre).</li>
          <li><strong>Giveaways&nbsp;:</strong> identifiants Discord des participants et des gagnants.</li>
          <li><strong>Flux (Feeds)&nbsp;:</strong> identifiants Discord des utilisateurs abonnés à des fils d'actualités.</li>
        </ul>

        <h3>2.11 Sauvegardes de serveur</h3>
        <p>
          Le module de sauvegarde peut stocker une photographie complète du serveur Discord&nbsp;: rôles, salons,
          permissions, emojis, stickers. Selon la configuration choisie par l'administrateur, des données membres
          peuvent être incluses.
        </p>

        <h3>2.12 Données d'authentification au Dashboard</h3>
        <p>
          L'accès au dashboard Kotbo utilise OAuth2 Discord. Le token d'accès n'est pas stocké en base de données ;
          l'authentification génère un JWT de session côté client. Les actions effectuées sur le dashboard sont
          enregistrées dans un journal d'audit contenant&nbsp;: l'identifiant utilisateur, l'action effectuée, le
          module concerné et l'horodatage.
        </p>

        <h3>2.13 Données techniques globales</h3>
        <ul>
          <li><strong>Journaux d'erreurs (<em>BotErrorLog</em>)&nbsp;:</strong> message d'erreur, stack trace, source (commande ou événement déclencheur).</li>
          <li><strong>Statistiques de modules&nbsp;:</strong> compteurs d'activation, d'utilisation et de performances (temps d'exécution, taux d'erreur) — données agrégées, sans identifiant personnel direct.</li>
          <li><strong>Blacklist globale&nbsp;:</strong> identifiants Discord d'utilisateurs bannis de l'utilisation de Kotbo à l'échelle globale, avec motif.</li>
        </ul>
      </section>

      <!-- Section 3 -->
      <section id="finalites" class="policy-section">
        <div class="section-badge">03</div>
        <h2>Finalités et bases légales</h2>
        <p>Conformément à l'article 6 du RGPD, chaque traitement repose sur l'une des bases légales suivantes&nbsp;:</p>

        <table>
          <thead>
            <tr><th>Finalité</th><th>Base légale (art. 6 RGPD)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Gestion de la modération et des sanctions au sein d'un serveur</td>
              <td>Intérêt légitime de l'administrateur du serveur à maintenir l'ordre dans sa communauté (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>Gestion du personnel staff (grades, absences, activité, performances)</td>
              <td>Intérêt légitime / exécution d'un engagement communautaire (art. 6.1.b et 6.1.f)</td>
            </tr>
            <tr>
              <td>Système de niveaux et statistiques d'activité</td>
              <td>Intérêt légitime du serveur à animer sa communauté (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>Gestion des tickets de support</td>
              <td>Intérêt légitime à fournir un support aux membres (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>Traitement des candidatures au staff</td>
              <td>Consentement explicite via la soumission du formulaire de candidature (art. 6.1.a)</td>
            </tr>
            <tr>
              <td>Détection de multi-comptes et sécurité</td>
              <td>Intérêt légitime à protéger l'intégrité du serveur contre les abus (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>Journalisation des erreurs techniques</td>
              <td>Intérêt légitime à maintenir et améliorer le service (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>Événements, quiz et CTF</td>
              <td>Consentement implicite via la participation à un événement optionnel (art. 6.1.a)</td>
            </tr>
            <tr>
              <td>Sauvegardes de serveur</td>
              <td>Intérêt légitime de l'administrateur à protéger la configuration de son serveur (art. 6.1.f)</td>
            </tr>
          </tbody>
        </table>

        <div class="info-box">
          <strong>Concernant l'intérêt légitime&nbsp;:</strong> Kotbo a effectué une mise en balance des intérêts.
          Les données collectées sont limitées à ce qui est nécessaire au bon fonctionnement des modules, les
          utilisateurs ont une attente raisonnable de traitement de leurs données dans le contexte d'une communauté
          Discord, et des mesures de sécurité appropriées sont mises en œuvre.
        </div>
      </section>

      <!-- Section 4 -->
      <section id="destinataires" class="policy-section">
        <div class="section-badge">04</div>
        <h2>Destinataires des données</h2>
        <p>Les données collectées par Kotbo sont accessibles aux personnes et entités suivantes&nbsp;:</p>

        <h3>4.1 Au sein de chaque serveur Discord</h3>
        <ul>
          <li><strong>Les administrateurs et modérateurs du serveur</strong> — via le Dashboard Kotbo — ont accès aux données de modération, profils membres, statistiques, tickets, candidatures et données staff relatives à leur serveur.</li>
          <li><strong>Le staff du serveur</strong> (selon les permissions configurées) peut accéder à tout ou partie de ces données.</li>
          <li><strong>Les membres du serveur</strong> peuvent accéder à leurs propres données (niveau XP, profil public, résultats d'événements) selon les modules activés.</li>
        </ul>

        <h3>4.2 L'équipe Kotbo</h3>
        <p>
          Les développeurs de Kotbo ont accès aux données à des fins de maintenance, débogage et support. Cet accès
          est restreint au minimum nécessaire et soumis à une obligation de confidentialité.
        </p>

        <h3>4.3 Services tiers (sous-traitants)</h3>
        <table>
          <thead>
            <tr><th>Service</th><th>Rôle</th><th>Données transmises</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Discord Inc.</strong></td>
              <td>Plateforme hôte. Les données proviennent de l'API Discord.</td>
              <td>Toutes les données publiques du profil Discord (conformément aux CGU Discord)</td>
            </tr>
            <tr>
              <td><strong>Hébergeur de la base de données</strong> (PostgreSQL)</td>
              <td>Stockage de l'ensemble des données</td>
              <td>Toutes les données en base</td>
            </tr>
            <tr>
              <td><strong>YouTube Data API</strong></td>
              <td>Suivi des nouvelles vidéos/lives (module YouTube)</td>
              <td>Identifiants de chaînes YouTube uniquement (pas de données personnelles)</td>
            </tr>
            <tr>
              <td><strong>Twitch API</strong></td>
              <td>Suivi des streamers (module Twitch)</td>
              <td>Noms de streamers uniquement (pas de données personnelles)</td>
            </tr>
            <tr>
              <td><strong>LibreTranslate</strong></td>
              <td>Traduction automatique de messages (module traduction)</td>
              <td>Contenu des messages à traduire — hébergé localement par défaut</td>
            </tr>
            <tr>
              <td><strong>Sentry</strong> (optionnel)</td>
              <td>Surveillance et journalisation des erreurs</td>
              <td>Stack traces et contexte d'erreur (peut contenir des métadonnées)</td>
            </tr>
          </tbody>
        </table>

        <p>
          Kotbo ne vend, ne loue et ne partage pas vos données personnelles avec des tiers à des fins
          commerciales ou publicitaires.
        </p>
      </section>

      <!-- Section 5 -->
      <section id="retention" class="policy-section">
        <div class="section-badge">05</div>
        <h2>Durée de conservation</h2>
        <table>
          <thead>
            <tr><th>Catégorie de données</th><th>Durée de conservation</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Données de profil membre (MemberProfile)</td>
              <td>Conservées tant que le serveur est actif sur Kotbo. En cas de désinstallation du bot, suppression en cascade.</td>
            </tr>
            <tr>
              <td>Statistiques d'activité journalières</td>
              <td>Durée indéterminée tant que le serveur est actif. Peuvent être supprimées manuellement par l'administrateur.</td>
            </tr>
            <tr>
              <td>Données de modération et sanctions</td>
              <td>Durée de vie du serveur sur Kotbo. L'administrateur peut archiver ou supprimer manuellement.</td>
            </tr>
            <tr>
              <td>Données staff</td>
              <td>Durée de vie du serveur sur Kotbo. Les données d'un membre retiré du staff restent archivées sauf suppression explicite.</td>
            </tr>
            <tr>
              <td>Candidatures au staff</td>
              <td>Conservées jusqu'à suppression par l'administrateur, ou au plus 24 mois après la décision finale.</td>
            </tr>
            <tr>
              <td>Tickets et transcripts</td>
              <td>Conservés jusqu'à suppression manuelle par l'administrateur ou à la désinstallation du bot.</td>
            </tr>
            <tr>
              <td>Données d'événements (quiz, CTF)</td>
              <td>Conservées pendant la durée de l'événement et accessibles ensuite dans l'historique du serveur.</td>
            </tr>
            <tr>
              <td>Suivi des invitations</td>
              <td>Conservées tant que le module est activé. L'administrateur peut purger les données.</td>
            </tr>
            <tr>
              <td>Journaux d'audit du Dashboard</td>
              <td>90 jours glissants par défaut (configurable par l'administrateur).</td>
            </tr>
            <tr>
              <td>Journaux d'erreurs techniques (BotErrorLog)</td>
              <td>30 jours maximum, puis suppression automatique.</td>
            </tr>
            <tr>
              <td>Sauvegardes de serveur</td>
              <td>Conservées jusqu'à suppression manuelle par l'administrateur. Chaque serveur est soumis à un quota de stockage.</td>
            </tr>
            <tr>
              <td>Données de niveau/XP</td>
              <td>Conservées tant que le serveur est actif. Remises à zéro si le module est désactivé (selon décision de l'administrateur).</td>
            </tr>
          </tbody>
        </table>

        <div class="info-box">
          <strong>Suppression à la demande&nbsp;:</strong> Toute demande de suppression de vos données personnelles
          adressée à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> sera traitée dans un délai de
          <strong>30 jours</strong>. Certaines données peuvent être conservées au-delà si elles sont nécessaires
          au respect d'obligations légales ou à la défense de droits en justice.
        </div>
      </section>

      <!-- Section 6 -->
      <section id="hebergement" class="policy-section">
        <div class="section-badge">06</div>
        <h2>Hébergement et transferts internationaux</h2>
        <p>
          Les données traitées par Kotbo sont hébergées sur des serveurs situés <strong>en Europe</strong>.
          Aucun transfert de données vers des pays tiers en dehors de l'Espace Économique Européen (EEE)
          n'est effectué par Kotbo directement, à l'exception des éléments suivants&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Discord Inc.</strong> (États-Unis)&nbsp;: les données de votre profil Discord sont soumises
            aux politiques de confidentialité de Discord Inc., qui dispose de clauses contractuelles types
            conformes au RGPD.
          </li>
          <li>
            <strong>Sentry</strong> (si activé, États-Unis)&nbsp;: les journaux d'erreurs peuvent transiter
            vers les serveurs de Sentry Inc., sous couvert de clauses contractuelles types.
          </li>
          <li>
            <strong>YouTube Data API / Twitch API</strong>&nbsp;: aucune donnée personnelle d'utilisateurs n'est
            transmise à ces services dans le cadre des modules de suivi de contenu.
          </li>
        </ul>
      </section>

      <!-- Section 7 -->
      <section id="droits" class="policy-section">
        <div class="section-badge">07</div>
        <h2>Vos droits au titre du RGPD</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (UE) 2016/679, vous disposez des droits
          suivants concernant vos données personnelles traitées par Kotbo&nbsp;:
        </p>

        <div class="rights-grid">
          <div class="right-card">
            <div class="right-icon">📋</div>
            <h4>Droit d'accès <span class="text-gray-400 font-normal text-xs">(art. 15)</span></h4>
            <p>Obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">✏️</div>
            <h4>Droit de rectification <span class="text-gray-400 font-normal text-xs">(art. 16)</span></h4>
            <p>Faire corriger des données inexactes vous concernant. Note&nbsp;: les données de profil Discord sont gérées par Discord directement.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">🗑️</div>
            <h4>Droit à l'effacement <span class="text-gray-400 font-normal text-xs">(art. 17)</span></h4>
            <p>Demander la suppression de vos données, dans les limites des obligations légales et des intérêts légitimes (ex. : données de sanction nécessaires à la sécurité du serveur).</p>
          </div>
          <div class="right-card">
            <div class="right-icon">🔒</div>
            <h4>Droit à la limitation <span class="text-gray-400 font-normal text-xs">(art. 18)</span></h4>
            <p>Demander la suspension temporaire du traitement de vos données dans certaines situations.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">📦</div>
            <h4>Droit à la portabilité <span class="text-gray-400 font-normal text-xs">(art. 20)</span></h4>
            <p>Recevoir vos données dans un format structuré et lisible par machine (JSON), pour les données traitées sur la base de votre consentement ou d'un contrat.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">🚫</div>
            <h4>Droit d'opposition <span class="text-gray-400 font-normal text-xs">(art. 21)</span></h4>
            <p>Vous opposer au traitement fondé sur l'intérêt légitime, pour des raisons tenant à votre situation particulière.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">↩️</div>
            <h4>Retrait du consentement <span class="text-gray-400 font-normal text-xs">(art. 7)</span></h4>
            <p>Pour les traitements basés sur votre consentement (candidatures, participation aux événements), retirer votre consentement à tout moment sans que cela remette en cause la licéité des traitements antérieurs.</p>
          </div>
          <div class="right-card">
            <div class="right-icon">🏛️</div>
            <h4>Droit de réclamation <span class="text-gray-400 font-normal text-xs">(art. 77)</span></h4>
            <p>Introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) — <strong>cnil.fr</strong> — si vous estimez que vos droits ne sont pas respectés.</p>
          </div>
        </div>

        <div class="info-box mt-6">
          <strong>Comment exercer vos droits&nbsp;?</strong><br/>
          Adressez votre demande par e-mail à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> en précisant&nbsp;:
          votre identifiant Discord (Snowflake), le nom du serveur concerné le cas échéant, et la nature
          de votre demande. Nous vous répondrons dans un délai maximum de <strong>30 jours</strong>.
          Pour les demandes complexes, ce délai peut être prolongé de 2 mois supplémentaires, avec notification préalable.
        </div>
      </section>

      <!-- Section 8 -->
      <section id="securite" class="policy-section">
        <div class="section-badge">08</div>
        <h2>Sécurité des données</h2>
        <p>
          Kotbo met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données&nbsp;:
        </p>
        <ul>
          <li><strong>Chiffrement en transit</strong>&nbsp;: toutes les communications entre le bot, le Dashboard et la base de données utilisent le protocole TLS/HTTPS.</li>
          <li><strong>Isolation par serveur</strong>&nbsp;: les données de chaque serveur Discord sont strictement séparées. Un administrateur d'un serveur A ne peut pas accéder aux données d'un serveur B.</li>
          <li><strong>Authentification robuste</strong>&nbsp;: le Dashboard utilise OAuth2 Discord avec JWT signés. Les clés API sont stockées sous forme de hash SHA-256 — jamais en clair.</li>
          <li><strong>Suppression en cascade</strong>&nbsp;: la désinstallation de Kotbo d'un serveur déclenche automatiquement la suppression de toutes les données associées en base.</li>
          <li><strong>Contrôle d'accès granulaire</strong>&nbsp;: le système de permissions du Dashboard permet à chaque administrateur de définir précisément quels membres de son staff peuvent accéder à quelles fonctionnalités et données.</li>
          <li><strong>Journaux d'audit</strong>&nbsp;: toutes les actions administratives sur le Dashboard sont enregistrées avec l'identité de l'auteur, l'horodatage et le détail de l'action.</li>
          <li><strong>Sauvegardes sécurisées</strong>&nbsp;: les données font l'objet de sauvegardes régulières avec contrôle d'intégrité.</li>
        </ul>

        <p>
          En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, nous nous
          engageons à notifier l'autorité de contrôle compétente dans les 72 heures et, si le risque est élevé,
          à vous en informer directement dans les meilleurs délais.
        </p>
      </section>

      <!-- Section 9 -->
      <section id="mineurs" class="policy-section">
        <div class="section-badge">09</div>
        <h2>Mineurs</h2>
        <p>
          Discord est une plateforme réservée aux personnes âgées d'au moins 13 ans (16 ans dans certains pays de
          l'UE). Kotbo s'appuie sur les vérifications d'âge effectuées par Discord et ne collecte pas délibérément
          de données concernant des enfants de moins de 13 ans.
        </p>
        <p>
          Si vous êtes parent ou tuteur et estimez que votre enfant mineur a transmis des données personnelles via
          Kotbo, contactez-nous à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> afin que nous procédions
          à leur suppression dans les meilleurs délais.
        </p>
      </section>

      <!-- Section 10 -->
      <section id="modifications" class="policy-section">
        <div class="section-badge">10</div>
        <h2>Modifications de la politique de confidentialité</h2>
        <p>
          Kotbo se réserve le droit de modifier la présente politique à tout moment, notamment pour refléter
          l'ajout de nouveaux modules, des évolutions réglementaires ou des changements dans nos pratiques
          de traitement.
        </p>
        <p>
          En cas de modification substantielle, nous vous en informerons&nbsp;:
        </p>
        <ul>
          <li>Via une annonce sur le serveur Discord officiel de Kotbo.</li>
          <li>Via une notification dans le Dashboard (si vous êtes administrateur d'un serveur utilisant Kotbo).</li>
          <li>En mettant à jour la date de «&nbsp;Dernière mise à jour&nbsp;» en haut de cette page.</li>
        </ul>
        <p>
          La poursuite de l'utilisation de Kotbo après la publication des modifications constitue votre
          acceptation de la politique révisée. Si vous n'acceptez pas les nouvelles conditions, vous devez
          cesser d'utiliser Kotbo et nous contacter pour demander la suppression de vos données.
        </p>
      </section>

      <!-- Section 11 -->
      <section id="contact" class="policy-section">
        <div class="section-badge">11</div>
        <h2>Contact & Délégué à la Protection des Données</h2>
        <p>
          Pour toute question relative à la présente politique de confidentialité ou pour exercer vos droits,
          vous pouvez nous contacter&nbsp;:
        </p>
        <div class="contact-card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">E-mail</p>
              <a href="mailto:privacy@kotbo.fr" class="font-black text-indigo-700 text-lg hover:underline">privacy@kotbo.fr</a>
            </div>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">
            Nous nous efforçons de répondre à toutes les demandes dans un délai de <strong>30 jours calendaires</strong>.
            Merci d'indiquer dans votre e-mail&nbsp;: votre identifiant Discord, le ou les serveurs concernés,
            et la nature précise de votre demande.
          </p>
        </div>

        <div class="info-box mt-6">
          <strong>Autorité de contrôle&nbsp;:</strong> Si vous estimez que le traitement de vos données personnelles
          constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la
          <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés)&nbsp;:
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          ou par courrier à CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </div>
      </section>

    </main>
  </div>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 py-10 text-center text-gray-500 text-sm font-bold mt-10">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-3">
        <img src="{base}/favicon.svg" alt="Kotbo Logo" class="w-8 h-8 rounded-lg shadow-sm grayscale opacity-50" />
        <span class="font-black text-lg text-gray-400">Kotbo</span>
      </div>
      <p>© 2026 Kotbo. Le centre de contrôle Discord.</p>
      <div class="flex gap-6 uppercase tracking-widest text-[10px] font-black">
        <a href="{base}/terms" class="text-indigo-600 hover:text-indigo-800 transition-colors">Confidentialité</a>
        <a href="{base}/" class="hover:text-gray-900 transition-colors">Discord</a>
        <a href="{base}/" class="hover:text-gray-900 transition-colors">Documentation</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* ── Layout & Typography ─────────────────────────────── */
  .prose-policy {
    font-family: var(--font-sans, 'Inter', sans-serif);
    color: #374151;
    line-height: 1.75;
  }

  .policy-section {
    position: relative;
    margin-bottom: 3.5rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid #f3f4f6;
  }
  .policy-section:last-child {
    border-bottom: none;
  }

  .section-badge {
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

  .prose-policy h2 {
    font-size: 1.6rem;
    font-weight: 900;
    color: #111827;
    margin-bottom: 1rem;
    font-family: 'Manrope', sans-serif;
    letter-spacing: -0.02em;
  }

  .prose-policy h3 {
    font-size: 1.05rem;
    font-weight: 800;
    color: #1f2937;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .prose-policy h4 {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.4rem;
  }

  .prose-policy p {
    margin-bottom: 1rem;
    font-size: 0.9375rem;
  }

  .prose-policy ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1rem;
  }
  .prose-policy ul li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
  }
  .prose-policy ul li::before {
    content: "›";
    position: absolute;
    left: 0;
    color: #6366f1;
    font-weight: 900;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .prose-policy a {
    color: #4f46e5;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .prose-policy a:hover {
    color: #3730a3;
  }

  /* ── Tables ─────────────────────────────────────────── */
  .prose-policy table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0 1.5rem;
    font-size: 0.875rem;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0 0 1px #e5e7eb;
  }
  .prose-policy th {
    background: #f3f4f6;
    font-weight: 800;
    color: #374151;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .prose-policy td {
    padding: 0.7rem 1rem;
    color: #4b5563;
    border-top: 1px solid #f3f4f6;
    vertical-align: top;
  }
  .prose-policy tr:hover td {
    background: #fafafa;
  }

  /* ── Info box ────────────────────────────────────────── */
  .info-box {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.875rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    color: #1e40af;
    line-height: 1.65;
  }
  .info-box a {
    color: #1d4ed8;
  }
  .info-box ul {
    margin-top: 0.5rem;
  }
  .info-box ul li::before {
    color: #3b82f6;
  }

  /* ── Rights grid ─────────────────────────────────────── */
  .rights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
  }
  .right-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 1.1rem 1.25rem;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .right-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.07);
    border-color: #c7d2fe;
  }
  .right-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .right-card h4 {
    margin-bottom: 0.4rem;
  }
  .right-card p {
    font-size: 0.8375rem;
    color: #6b7280;
    margin: 0;
  }

  /* ── Contact card ────────────────────────────────────── */
  .contact-card {
    background: #fafafa;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
  }
</style>
