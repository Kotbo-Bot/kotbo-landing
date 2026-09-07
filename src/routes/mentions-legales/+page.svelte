<script lang="ts">
  /**
   * Mentions légales.
   *
   * Cette page déclarait jusqu'ici une édition « par des particuliers à titre
   * non professionnel », sans SIREN, en s'appuyant sur l'option de l'article
   * 6 III 2 de la LCEN qui dispense les éditeurs non professionnels de publier
   * leur adresse.
   *
   * Cette construction ne tient plus : Kotbo vend des abonnements récurrents
   * encaissés par Stripe. Une activité de vente répétée et lucrative est une
   * activité professionnelle, l'option de la LCEN ne lui est pas ouverte, et un
   * vendeur à distance doit publier son identité complète (art. L221-5 du code
   * de la consommation, R123-237 du code de commerce). Les mentions décrivent
   * donc désormais la micro-entreprise qui exploite le service.
   */
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'editeur',   label: "Éditeur du site" },
    { id: 'directeur', label: 'Directeur de publication' },
    { id: 'hebergeur', label: 'Hébergeur' },
    { id: 'contact',   label: 'Contact' },
    { id: 'conditions',label: 'Conditions contractuelles' },
    { id: 'pi',        label: 'Propriété intellectuelle' },
  ];
</script>

<svelte:head>
  <title>Mentions légales | Kotbo</title>
  <meta name="description" content="Mentions légales du service Kotbo : éditeur, immatriculation, directeur de publication, hébergeur et contact." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://kotbo.fr/mentions-legales" />
</svelte:head>

<LegalPageLayout
  title="Mentions légales"
  subtitle="Dernière mise à jour : 5 septembre 2026"
  {sections}
  activePage="legal"
>
  <div class="info-box danger mb-10">
    <p class="font-bold mb-1">À compléter avant publication</p>
    <p class="mb-0">
      L'adresse professionnelle marquée <code>[À COMPLÉTER]</code> ci-dessous est une mention obligatoire pour un
      vendeur à distance&nbsp;: la page ne doit pas être mise en ligne tant qu'elle manque. Le numéro de TVA indiqué
      découle du SIREN et doit être vérifié sur l'attestation d'assujettissement.
    </p>
  </div>

  <section id="editeur" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Éditeur du site et du service</h2>
    <p>
      Le service Kotbo — bot Discord, tableau de bord et site — est édité et exploité par une entreprise individuelle
      relevant du régime de la micro-entreprise&nbsp;:
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Information</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Dénomination</td><td><code>[À COMPLÉTER : nom de l'entrepreneur individuel]</code></td></tr>
          <tr><td>Forme juridique</td><td>Entreprise individuelle — régime de la micro-entreprise</td></tr>
          <tr><td>SIREN</td><td>101&nbsp;303&nbsp;535</td></tr>
          <tr><td>SIRET (siège)</td><td>101&nbsp;303&nbsp;535&nbsp;00021</td></tr>
          <tr><td>N° de TVA intracommunautaire</td><td>FR&nbsp;14&nbsp;101303535</td></tr>
          <tr><td>Adresse professionnelle</td><td><code>[À COMPLÉTER]</code></td></tr>
          <tr><td>E-mail</td><td><a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a></td></tr>
        </tbody>
      </table>
    </div>
    <p>
      Le service est conçu et développé par <strong>Elouan Passereau</strong>
      (<a href="https://klaynight.fr/" target="_blank" rel="noopener noreferrer">klaynight.fr</a>) et
      <strong>Nathan Rontey</strong>
      (<a href="https://nathaan.me/" target="_blank" rel="noopener noreferrer">nathaan.me</a>).
    </p>
    <p class="text-sm text-gray-500">
      Les conditions commerciales de la vente des abonnements figurent dans les
      <a href="{base}/cgv">Conditions Générales de Vente</a>, qui reprennent cette même identité.
    </p>
  </section>

  <section id="directeur" class="policy-section">
    <div class="section-badge">02</div>
    <h2>Directeur de la publication</h2>
    <p>Les directeurs de la publication sont <strong>Elouan Passereau</strong> et <strong>Nathan Rontey</strong>.</p>
  </section>

  <section id="hebergeur" class="policy-section">
    <div class="section-badge">03</div>
    <h2>Hébergeur</h2>
    <p>Le site et l'infrastructure sont hébergés par&nbsp;:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Rôle</th><th>Prestataire</th></tr></thead>
        <tbody>
          <tr><td>Distribution du site / CDN &amp; sécurité</td><td>Cloudflare, Inc.  101 Townsend St, San Francisco, CA 94107, États-Unis</td></tr>
          <tr><td>Hébergement de la base de données et de l'infrastructure applicative</td><td>Contabo GmbH  Aschauer Straße 32a, 81549 Munich, Allemagne (Union européenne) · <a href="https://contabo.com" target="_blank" rel="noopener noreferrer">contabo.com</a></td></tr>
          <tr><td>Traitement des paiements</td><td>Stripe Payments Europe, Ltd.  1 Grand Canal Street Lower, Dublin 2, Irlande (Union européenne) · <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">stripe.com</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm">La localisation et les garanties de ces prestataires sont détaillées dans l'<a href="{base}/dpa">accord de sous-traitance</a> et la <a href="{base}/privacy">politique de confidentialité</a>.</p>
  </section>

  <section id="contact" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Contact</h2>
    <ul>
      <li>Contact général et commercial&nbsp;: <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a></li>
      <li>Données personnelles &amp; vie privée&nbsp;: <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></li>
      <li>Rendez-vous commercial&nbsp;: <a href="https://pros.kotbo.fr/rdv" target="_blank" rel="noopener noreferrer">pros.kotbo.fr/rdv</a></li>
    </ul>
  </section>

  <section id="conditions" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Conditions contractuelles</h2>
    <p>Plusieurs documents distincts régissent la relation, selon ce dont il est question&nbsp;:</p>
    <ul>
      <li><a href="{base}/terms">Conditions Générales d'Utilisation</a> — ce que l'on peut faire avec le service, et à quelles obligations son usage est soumis.</li>
      <li><a href="{base}/cgv">Conditions Générales de Vente</a> — offres, prix, TVA, essai, reconduction, résiliation, rétractation et garanties.</li>
      <li><a href="{base}/privacy">Politique de confidentialité</a> et <a href="{base}/dpa">accord de sous-traitance</a> — le traitement des données personnelles.</li>
    </ul>
    <p>
      Le <a href="{base}/cookies">détail des cookies et stockages locaux</a> employés par le site et le tableau de bord
      est publié séparément.
    </p>
  </section>

  <section id="pi" class="policy-section">
    <div class="section-badge">06</div>
    <h2>Propriété intellectuelle</h2>
    <p>
      L'ensemble des éléments du service (nom, logos, interface, code) est protégé. Toute reproduction ou réutilisation
      non autorisée est interdite. Voir les <a href="{base}/terms">CGU</a> pour les conditions d'utilisation.
    </p>
  </section>
</LegalPageLayout>
