<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'responsable',   label: 'Responsable & rôles' },
    { id: 'collecte',      label: 'Données collectées' },
    { id: 'messages',      label: 'Journalisation des messages' },
    { id: 'verification',  label: 'Vérification anti multi-comptes' },
    { id: 'finalites',     label: 'Finalités & bases légales' },
    { id: 'destinataires', label: 'Destinataires' },
    { id: 'retention',     label: 'Durée de conservation' },
    { id: 'hebergement',   label: 'Hébergement & transferts' },
    { id: 'droits',        label: 'Vos droits (RGPD)' },
    { id: 'securite',      label: 'Sécurité' },
    { id: 'profilage',     label: 'Profilage & décisions' },
    { id: 'mineurs',       label: 'Mineurs' },
    { id: 'modifications', label: 'Modifications' },
    { id: 'contact',       label: 'Contact' },
  ];
</script>

<svelte:head>
  <title>Politique de Confidentialité | Kotbo</title>
  <meta name="description" content="Politique de confidentialité et protection des données personnelles du bot Discord Kotbo : données collectées, journalisation des messages, vérification de sécurité, durées de conservation et droits RGPD." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Politique de Confidentialité"
  subtitle="Dernière mise à jour : 20 juillet 2026 · Bot Discord Kotbo et Dashboard associé"
  {sections}
  activePage="privacy"
>
  <!-- Préambule -->
  <div class="info-box warn mb-10">
    <p class="font-bold mb-1">À destination des administrateurs de serveur Discord</p>
    <p class="mb-0">
      L'administrateur détermine les modules activés et agit comme <strong>responsable du traitement</strong>
      pour les données propres à son serveur. Kotbo traite ces données comme <strong>sous-traitant</strong>, sur
      instruction de l'administrateur (voir <a href="{base}/dpa">accord de sous-traitance</a>). Celui-ci doit informer
      ses membres conformément aux articles 13 et 14 du RGPD — un <a href="{base}/admin-notice">modèle d'information</a>
      est fourni. Certains traitements (blacklist globale, sécurité, journaux techniques) relèvent en revanche de la
      responsabilité directe de Kotbo (voir tableau §1).
    </p>
  </div>

  <!-- Section 1 -->
  <section id="responsable" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Responsable du traitement & répartition des rôles</h2>
    <p>Le service Kotbo est édité et opéré par&nbsp;:</p>
    <ul>
      <li><strong>Elouan Passereau</strong> — <a href="https://klaynight.fr/" target="_blank" rel="noopener noreferrer">klaynight.fr</a></li>
      <li><strong>Nathan Rontey</strong> — <a href="https://nathaan.me/" target="_blank" rel="noopener noreferrer">nathaan.me</a></li>
    </ul>
    <p>Contact vie privée&nbsp;: <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> · Coordonnées complètes sur la page <a href="{base}/mentions-legales">Mentions légales</a>.</p>
    <p>
      Kotbo est un bot Discord pour les communautés francophones (gestion du staff, modération, tickets, statistiques,
      niveaux, événements, candidatures, économie, organisation générale). Il n'opère que sur les serveurs où il a été
      explicitement invité.
    </p>

    <h3>1.1 Qui est responsable de quoi</h3>
    <p>
      La qualification n'est pas globale&nbsp;: elle dépend du traitement. Le tableau ci-dessous précise, pour chaque
      grande finalité, si Kotbo agit comme <strong>sous-traitant</strong> (sur instruction de l'administrateur) ou comme
      <strong>responsable</strong> (Kotbo décide seul de la finalité et des moyens).
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Traitement</th><th>Rôle de Kotbo</th><th>Responsable du traitement</th></tr></thead>
        <tbody>
          <tr><td>Profils membres, niveaux, statistiques, staff, tickets, candidatures, événements, économie, sauvegardes</td><td>Sous-traitant</td><td>Administrateur du serveur</td></tr>
          <tr><td>Journalisation complète des messages (module opt-in)</td><td>Sous-traitant</td><td>Administrateur du serveur</td></tr>
          <tr><td>Vérification de sécurité / anti multi-comptes d'un serveur</td><td>Sous-traitant</td><td>Administrateur du serveur</td></tr>
          <tr><td>Compte administrateur & authentification au dashboard</td><td>Responsable</td><td>Kotbo</td></tr>
          <tr><td>Blacklist globale d'utilisateurs / de serveurs</td><td>Responsable</td><td>Kotbo</td></tr>
          <tr><td>Sécurité globale du service, prévention des abus, détection inter-serveurs</td><td>Responsable</td><td>Kotbo</td></tr>
          <tr><td>Journaux techniques & d'erreurs, métriques internes</td><td>Responsable</td><td>Kotbo</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Section 2 -->
  <section id="collecte" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Données collectées</h2>
    <p>
      Kotbo ne collecte que les données nécessaires au fonctionnement des <strong>modules activés</strong> sur chaque
      serveur. Chaque enregistrement est rattaché à l'identifiant de serveur Discord (<em>Guild ID</em>) concerné. Le
      tableau ci-dessous récapitule <strong>ce qui est réellement stocké en base</strong> par catégorie&nbsp;; il reflète
      exactement les données restituées par notre outil d'export RGPD.
    </p>

    <h3>2.1 Vue d'ensemble par catégorie</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Catégorie</th><th>Données concernées</th><th>Déclenché par</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Identité & profil</strong></td>
            <td>Identifiant Discord, nom d'utilisateur / global / affichage, avatar, bannière, locale, bio, date de création du compte, dates d'entrée/sortie du serveur, niveau &amp; XP, statistiques quotidiennes, préférences du dashboard, presets de mise en page, notifications, statut d'administrateur global.</td>
            <td>Interaction avec le bot ou présence sur le serveur</td>
          </tr>
          <tr>
            <td><strong>Vérifications de sécurité</strong></td>
            <td>Voir §4 (IP, appareil, e-mail, connexions, serveurs, données OAuth, preuves de doublon). </td>
            <td>Module de vérification activé par l'administrateur</td>
          </tr>
          <tr>
            <td><strong>Modération & sécurité</strong></td>
            <td>Sanctions (type, motif, durée, expiration), rapports de sanction et preuves déposées, comptes liés (multi-comptes), appels de bannissement et leur blacklist, sessions vocales et échantillons de détection, inviteurs suspendus, blacklist globale.</td>
            <td>Action de modération / modules de sécurité</td>
          </tr>
          <tr>
            <td><strong>Messages</strong></td>
            <td>Voir §3 (journalisation complète du contenu des messages).</td>
            <td>Module de logs de messages (désactivé par défaut)</td>
          </tr>
          <tr>
            <td><strong>Contributions & contenus</strong></td>
            <td>Suggestions et votes, votes de réputation entre membres, soumissions de formulaires personnalisés, soumissions Daily Algo, candidatures de partenariat et de recrutement (réponses, e-mail éventuel, notes internes, motif de refus), articles rédigés.</td>
            <td>Participation volontaire aux modules concernés</td>
          </tr>
          <tr>
            <td><strong>Économie & marketplace</strong></td>
            <td>Profils RPG, combats, prises de pêche, guildes RPG, annonces et transactions marketplace, retours de satisfaction ticket.</td>
            <td>Utilisation des modules économie / RPG / marketplace</td>
          </tr>
          <tr>
            <td><strong>Engagement</strong></td>
            <td>Inscriptions et participations aux événements, progression des quêtes, invitations (membre & créées), abonnements aux flux et aux widgets.</td>
            <td>Participation aux modules d'engagement</td>
          </tr>
          <tr>
            <td><strong>Tickets & support</strong></td>
            <td>Tickets ouverts (identité, raison, description) et <strong>transcript HTML complet</strong> de la conversation, retours de satisfaction.</td>
            <td>Ouverture d'un ticket</td>
          </tr>
          <tr>
            <td><strong>Staff</strong></td>
            <td>Fiche staff, grades et hiérarchie, activité et sessions vocales staff, évaluations, avertissements, blacklist staff, démissions, tâches, appels staff et invitations, rappels, rapports de mentorat, périodes d'essai, progression de tutorat, liens de serveur, clés API créées.</td>
            <td>Rôle Staff sur un serveur utilisant le module</td>
          </tr>
          <tr>
            <td><strong>Système</strong></td>
            <td>Tâches planifiées, cibles de notification, salons vocaux temporaires, instances white-label, journaux d'audit du dashboard, journaux d'erreurs techniques, métriques de modules.</td>
            <td>Fonctionnement interne du service</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-box">
      Chaque utilisateur peut obtenir la liste exacte de <strong>toutes</strong> les données stockées à son sujet, tous
      serveurs confondus, via une demande d'export RGPD (voir §7) — l'outil interne parcourt l'intégralité des tables
      listées ci-dessus.
    </div>

    <h3>2.2 Données de profil Discord</h3>
    <p>Collectées automatiquement lors d'une interaction avec le bot ou par présence sur un serveur utilisant Kotbo&nbsp;: identifiant Discord (immuable), nom d'utilisateur / tag / nom global / nom d'affichage, avatar et bannière, couleur d'accentuation, locale, biographie publique, date de création du compte, horodatages d'entrée et de sortie du serveur.</p>

    <h3>2.3 Données d'activité, statistiques et niveaux</h3>
    <p>Alimentent les modules statistiques, niveaux/XP et le suivi d'activité staff&nbsp;:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Donnée</th><th>Table</th><th>Finalité</th></tr></thead>
        <tbody>
          <tr><td>Nombre de messages envoyés (par jour, par salon) — <strong>compteurs uniquement, sans le contenu</strong></td><td><code>MemberDailyStat</code></td><td>Statistiques serveur, niveaux/XP</td></tr>
          <tr><td>Temps passé en vocal (minutes)</td><td><code>MemberDailyStat</code>, <code>StaffVoiceSession</code></td><td>Statistiques, niveaux, activité staff</td></tr>
          <tr><td>Réactions, threads créés, réponses</td><td><code>MemberDailyStat</code></td><td>Statistiques détaillées</td></tr>
          <tr><td>Points XP, niveau, instantanés de saison</td><td><code>MemberLevel</code>, <code>SeasonSnapshot</code></td><td>Système de niveaux par serveur</td></tr>
          <tr><td>Dernière activité (dernier message, dernière présence)</td><td><code>MemberProfile</code></td><td>Profil membre, gestion d'activité staff</td></tr>
          <tr><td>Usage des commandes du dashboard, préférences d'interface</td><td><code>DashboardCommandUsage</code>, <code>DashboardUserSettings</code></td><td>Fonctionnement et personnalisation du dashboard</td></tr>
        </tbody>
      </table>
    </div>
    <div class="info-box">
      <strong>Important&nbsp;:</strong> les statistiques ci-dessus sont des <strong>compteurs agrégés</strong> et ne
      contiennent pas le texte des messages. La conservation du contenu intégral des messages relève d'un module distinct
      et opt-in, décrit en <a href="#messages">§3</a>.
    </div>

    <h3>2.4 Modération, sanctions & sécurité de serveur</h3>
    <ul>
      <li>Identité de l'utilisateur sanctionné et du modérateur, type de sanction (avertissement, kick, timeout, ban temporaire/permanent, softban), motif, durée, expiration, statut, notes de résolution.</li>
      <li>Rapports de sanction&nbsp;: description de l'incident, règles enfreintes, liens et fichiers de preuve déposés.</li>
      <li><strong>Comptes liés</strong> (multi-comptes)&nbsp;: association de deux identifiants Discord et métadonnées de preuve (voir §4).</li>
      <li>Appels de bannissement et blacklist des appels&nbsp;: contenu de l'appel, décision, statut.</li>
      <li>Détection comportementale&nbsp;: sessions vocales et échantillons de détection, inviteurs suspendus.</li>
      <li><strong>Blacklist globale</strong>&nbsp;: identifiants d'utilisateurs bannis de Kotbo à l'échelle du service, avec motif (traitement dont Kotbo est responsable).</li>
    </ul>

    <h3>2.5 Données du personnel (module Staff)</h3>
    <p>Uniquement pour les membres ayant un rôle Staff sur un serveur utilisant le module&nbsp;: grade et historique, avertissements internes, blacklist staff, périodes d'essai/tutorat et rapports de mentor, absences, présences aux réunions, notes confidentielles, votes en sondage staff, démissions, tâches, appels staff, rappels, évaluations, clés API créées par le staff (stockées sous forme de hash).</p>

    <h3>2.6 Contributions, événements & économie</h3>
    <ul>
      <li><strong>Candidatures</strong> (recrutement, partenariat)&nbsp;: identité Discord, e-mail si le formulaire le demande, réponses au formulaire (JSON), notes internes du staff, résultat, motif de refus, cooldown de re-candidature.</li>
      <li><strong>Tickets</strong>&nbsp;: identité, raison, description et transcript HTML complet — peut contenir tout message échangé avec le staff.</li>
      <li><strong>Événements (quiz, CTF)</strong>&nbsp;: identité, score, réponses/résolutions, horodatages.</li>
      <li><strong>Suggestions, réputation, formulaires, Daily Algo, articles</strong>&nbsp;: contenu fourni et identifiants des votants le cas échéant.</li>
      <li><strong>Économie / RPG / marketplace</strong>&nbsp;: profils de jeu, combats, pêche, guildes, annonces et transactions.</li>
      <li><strong>Engagement</strong>&nbsp;: participations aux événements, quêtes, invitations, abonnements aux flux et widgets.</li>
    </ul>

    <h3>2.7 Authentification au dashboard & audit</h3>
    <p>
      L'accès au dashboard utilise OAuth2 Discord (Authorization Code). Les jetons Discord sont chiffrés dans une session
      serveur temporaire&nbsp;; le navigateur ne reçoit qu'un identifiant de session aléatoire dans un cookie sécurisé
      <em>HttpOnly</em>, jamais exposé au stockage JavaScript. Les actions administratives sont consignées dans un
      <strong>journal d'audit</strong> (identifiant utilisateur, action, module, horodatage). Détail des cookies dans la
      <a href="{base}/cookies">politique cookies</a>.
    </p>

    <h3>2.8 Sauvegardes de serveur</h3>
    <p>Le module de sauvegarde peut stocker une photographie du serveur (rôles, salons, permissions, emojis, stickers)&nbsp;; selon la configuration de l'administrateur, des données membres peuvent y être incluses. Chaque serveur est soumis à un quota de stockage.</p>

    <h3>2.9 Données techniques globales</h3>
    <ul>
      <li><strong>Journaux d'erreurs</strong> (<code>BotErrorLog</code>)&nbsp;: message d'erreur, stack trace, source. Peuvent incidemment contenir des identifiants.</li>
      <li><strong>Métriques de modules</strong>&nbsp;: compteurs d'activation, d'utilisation et de performance — agrégés, sans identifiant personnel direct.</li>
    </ul>
  </section>

  <!-- Section 3 : Journalisation complète des messages -->
  <section id="messages" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Journalisation complète des messages</h2>
    <div class="info-box warn">
      <p class="font-bold mb-1">Module sensible, désactivé par défaut</p>
      <p class="mb-0">
        Ce module n'est <strong>jamais actif automatiquement</strong>. Un administrateur doit l'activer explicitement
        pour son serveur. Lorsqu'il est actif, Kotbo enregistre le <strong>contenu intégral des messages</strong> des
        salons concernés afin de fournir une recherche globale dans l'historique, à la manière d'une recherche Discord.
      </p>
    </div>
    <h3>3.1 Données enregistrées</h3>
    <p>Pour chaque message d'un salon suivi, la table <code>MessageLog</code> stocke&nbsp;:</p>
    <ul>
      <li>le <strong>contenu textuel intégral</strong> du message&nbsp;;</li>
      <li>les <strong>pièces jointes</strong> (nom, URL, type) et le nombre d'embeds&nbsp;;</li>
      <li>l'auteur (identifiant, nom affiché, avatar) et s'il s'agit d'un bot&nbsp;;</li>
      <li>les <strong>mentions</strong> (utilisateurs mentionnés) et la <strong>relation de réponse</strong> (auteur du message auquel il est répondu)&nbsp;;</li>
      <li>le salon (identifiant et nom) et le serveur&nbsp;;</li>
      <li>les horodatages de <strong>création, modification et suppression</strong> du message.</li>
    </ul>
    <p>
      L'administrateur peut exclure certains salons de la journalisation. Les messages privés (DM) ne sont jamais
      journalisés.
    </p>
    <h3>3.2 Conservation</h3>
    <p>
      Les messages sont automatiquement purgés après une <strong>durée de rétention configurée par l'administrateur</strong>
      (90 jours par défaut), plafonnée par Kotbo. Une purge automatique s'exécute quotidiennement. Le contenu est
      également supprimé lorsque le module est désactivé ou lorsque le bot quitte le serveur.
    </p>
    <h3>3.3 Base légale & responsabilités</h3>
    <p>
      Ce traitement repose sur l'<strong>intérêt légitime</strong> de l'administrateur (art. 6.1.f RGPD) à modérer et
      analyser l'activité de sa communauté. Compte tenu de son caractère intrusif, l'administrateur qui l'active doit&nbsp;:
      informer clairement ses membres au préalable, restreindre l'accès aux personnes habilitées, et définir une durée de
      conservation proportionnée. Kotbo agit ici comme sous-traitant.
    </p>
  </section>

  <!-- Section 4 : Vérification anti multi-comptes -->
  <section id="verification" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Vérification de sécurité & détection de multi-comptes</h2>
    <p>
      À la demande d'un administrateur, un membre peut être invité à effectuer une vérification via une connexion OAuth2
      Discord dédiée. L'objectif est de détecter le contournement de sanctions par la création de comptes multiples
      (« double-comptes »). Les données collectées dépendent du <strong>niveau de vérification</strong> choisi par
      l'administrateur.
    </p>
    <h3>4.1 Données OAuth demandées selon le niveau</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Niveau</th><th>Permissions OAuth (scopes)</th><th>Données récupérées</th></tr></thead>
        <tbody>
          <tr><td><strong>Faible</strong></td><td><code>identify</code></td><td>Identité Discord de base</td></tr>
          <tr><td><strong>Moyen</strong></td><td><code>identify email</code></td><td>+ adresse e-mail Discord</td></tr>
          <tr><td><strong>Élevé</strong></td><td><code>identify email connections guilds guilds.members.read</code></td><td>+ connexions liées (Steam, Xbox…), liste des serveurs, appartenance aux serveurs</td></tr>
        </tbody>
      </table>
    </div>
    <h3>4.2 Données stockées (table <code>SecurityVerification</code>)</h3>
    <ul>
      <li><strong>Adresse IP</strong> et <strong>informations sur l'appareil</strong> (navigateur / système)&nbsp;;</li>
      <li><strong>Adresse e-mail Discord</strong> (niveaux moyen et élevé)&nbsp;;</li>
      <li><strong>Connexions</strong> et <strong>liste des serveurs</strong> Discord (niveau élevé)&nbsp;;</li>
      <li>la <strong>réponse OAuth brute</strong> renvoyée par Discord&nbsp;;</li>
      <li>l'identifiant du compte authentifié et le <strong>résultat de la détection</strong> (doublon détecté, compte présumé lié, éléments de preuve).</li>
    </ul>
    <h3>4.3 Logique de détection & conséquences</h3>
    <p>
      Kotbo compare les éléments ci-dessus (IP, appareil, e-mail, connexions, comportement) à ceux d'autres comptes du
      serveur pour repérer une correspondance suspecte. Selon la configuration, le résultat peut déclencher&nbsp;:
    </p>
    <ul>
      <li>une <strong>alerte au staff</strong> (<code>NOTIFY_STAFF</code>) pour décision humaine&nbsp;;</li>
      <li>une <strong>liaison automatique</strong> de deux comptes (<code>AUTO_LINK</code>) lorsqu'une incompatibilité forte est détectée&nbsp;;</li>
      <li>un statut <em>« signalé »</em> pouvant conduire à un refus d'accès ou une sanction décidée par le staff du serveur.</li>
    </ul>
    <h3>4.4 Accès, conservation & contestation</h3>
    <ul>
      <li><strong>Qui y accède&nbsp;:</strong> le staff habilité du serveur concerné et, pour la maintenance, l'équipe Kotbo (accès minimal, confidentialité).</li>
      <li><strong>Durée&nbsp;:</strong> les vérifications non finalisées (en attente / expirées) sont purgées à court terme&nbsp;; les preuves d'une détection sont conservées le temps nécessaire à la sécurité du serveur, puis supprimées (voir matrice §7).</li>
      <li><strong>Décision automatisée&nbsp;:</strong> une liaison ou un refus automatique peut avoir un effet significatif&nbsp;; vous pouvez demander une <strong>intervention humaine</strong>, exprimer votre point de vue et <strong>contester</strong> le résultat (voir §11).</li>
      <li><strong>Comment contester&nbsp;:</strong> auprès du staff du serveur, ou via <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> pour les traitements relevant de Kotbo.</li>
    </ul>
    <div class="info-box">
      La combinaison IP + appareil + activité + décisions potentielles fait l'objet d'une évaluation d'analyse d'impact
      (AIPD/DPIA) au titre de l'article 35 du RGPD.
    </div>
  </section>

  <!-- Section 5 -->
  <section id="finalites" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Finalités et bases légales</h2>
    <p>Conformément à l'article 6 du RGPD, chaque traitement repose sur l'une des bases légales suivantes&nbsp;:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Finalité</th><th>Base légale (art. 6)</th></tr></thead>
        <tbody>
          <tr><td>Modération et sanctions au sein d'un serveur</td><td>Intérêt légitime de l'administrateur (6.1.f)</td></tr>
          <tr><td>Gestion du personnel staff (grades, absences, activité)</td><td>Intérêt légitime / engagement communautaire (6.1.b et 6.1.f)</td></tr>
          <tr><td>Niveaux, statistiques d'activité</td><td>Intérêt légitime (6.1.f)</td></tr>
          <tr><td>Journalisation complète des messages (§3)</td><td>Intérêt légitime de l'administrateur (6.1.f), sous réserve d'information préalable des membres</td></tr>
          <tr><td>Tickets de support</td><td>Intérêt légitime (6.1.f)</td></tr>
          <tr><td>Candidatures au staff / partenariat</td><td>Intérêt légitime (6.1.f). Consentement distinct pour toute conservation en vivier au-delà du recrutement en cours.</td></tr>
          <tr><td>Vérification anti multi-comptes & sécurité (§4)</td><td>Intérêt légitime à protéger l'intégrité du serveur et du service (6.1.f)</td></tr>
          <tr><td>Blacklist globale, sécurité globale du service</td><td>Intérêt légitime de Kotbo (6.1.f)</td></tr>
          <tr><td>Journalisation des erreurs techniques</td><td>Intérêt légitime à maintenir le service (6.1.f)</td></tr>
          <tr><td>Événements, quiz, CTF, économie, engagement</td><td>Intérêt légitime lié à la participation volontaire (6.1.f)</td></tr>
          <tr><td>Sauvegardes de serveur</td><td>Intérêt légitime de l'administrateur (6.1.f)</td></tr>
        </tbody>
      </table>
    </div>
    <div class="info-box">
      <strong>Intérêt légitime&nbsp;:</strong> pour chaque traitement fondé sur l'article 6.1.f, une mise en balance est
      effectuée (nécessité, minimisation, attente raisonnable des personnes dans le contexte d'une communauté Discord,
      mesures de sécurité). Vous pouvez vous y opposer pour un motif tenant à votre situation particulière (§9).
    </div>
  </section>

  <!-- Section 6 -->
  <section id="destinataires" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Destinataires des données</h2>
    <h3>6.1 Au sein de chaque serveur</h3>
    <ul>
      <li>Les <strong>administrateurs et modérateurs</strong> — via le dashboard — accèdent aux données de leur serveur (modération, profils, statistiques, tickets, candidatures, staff, logs de messages si activés).</li>
      <li>Le <strong>staff</strong> accède à tout ou partie de ces données selon les permissions configurées.</li>
      <li>Les <strong>membres</strong> accèdent à leurs propres données (niveau, profil public, résultats d'événements).</li>
    </ul>
    <h3>6.2 L'équipe Kotbo</h3>
    <p>Les développeurs accèdent aux données pour la maintenance, le débogage et le support&nbsp;: accès restreint au minimum nécessaire et soumis à confidentialité.</p>
    <h3>6.3 Sous-traitants & services tiers</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Service</th><th>Rôle</th><th>Données transmises</th></tr></thead>
        <tbody>
          <tr><td><strong>Discord Inc.</strong></td><td>Plateforme hôte et source des données</td><td>Données de profil Discord (selon les CGU Discord)</td></tr>
          <tr><td><strong>Hébergeur PostgreSQL / infrastructure</strong></td><td>Stockage et sauvegardes</td><td>Ensemble des données en base — voir <a href="{base}/dpa">DPA</a></td></tr>
          <tr><td><strong>Cloudflare</strong></td><td>Réseau, cache, prévention des abus</td><td>Adresse IP, en-têtes HTTP, événements de sécurité</td></tr>
          <tr><td><strong>Sentry</strong> (optionnel)</td><td>Surveillance des erreurs</td><td>Stack traces et contexte (peut contenir des métadonnées)</td></tr>
          <tr><td><strong>YouTube Data API / Twitch API</strong></td><td>Suivi de contenu (modules)</td><td>Identifiants de chaînes / streamers uniquement — pas de données personnelles de membres</td></tr>
          <tr><td><strong>LibreTranslate</strong></td><td>Traduction (module)</td><td>Contenu à traduire — auto-hébergé par défaut</td></tr>
          <tr><td><strong>jsDelivr / GitHub</strong></td><td>Chargement à la demande des moteurs de l'éditeur de code</td><td>IP et en-têtes techniques, à l'ouverture de l'IDE uniquement</td></tr>
        </tbody>
      </table>
    </div>
    <p>Kotbo ne vend, ne loue et ne partage pas vos données à des fins commerciales ou publicitaires.</p>
  </section>

  <!-- Section 7 -->
  <section id="retention" class="policy-section">
    <div class="section-badge">07</div>
    <h2>Durée de conservation</h2>
    <p>
      Les durées ci-dessous précisent la conservation en fonctionnement normal, après désactivation du module ou départ
      du bot, et dans les sauvegardes. Lorsqu'une durée dépend d'un réglage administrateur, un <strong>plafond</strong>
      est imposé par Kotbo.
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Donnée</th><th>Conservation active</th><th>Après désactivation / départ</th><th>Sauvegardes</th></tr></thead>
        <tbody>
          <tr><td>Logs de messages (§3)</td><td>Durée configurée (défaut 90 j, plafond imposé)</td><td>Purge à la désactivation ou au départ du bot</td><td>Expiration à court terme</td></tr>
          <tr><td>Vérifications en attente / expirées (§4)</td><td>Jusqu'à 7 jours après expiration</td><td>Immédiat</td><td>Non conservées durablement</td></tr>
          <tr><td>Preuves de détection multi-comptes finalisées (§4)</td><td>Durée nécessaire à la sécurité du serveur, plafonnée</td><td>Purge après le délai</td><td>Expiration courte</td></tr>
          <tr><td>Candidatures refusées</td><td>Cooldown de re-candidature, puis suppression (sauf vivier consenti)</td><td>Sur instruction admin</td><td>Expiration courte</td></tr>
          <tr><td>Tickets & transcripts</td><td>Durée configurée / plafonnée</td><td>Sur instruction admin ou demande recevable</td><td>Expiration courte</td></tr>
          <tr><td>Journaux d'audit du dashboard</td><td>90 jours</td><td>Automatique</td><td>Expiration courte</td></tr>
          <tr><td>Journaux d'erreurs techniques</td><td>30 à 90 jours</td><td>Automatique</td><td>Expiration courte</td></tr>
          <tr><td>Profil membre, niveaux, statistiques</td><td>Durée de vie du serveur sur Kotbo</td><td>Purge au départ du bot ou sur demande</td><td>Expiration selon cycle</td></tr>
          <tr><td>Sanctions & données de modération</td><td>Durée de vie du serveur (nécessaire à la sécurité)</td><td>Archivage / suppression sur instruction</td><td>Expiration selon cycle</td></tr>
          <tr><td>Sauvegardes de serveur</td><td>Jusqu'à suppression manuelle (quota)</td><td>Sur instruction admin</td><td>—</td></tr>
        </tbody>
      </table>
    </div>
    <div class="info-box">
      Certaines durées de purge automatique sont en cours de déploiement complet côté infrastructure. Toute demande
      adressée à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> reçoit une réponse dans le délai RGPD applicable
      (en principe un mois). Certaines données peuvent être conservées si nécessaire au respect d'une obligation légale ou
      à la constatation/défense d'un droit en justice.
    </div>
  </section>

  <!-- Section 8 -->
  <section id="hebergement" class="policy-section">
    <div class="section-badge">08</div>
    <h2>Hébergement et transferts internationaux</h2>
    <p>
      Les données traitées par Kotbo sont hébergées sur des serveurs situés <strong>en Europe (EEE)</strong>. Aucun
      transfert direct hors EEE n'est effectué par Kotbo, à l'exception des éléments suivants&nbsp;:
    </p>
    <ul>
      <li><strong>Discord Inc.</strong> (États-Unis)&nbsp;: profil Discord soumis aux garanties contractuelles de Discord.</li>
      <li><strong>Sentry</strong> (si activé)&nbsp;: journaux d'erreurs, sous clauses contractuelles types selon la région configurée.</li>
      <li><strong>Cloudflare</strong>&nbsp;: requêtes traitées par son réseau mondial pour la sécurité, selon les garanties applicables.</li>
      <li><strong>YouTube / Twitch</strong>&nbsp;: aucune donnée personnelle de membre transmise.</li>
      <li><strong>jsDelivr / GitHub</strong>&nbsp;: moteurs d'IDE chargés à la demande&nbsp;; les polices de la landing et du dashboard sont auto-hébergées.</li>
    </ul>
  </section>

  <!-- Section 9 -->
  <section id="droits" class="policy-section">
    <div class="section-badge">09</div>
    <h2>Vos droits au titre du RGPD</h2>
    <div class="rights-grid">
      <div class="right-card"><h4>Accès <span class="art">(art. 15)</span></h4><p>Confirmation du traitement et copie de vos données (export JSON complet, tous serveurs).</p></div>
      <div class="right-card"><h4>Rectification <span class="art">(art. 16)</span></h4><p>Correction de données inexactes. Le profil Discord se modifie côté Discord.</p></div>
      <div class="right-card"><h4>Effacement <span class="art">(art. 17)</span></h4><p>Suppression de vos données, dans les limites légales (ex. sanctions nécessaires à la sécurité).</p></div>
      <div class="right-card"><h4>Limitation <span class="art">(art. 18)</span></h4><p>Suspension temporaire du traitement dans certaines situations.</p></div>
      <div class="right-card"><h4>Portabilité <span class="art">(art. 20)</span></h4><p>Réception de vos données dans un format structuré (JSON) pour les traitements fondés sur le consentement ou un contrat.</p></div>
      <div class="right-card"><h4>Opposition <span class="art">(art. 21)</span></h4><p>Opposition à un traitement fondé sur l'intérêt légitime, pour un motif tenant à votre situation.</p></div>
      <div class="right-card"><h4>Décision automatisée <span class="art">(art. 22)</span></h4><p>Droit à une intervention humaine et à contester une décision automatisée (voir §4 et §11).</p></div>
      <div class="right-card"><h4>Réclamation <span class="art">(art. 77)</span></h4><p>Saisine de la CNIL si vos droits ne sont pas respectés.</p></div>
    </div>
    <div class="info-box">
      Adressez votre demande à <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> en précisant votre identifiant
      Discord, le serveur concerné et la nature de la demande. Délai de réponse&nbsp;: <strong>30 jours</strong>,
      prolongeable de 2 mois pour les demandes complexes (avec notification). Pour les traitements dont l'administrateur
      est responsable, nous pouvons vous réorienter vers lui ou l'assister.
    </div>
  </section>

  <!-- Section 10 -->
  <section id="securite" class="policy-section">
    <div class="section-badge">10</div>
    <h2>Sécurité des données</h2>
    <ul>
      <li><strong>Chiffrement en transit</strong>&nbsp;: communications entre le bot, le dashboard et la base via TLS/HTTPS.</li>
      <li><strong>Isolation par serveur</strong>&nbsp;: les données de chaque serveur sont séparées&nbsp;; un administrateur ne peut pas accéder aux données d'un autre serveur.</li>
      <li><strong>Authentification robuste</strong>&nbsp;: OAuth2 Authorization Code, sessions serveur révocables, cookie <em>HttpOnly</em>, jetons Discord chiffrés côté serveur, clés API stockées sous forme de hash SHA-256.</li>
      <li><strong>Contrôle d'accès granulaire</strong>&nbsp;: permissions configurables par l'administrateur pour chaque membre du staff.</li>
      <li><strong>Journaux d'audit</strong>&nbsp;: actions administratives horodatées et attribuées.</li>
      <li><strong>Sauvegardes</strong>&nbsp;: sauvegardes régulières avec contrôle d'intégrité.</li>
    </ul>
    <p>
      En cas de violation susceptible d'engendrer un risque pour vos droits et libertés, nous notifions l'autorité de
      contrôle compétente dans les 72 heures et, en cas de risque élevé, les personnes concernées dans les meilleurs délais.
    </p>
  </section>

  <!-- Section 11 -->
  <section id="profilage" class="policy-section">
    <div class="section-badge">11</div>
    <h2>Profilage & décisions automatisées</h2>
    <p>
      Certains traitements comportent une part d'automatisation pouvant produire un effet significatif&nbsp;: détection de
      multi-comptes (§4), liaison automatique de comptes, propagation de blacklist. Pour ces cas&nbsp;:
    </p>
    <ul>
      <li>vous avez le droit d'obtenir une <strong>intervention humaine</strong>, d'exprimer votre point de vue et de <strong>contester</strong> la décision (art. 22)&nbsp;;</li>
      <li>la logique générale est décrite au §4&nbsp;;</li>
      <li>une <strong>analyse d'impact (AIPD/DPIA)</strong> est menée au titre de l'article 35 en raison du profilage et de la surveillance impliqués.</li>
    </ul>
  </section>

  <!-- Section 12 -->
  <section id="mineurs" class="policy-section">
    <div class="section-badge">12</div>
    <h2>Mineurs</h2>
    <p>
      Discord est réservé aux personnes d'au moins 13 ans (16 dans certains pays de l'UE). Kotbo s'appuie sur les
      vérifications d'âge de Discord et ne collecte pas délibérément de données d'enfants de moins de 13 ans. Parents et
      tuteurs&nbsp;: contactez <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a> pour toute suppression.
    </p>
  </section>

  <!-- Section 13 -->
  <section id="modifications" class="policy-section">
    <div class="section-badge">13</div>
    <h2>Modifications</h2>
    <p>
      Cette politique peut évoluer (nouveaux modules, évolutions réglementaires, changements de pratiques). En cas de
      modification substantielle, information via le serveur Discord officiel, une notification dans le dashboard et la
      mise à jour de la date en tête de page. Une politique de confidentialité est un document d'information&nbsp;: sa
      mise à jour ne vaut pas recueil de consentement. Lorsqu'un traitement requiert un consentement, celui-ci est
      demandé séparément par un acte positif clair.
    </p>
  </section>

  <!-- Section 14 -->
  <section id="contact" class="policy-section">
    <div class="section-badge">14</div>
    <h2>Contact</h2>
    <div class="contact-card">
      <p class="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Données personnelles &amp; vie privée</p>
      <a href="mailto:privacy@kotbo.fr" class="font-black text-indigo-700 text-lg hover:underline">privacy@kotbo.fr</a>
      <p class="text-sm text-gray-600 mt-3 leading-relaxed">Précisez votre identifiant Discord, le(s) serveur(s) concerné(s) et la nature de la demande. Réponse sous 30 jours maximum.</p>
      <hr class="my-4 border-gray-100" />
      <p class="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Contact général</p>
      <a href="mailto:contact@kotbo.fr" class="font-black text-gray-700 text-lg hover:underline">contact@kotbo.fr</a>
    </div>
    <div class="info-box mt-6">
      <strong>Autorité de contrôle&nbsp;:</strong> vous pouvez saisir la <strong>CNIL</strong> —
      <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>, 3 Place de Fontenoy,
      TSA 80715, 75334 Paris Cedex 07. Voir aussi les <a href="{base}/mentions-legales">Mentions légales</a>, les
      <a href="{base}/terms">CGU</a>, la <a href="{base}/cookies">politique cookies</a> et le <a href="{base}/dpa">DPA</a>.
    </div>
  </section>
</LegalPageLayout>
