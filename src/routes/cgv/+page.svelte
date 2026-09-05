<script lang="ts">
  /**
   * Conditions Générales de Vente.
   *
   * Les CGU (`/terms`) disent ce qu'on a le droit de faire avec Kotbo ; elles
   * renvoyaient jusqu'ici les conditions commerciales à « séparément au moment
   * de la souscription », c'est-à-dire à rien. Cette page porte donc tout ce
   * qui naît de la vente et non de l'usage : offres, prix, TVA, essai,
   * reconduction, résiliation, rétractation, impayés, garanties.
   *
   * Les montants ne sont pas recopiés à la main : ils viennent de
   * `PLAN_REGISTRY` côté produit, et la grille reproduite ici est datée. En cas
   * d'écart, c'est la page tarifs affichée au moment de la commande qui fait
   * foi - une CGV figée qui contredit le prix réellement débité est pire que
   * pas de grille du tout.
   */
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'objet',         label: 'Objet & champ' },
    { id: 'vendeur',       label: 'Identité du vendeur' },
    { id: 'offres',        label: 'Offres & paliers' },
    { id: 'prix',          label: 'Prix & TVA' },
    { id: 'commande',      label: 'Commande' },
    { id: 'essai',         label: 'Essai gratuit' },
    { id: 'cadeaux',       label: 'Cadeaux & codes' },
    { id: 'paiement',      label: 'Paiement' },
    { id: 'duree',         label: 'Durée & résiliation' },
    { id: 'retractation',  label: 'Droit de rétractation' },
    { id: 'impaye',        label: 'Impayé & suspension' },
    { id: 'fourniture',    label: 'Fourniture du service' },
    { id: 'garantie',      label: 'Garantie de conformité' },
    { id: 'evolution',     label: 'Évolution & prix' },
    { id: 'donnees',       label: 'Données personnelles' },
    { id: 'responsabilite',label: 'Responsabilité' },
    { id: 'modification',  label: 'Modification des CGV' },
    { id: 'litiges',       label: 'Droit & litiges' },
  ];

  /** Durée de l'essai, alignée sur `TRIAL_DAYS` (@kotbo/contracts). */
  const TRIAL_DAYS = 15;
  /** Date de la grille tarifaire reproduite ci-dessous. */
  const PRICING_DATE = '6 septembre 2026';
</script>

<svelte:head>
  <title>Conditions Générales de Vente | Kotbo</title>
  <meta name="description" content="Conditions générales de vente des abonnements Kotbo : offres, prix, TVA, essai gratuit, reconduction, résiliation, rétractation et garanties." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://kotbo.fr/cgv" />
</svelte:head>

<LegalPageLayout
  title="Conditions Générales de Vente"
  subtitle="Dernière mise à jour : {PRICING_DATE} · Abonnements au service Kotbo"
  {sections}
  activePage="cgv"
>
  <div class="info-box warn mb-10">
    <p class="font-bold mb-1">Acceptation</p>
    <p class="mb-0">
      Les présentes conditions générales de vente («&nbsp;CGV&nbsp;») s'appliquent à toute souscription à une offre
      payante Kotbo. Elles sont acceptées lors de la commande&nbsp;: la validation du paiement vaut acceptation pleine et
      sans réserve. Elles complètent les <a href="{base}/terms">Conditions Générales d'Utilisation</a>, qui régissent
      l'usage du service&nbsp;; en cas de contradiction sur un point commercial, les présentes CGV prévalent.
    </p>
  </div>

  <section id="objet" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Objet et champ d'application</h2>
    <p>
      Les présentes CGV définissent les conditions dans lesquelles le vendeur commercialise l'accès aux offres payantes
      de Kotbo&nbsp;: un bot Discord et son tableau de bord web destinés à la gestion de communautés (modération, staff,
      tickets, statistiques, niveaux, événements, candidatures, économie et organisation de serveur).
    </p>
    <p>
      Elles s'appliquent aussi bien aux <strong>consommateurs</strong> — toute personne physique agissant à des fins qui
      n'entrent pas dans le cadre de son activité professionnelle — qu'aux <strong>professionnels</strong>. Les clauses
      réservées à l'une ou l'autre catégorie sont signalées comme telles&nbsp;; à défaut de mention, la clause s'applique
      à tous.
    </p>
    <p>
      L'abonnement est souscrit <strong>pour un serveur Discord déterminé</strong>. Il n'est ni cessible ni transférable
      d'un serveur à un autre sans notre accord.
    </p>
  </section>

  <section id="vendeur" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Identité du vendeur</h2>

    <div class="info-box danger mb-6">
      <p class="font-bold mb-1">À compléter avant publication</p>
      <p class="mb-0">
        Deux mentions obligatoires restent marquées <code>[À COMPLÉTER]</code> ci-dessous&nbsp;: la dénomination exacte
        et l'adresse professionnelle (art. L221-5 du code de la consommation). La page ne doit pas être mise en ligne
        tant qu'elles manquent. Le numéro de TVA indiqué est celui qui découle du SIREN&nbsp;: il doit être vérifié sur
        l'attestation d'assujettissement avant publication.
      </p>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr><th>Information</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Dénomination</td><td><code>[À COMPLÉTER : nom de l'entrepreneur individuel]</code></td></tr>
          <tr><td>Forme</td><td>Entreprise individuelle sous le régime de la micro-entreprise</td></tr>
          <tr><td>SIREN</td><td>101&nbsp;303&nbsp;535</td></tr>
          <tr><td>SIRET (siège)</td><td>101&nbsp;303&nbsp;535&nbsp;00021</td></tr>
          <tr><td>Adresse professionnelle</td><td><code>[À COMPLÉTER]</code></td></tr>
          <tr><td>N° de TVA intracommunautaire</td><td>FR&nbsp;14&nbsp;101303535</td></tr>
          <tr><td>Directeur de la publication</td><td>Elouan Passereau et Nathan Rontey</td></tr>
          <tr><td>Contact commercial</td><td><a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a></td></tr>
          <tr><td>Contact données personnelles</td><td><a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm text-gray-500">
      Ci-après «&nbsp;le vendeur&nbsp;», «&nbsp;Kotbo&nbsp;» ou «&nbsp;nous&nbsp;». Le client est désigné par
      «&nbsp;vous&nbsp;».
    </p>
  </section>

  <section id="offres" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Offres et paliers</h2>
    <p>
      Kotbo est vendu <strong>tout-en-un</strong>&nbsp;: une offre payante ouvre l'intégralité du catalogue de modules,
      y compris ceux ajoutés ultérieurement. Il n'existe pas de module vendu à part ni d'option payante. Ce qui distingue
      les offres n'est donc pas leur contenu fonctionnel, mais <strong>la taille du serveur</strong> à laquelle elles
      s'adressent.
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Offre</th><th>Taille du serveur</th><th>Contenu</th><th>Souscription</th></tr></thead>
        <tbody>
          <tr><td><strong>Gratuit</strong></td><td>—</td><td>Aucun module actif. Seules les pages de configuration, de gestion des modules et de facturation restent accessibles.</td><td>État par défaut, sans commande</td></tr>
          <tr><td><strong>Starter</strong></td><td>Jusqu'à 1&nbsp;000 membres</td><td>Tout le catalogue</td><td>En ligne, libre-service</td></tr>
          <tr><td><strong>Pro</strong></td><td>De 1&nbsp;001 à 10&nbsp;000 membres</td><td>Tout le catalogue</td><td>En ligne, libre-service</td></tr>
          <tr><td><strong>Ultimate</strong></td><td>De 10&nbsp;001 à 100&nbsp;000 membres</td><td>Tout le catalogue</td><td>En ligne, libre-service</td></tr>
          <tr><td><strong>Sur mesure</strong></td><td>Au-delà de 100&nbsp;000 membres</td><td>Tout le catalogue, conditions convenues au cas par cas</td><td>Sur devis, après <a href="https://pros.kotbo.fr/rdv" target="_blank" rel="noopener noreferrer">rendez-vous</a></td></tr>
        </tbody>
      </table>
    </div>
    <p>
      L'offre applicable est déterminée par l'effectif du serveur au moment de la commande. Si un serveur franchit
      durablement le plafond de son offre, nous vous en informons et vous proposons le passage à l'offre supérieure&nbsp;;
      à défaut d'accord, nous pouvons appliquer le tarif correspondant à l'échéance suivante, dans les conditions de
      l'article&nbsp;14.
    </p>
    <p>
      L'offre <strong>Gratuit</strong> n'est pas une version d'essai&nbsp;: elle n'ouvre aucun module. Le bot peut être
      présent sur un serveur sans qu'aucune fonctionnalité vendue ne soit active.
    </p>
  </section>

  <section id="prix" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Prix et TVA</h2>
    <p>
      Les prix sont exprimés en <strong>euros toutes taxes comprises</strong>, TVA française au taux en vigueur incluse.
      Le détail de la TVA figure sur chaque facture, disponible depuis votre espace de facturation.
    </p>
    <p>Grille en vigueur au {PRICING_DATE}&nbsp;:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Offre</th><th>Mensuel</th><th>Annuel</th></tr></thead>
        <tbody>
          <tr><td>Starter</td><td>5,00&nbsp;€ TTC / mois</td><td>30,00&nbsp;€ TTC / an</td></tr>
          <tr><td>Pro</td><td>9,99&nbsp;€ TTC / mois</td><td>49,99&nbsp;€ TTC / an</td></tr>
          <tr><td>Ultimate</td><td>25,00&nbsp;€ TTC / mois</td><td>149,99&nbsp;€ TTC / an</td></tr>
          <tr><td>Sur mesure</td><td colspan="2">Sur devis</td></tr>
        </tbody>
      </table>
    </div>
    <p>
      Cette grille est reproduite à titre d'information et à la date indiquée. <strong>Le prix qui vous engage est celui
      affiché sur la page de commande au moment où vous validez le paiement</strong>, récapitulé avant validation et
      confirmé par courriel.
    </p>
    <p>
      Les prix s'entendent hors coûts éventuels de votre établissement bancaire (frais de change, commission sur
      paiement en devise étrangère), qui restent à votre charge.
    </p>
  </section>

  <section id="commande" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Commande et conclusion du contrat</h2>
    <p>La commande se déroule depuis le tableau de bord Kotbo&nbsp;:</p>
    <ul>
      <li>choix du serveur concerné et de l'offre correspondant à sa taille&nbsp;;</li>
      <li>choix de la périodicité, mensuelle ou annuelle&nbsp;;</li>
      <li>récapitulatif détaillé&nbsp;: offre, périodicité, montant TTC, date du premier prélèvement et date de reconduction&nbsp;;</li>
      <li>acceptation des présentes CGV et, le cas échéant, renonciation expresse au droit de rétractation (article&nbsp;10)&nbsp;;</li>
      <li>paiement sur la page sécurisée de notre prestataire.</li>
    </ul>
    <p>
      Le contrat est conclu à la <strong>confirmation du paiement</strong> par le prestataire. Une confirmation vous est
      alors adressée par courriel, reprenant les caractéristiques essentielles de l'abonnement. L'accès aux modules est
      ouvert immédiatement.
    </p>
    <p>
      Vous garantissez disposer des droits d'administration nécessaires sur le serveur Discord concerné et être habilité
      à engager la dépense. Une commande passée pour un serveur sur lequel vous n'avez pas ces droits peut être annulée.
    </p>
  </section>

  <section id="essai" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Essai gratuit</h2>
    <p>
      Un essai gratuit de <strong>{TRIAL_DAYS} jours</strong> est proposé à la première souscription d'une offre vendue
      en libre-service (Starter, Pro et Ultimate). Il ouvre l'intégralité des modules de l'offre choisie.
    </p>
    <ul>
      <li><strong>Un essai par personne et par serveur.</strong> Ni un même compte Discord ni un même serveur ne peuvent en bénéficier deux fois, y compris en changeant d'administrateur ou en recréant un serveur.</li>
      <li><strong>Un moyen de paiement est enregistré à l'ouverture de l'essai</strong>, mais aucun montant n'est débité pendant sa durée.</li>
      <li><strong>À l'issue des {TRIAL_DAYS} jours, l'abonnement se poursuit automatiquement</strong> et le premier prélèvement intervient, sauf résiliation avant l'échéance. La résiliation pendant l'essai est possible à tout moment depuis le tableau de bord et n'entraîne aucun débit.</li>
      <li>Une commande abandonnée avant le paiement (fermeture de la page, session expirée) ne consomme pas l'essai&nbsp;: il redevient disponible.</li>
    </ul>
    <p>
      L'offre Sur mesure n'ouvre pas droit à l'essai en libre-service&nbsp;: la période de découverte est définie au
      contrat.
    </p>
  </section>

  <section id="cadeaux" class="policy-section">
    <div class="section-badge">07</div>
    <h2>Offrir Kotbo — cadeaux et codes d'activation</h2>
    <p>
      Kotbo peut être offert à un serveur. Un cadeau est un <strong>paiement unique</strong> qui ouvre une offre pour une
      durée fixe&nbsp;: il n'est pas un abonnement, ne se reconduit pas et n'enregistre aucun moyen de paiement chez le
      bénéficiaire. À l'échéance, le serveur revient simplement à l'offre Gratuit, sans rien à résilier.
    </p>
    <ul>
      <li>Durées proposées&nbsp;: 1, 3, 6 ou 12&nbsp;mois.</li>
      <li>Le cadeau peut être acheté <strong>pour un serveur désigné</strong> (appliqué dès confirmation du paiement) ou <strong>sous forme de code</strong> à transmettre, que le bénéficiaire active depuis sa page de facturation.</li>
      <li>Un code non activé reste valable et peut être activé à tout moment&nbsp;; il ne peut l'être qu'une seule fois.</li>
      <li>Un cadeau ne peut pas être échangé contre un remboursement, ni cumulé avec un essai gratuit sur le même serveur.</li>
      <li>Si un abonnement est déjà en cours sur le serveur bénéficiaire, la période offerte s'ajoute à l'accès existant&nbsp;; elle ne suspend pas les prélèvements de l'abonnement, qu'il vous appartient de résilier si vous le souhaitez.</li>
    </ul>
    <p>
      Des <strong>codes d'activation</strong> peuvent par ailleurs être délivrés hors vente (partenariat, dédommagement,
      accord commercial). Ils ouvrent un accès à durée déterminée, sans contrepartie financière et sans reconduction.
    </p>
  </section>

  <section id="paiement" class="policy-section">
    <div class="section-badge">08</div>
    <h2>Paiement</h2>
    <p>
      Les paiements sont traités par <strong>Stripe Payments Europe, Ltd.</strong> Les données de carte bancaire sont
      saisies directement sur les pages de ce prestataire&nbsp;: <strong>nous n'y avons jamais accès et nous ne les
      conservons pas</strong>. Nous conservons uniquement les références nécessaires au suivi de l'abonnement
      (identifiant client, identifiant d'abonnement, statut, échéance).
    </p>
    <p>
      Les abonnements sont réglés d'avance, par prélèvement automatique sur le moyen de paiement enregistré, à chaque
      échéance. Les factures sont mises à disposition dans votre espace de facturation.
    </p>
    <p>
      <strong>Professionnels&nbsp;:</strong> conformément à l'article L441-10 du code de commerce, tout retard de
      paiement entraîne de plein droit des pénalités au taux d'intérêt légal majoré de 10&nbsp;points, ainsi qu'une
      indemnité forfaitaire de recouvrement de 40&nbsp;€.
    </p>
  </section>

  <section id="duree" class="policy-section">
    <div class="section-badge">09</div>
    <h2>Durée, reconduction et résiliation</h2>

    <h3>Durée et reconduction</h3>
    <p>
      L'abonnement est souscrit <strong>sans engagement de durée</strong>, pour la période choisie (un mois ou un an), et
      se <strong>reconduit tacitement</strong> à chaque échéance pour une période identique, tant qu'il n'a pas été
      résilié.
    </p>

    <h3>Résiliation par vous</h3>
    <p>
      Vous pouvez résilier <strong>à tout moment et sans motif</strong>, depuis la page Facturation de votre tableau de
      bord, en quelques clics et sans avoir à nous contacter.
    </p>
    <div class="info-box mb-4">
      <p class="mb-0">
        <strong>Effet de la résiliation&nbsp;:</strong> elle interrompt la reconduction. <strong>Votre accès reste
        entièrement ouvert jusqu'au terme de la période déjà réglée</strong>, puis le serveur revient à l'offre Gratuit.
        Aucun remboursement, même partiel, n'est dû au titre de la période en cours, qui a été facturée d'avance et dont
        le service a été fourni.
      </p>
    </div>
    <p>
      Tant que le terme n'est pas atteint, vous pouvez revenir sur votre décision et réactiver la reconduction, sans
      frais.
    </p>

    <h3>Information avant reconduction — consommateurs</h3>
    <p>
      Pour les abonnements <strong>annuels souscrits par un consommateur</strong>, et conformément à l'article L215-1 du
      code de la consommation, nous vous informons par courriel, au plus tôt trois mois et au plus tard un mois avant le
      terme, de la possibilité de ne pas reconduire l'abonnement. Si cette information vous parvient tardivement, vous
      pouvez mettre fin gratuitement à l'abonnement à tout moment à compter de la date de reconduction, et les sommes
      versées après cette date vous sont remboursées.
    </p>

    <h3>Résiliation par nous</h3>
    <p>
      Nous pouvons résilier l'abonnement en cas de manquement grave aux <a href="{base}/terms">CGU</a> (usage interdit,
      atteinte au service, contournement des limitations d'une offre) ou d'impayé persistant, après mise en demeure
      restée sans effet pendant quinze jours — sauf faute rendant la poursuite du contrat manifestement impossible, où
      la résiliation peut être immédiate. Les sommes correspondant à une période non fournie sont alors remboursées.
    </p>
    <p>
      Le retrait du bot du serveur Discord ne vaut pas résiliation&nbsp;: l'abonnement se poursuit et les prélèvements
      continuent tant qu'il n'a pas été résilié depuis le tableau de bord.
    </p>
  </section>

  <section id="retractation" class="policy-section">
    <div class="section-badge">10</div>
    <h2>Droit de rétractation</h2>
    <p class="text-sm text-gray-500">Cet article concerne exclusivement les consommateurs.</p>
    <p>
      En tant que consommateur, vous disposez en principe d'un délai de <strong>quatorze jours</strong> à compter de la
      conclusion du contrat pour vous rétracter, sans motif ni pénalité (art. L221-18 du code de la consommation).
    </p>
    <div class="info-box warn mb-4">
      <p class="font-bold mb-1">Exécution immédiate et renonciation</p>
      <p class="mb-0">
        Kotbo est un contenu numérique fourni immédiatement&nbsp;: les modules s'ouvrent dès la confirmation du paiement.
        Au moment de la commande, il vous est donc demandé de <strong>demander expressément l'exécution immédiate</strong>
        du service et de <strong>renoncer expressément à votre droit de rétractation</strong>, en cochant une case
        prévue à cet effet. Cette renonciation, prévue aux articles L221-25 et L221-28 du code de la consommation, vous
        est confirmée par écrit sur un support durable.
      </p>
    </div>
    <p>
      <strong>Si vous ne cochez pas cette case</strong>, la fourniture du service ne commence qu'à l'expiration du délai
      de quatorze jours, et vous conservez votre droit de rétractation entier pendant ce délai.
    </p>
    <p>
      <strong>Si vous la cochez</strong>, vous perdez votre droit de rétractation dès l'ouverture de l'accès. L'essai
      gratuit de {TRIAL_DAYS} jours, lorsqu'il s'applique, vous permet en pratique d'éprouver le service avant tout
      débit&nbsp;: il ne se substitue pas au droit légal, mais il en rend l'exercice rarement nécessaire.
    </p>
    <p>
      Pour exercer votre droit de rétractation lorsqu'il subsiste, il suffit de nous adresser une déclaration dénuée
      d'ambiguïté à <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a>. Le remboursement intervient dans les
      quatorze jours suivant la réception de votre demande, par le même moyen de paiement.
    </p>
  </section>

  <section id="impaye" class="policy-section">
    <div class="section-badge">11</div>
    <h2>Impayé et suspension</h2>
    <p>
      En cas d'échec d'un prélèvement, notre prestataire effectue plusieurs tentatives et vous en êtes informé par
      courriel et dans le tableau de bord. Pendant cette période, l'accès est maintenu.
    </p>
    <p>
      Si l'impayé persiste au terme de ces tentatives, l'abonnement prend fin et le serveur revient à l'offre Gratuit&nbsp;:
      les modules payants sont désactivés. <strong>Vos données et vos configurations sont conservées</strong> et
      redeviennent actives si vous souscrivez de nouveau, dans les limites de la politique de conservation décrite dans la
      <a href="{base}/privacy">politique de confidentialité</a>.
    </p>
  </section>

  <section id="fourniture" class="policy-section">
    <div class="section-badge">12</div>
    <h2>Fourniture du service et disponibilité</h2>
    <p>
      Nous sommes tenus à une <strong>obligation de moyens</strong>&nbsp;: nous mettons en œuvre les moyens raisonnables
      pour assurer la disponibilité et le bon fonctionnement du service, sans garantie d'un taux de disponibilité chiffré
      ni d'un fonctionnement ininterrompu et exempt d'erreurs.
    </p>
    <p>Sont notamment exclus de notre responsabilité, sans que la liste soit limitative&nbsp;:</p>
    <ul>
      <li>les interruptions, limitations, changements d'interface ou de règles décidés par <strong>Discord</strong>, dont Kotbo dépend entièrement&nbsp;;</li>
      <li>les incidents de nos hébergeurs et prestataires techniques (Cloudflare, Contabo, Stripe)&nbsp;;</li>
      <li>les défauts de votre connexion, de votre matériel ou de votre configuration Discord (permissions insuffisantes accordées au bot, notamment)&nbsp;;</li>
      <li>les opérations de maintenance, annoncées lorsque cela est possible&nbsp;;</li>
      <li>les cas de force majeure.</li>
    </ul>
    <p>
      Une interruption prolongée qui nous serait imputable et qui priverait durablement le service de son intérêt ouvre
      droit, sur demande, à une prolongation de l'abonnement à due proportion.
    </p>
    <p>
      Les offres <strong>Sur mesure</strong> peuvent prévoir un niveau de service défini au contrat&nbsp;; il prévaut
      alors sur le présent article.
    </p>
  </section>

  <section id="garantie" class="policy-section">
    <div class="section-badge">13</div>
    <h2>Garantie légale de conformité</h2>
    <p>
      Kotbo est un contenu numérique fourni de manière continue. Vous bénéficiez à ce titre de la
      <strong>garantie légale de conformité</strong> prévue aux articles L224-25-12 et suivants du code de la
      consommation, pendant toute la durée de fourniture du service.
    </p>
    <p>
      Si le service n'est pas conforme à ce qui est annoncé, vous pouvez en exiger la mise en conformité sans frais et
      dans un délai raisonnable. À défaut, vous pouvez obtenir une réduction du prix ou la résolution du contrat, dans
      les conditions prévues par la loi. Cette garantie s'applique indépendamment de toute garantie commerciale, et sans
      frais pour vous.
    </p>
    <p>
      Pour la mettre en œuvre, écrivez à <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a> en décrivant le défaut
      constaté.
    </p>
  </section>

  <section id="evolution" class="policy-section">
    <div class="section-badge">14</div>
    <h2>Évolution du service et des prix</h2>
    <p>
      Kotbo évolue en continu. Les modules ajoutés au catalogue sont inclus dans les offres payantes sans supplément.
      Nous pouvons faire évoluer, remplacer ou retirer une fonctionnalité&nbsp;; si un retrait affecte substantiellement
      une caractéristique essentielle du service, vous en êtes informé au moins <strong>trente jours</strong> à l'avance
      et pouvez résilier sans frais, avec remboursement de la période non fournie.
    </p>
    <p>
      Les prix peuvent être révisés. <strong>Une révision ne s'applique jamais à une période déjà réglée.</strong> Elle
      vous est notifiée au moins <strong>trente jours</strong> avant la date de reconduction concernée&nbsp;; vous
      pouvez alors résilier avant cette date, auquel cas l'ancien prix s'applique jusqu'au terme en cours. Le silence
      vaut acceptation du nouveau tarif à compter de la reconduction.
    </p>
  </section>

  <section id="donnees" class="policy-section">
    <div class="section-badge">15</div>
    <h2>Données personnelles</h2>
    <p>
      Le traitement des données personnelles est décrit dans la <a href="{base}/privacy">politique de confidentialité</a>.
      Lorsque nous traitons pour votre compte les données des membres de votre serveur, nous agissons en qualité de
      sous-traitant, dans les conditions de l'<a href="{base}/dpa">accord de sous-traitance</a>, qui fait partie
      intégrante du contrat.
    </p>
    <p>
      Les données strictement nécessaires à la facturation (identité du payeur, offre, montants, échéances) sont
      conservées pendant la durée légale de conservation des pièces comptables, soit dix ans.
    </p>
  </section>

  <section id="responsabilite" class="policy-section">
    <div class="section-badge">16</div>
    <h2>Responsabilité</h2>
    <p>
      Kotbo est un outil de gestion&nbsp;: <strong>les décisions prises sur votre serveur restent les vôtres</strong>.
      Les sanctions appliquées, les messages publiés, les rôles attribués et les configurations retenues relèvent de
      votre responsabilité et de celle de votre équipe, y compris lorsqu'ils résultent d'automatismes que vous avez
      paramétrés.
    </p>
    <p>
      <strong>Professionnels&nbsp;:</strong> notre responsabilité au titre du contrat est limitée aux dommages directs et
      plafonnée aux sommes effectivement versées au cours des douze mois précédant le fait générateur. Sont exclus les
      dommages indirects, notamment la perte d'exploitation, de données, de clientèle ou d'image.
    </p>
    <p>
      <strong>Consommateurs&nbsp;:</strong> aucune stipulation des présentes ne saurait limiter les droits que vous
      tenez de la loi. Les limitations ci-dessus ne vous sont pas opposables, et notre responsabilité s'applique dans les
      conditions du droit commun.
    </p>
    <p>Aucune limitation ne joue en cas de dol, de faute lourde ou de dommage corporel.</p>
  </section>

  <section id="modification" class="policy-section">
    <div class="section-badge">17</div>
    <h2>Modification des CGV</h2>
    <p>
      Les présentes CGV peuvent être modifiées. La version applicable à une commande est celle en vigueur au jour de
      cette commande. Toute modification substantielle vous est notifiée au moins <strong>trente jours</strong> avant sa
      prise d'effet&nbsp;; si elle ne vous convient pas, vous pouvez résilier sans frais avant cette date.
    </p>
  </section>

  <section id="litiges" class="policy-section">
    <div class="section-badge">18</div>
    <h2>Droit applicable et litiges</h2>
    <p>
      Les présentes CGV sont soumises au <strong>droit français</strong>.
    </p>
    <p>
      En cas de difficulté, nous vous invitons à nous écrire d'abord à
      <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a>&nbsp;: la très grande majorité des différends se règle à ce
      stade.
    </p>
    <p>
      <strong>Consommateurs&nbsp;:</strong> vous pouvez saisir la juridiction de votre lieu de résidence ou celle du lieu
      d'exécution du contrat. La plateforme européenne de règlement en ligne des litiges est accessible à l'adresse
      <a href="https://consumer-redress.ec.europa.eu/" target="_blank" rel="noopener noreferrer">consumer-redress.ec.europa.eu</a>.
    </p>
    <p>
      <strong>Professionnels&nbsp;:</strong> à défaut d'accord amiable, compétence est attribuée aux tribunaux du ressort
      du siège du vendeur.
    </p>

    <div class="info-box danger">
      <p class="font-bold mb-1">Médiation de la consommation — clause manquante</p>
      <p class="mb-0">
        Tout professionnel qui vend à des consommateurs doit adhérer à un dispositif de médiation de la consommation et
        en indiquer les coordonnées dans ses conditions de vente (art. L616-1 et R616-1 du code de la consommation).
        Aucun médiateur n'est désigné à ce jour&nbsp;: cette mention devra être ajoutée après adhésion à un organisme
        référencé par la CECMC.
      </p>
    </div>
  </section>
</LegalPageLayout>
