<script lang="ts">
  import { base } from '$app/paths';
  import LegalPageLayout from '$lib/components/LegalPageLayout.svelte';

  const sections = [
    { id: 'editeur',   label: "Éditeur du site" },
    { id: 'directeur', label: 'Directeur de publication' },
    { id: 'hebergeur', label: 'Hébergeur' },
    { id: 'contact',   label: 'Contact' },
    { id: 'pi',        label: 'Propriété intellectuelle' },
  ];
</script>

<svelte:head>
  <title>Mentions légales | Kotbo</title>
  <meta name="description" content="Mentions légales du service Kotbo : éditeur, directeur de publication, hébergeur et contact." />
  <meta name="robots" content="index, follow" />
</svelte:head>

<LegalPageLayout
  title="Mentions légales"
  subtitle="Dernière mise à jour : 20 juillet 2026"
  {sections}
  activePage="legal"
>
  <div class="info-box mb-10">
    <p class="mb-0">
      Kotbo est édité par des <strong>particuliers à titre non professionnel</strong>. Conformément à l'article 6 III 2
      de la loi pour la confiance dans l'économie numérique (LCEN), les éditeurs ont communiqué leur identité à
      l'hébergeur et peuvent ne pas rendre publique leur adresse&nbsp;; les coordonnées de l'hébergeur figurent ci-dessous.
    </p>
  </div>

  <section id="editeur" class="policy-section">
    <div class="section-badge">01</div>
    <h2>Éditeur du site et du service</h2>
    <p>Le service Kotbo (bot Discord, dashboard et site) est édité conjointement par&nbsp;:</p>
    <ul>
      <li><strong>Elouan Passereau</strong> — <a href="https://klaynight.fr/" target="_blank" rel="noopener noreferrer">klaynight.fr</a></li>
      <li><strong>Nathan Rontey</strong> — <a href="https://nathaan.me/" target="_blank" rel="noopener noreferrer">nathaan.me</a></li>
    </ul>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Information</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Statut</td><td>Particuliers — édition à titre non professionnel</td></tr>
          <tr><td>Adresse</td><td>Non publiée (option LCEN art. 6 III 2)&nbsp;; identité communiquée à l'hébergeur. Contact par e-mail.</td></tr>
          <tr><td>SIREN / SIRET</td><td>Non applicable (activité non professionnelle)</td></tr>
          <tr><td>E-mail</td><td><a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm text-gray-500">
      Si le service venait à être exploité sous un statut professionnel (micro-entreprise), ces mentions seraient mises à
      jour avec la dénomination, le numéro SIRET et l'adresse professionnelle correspondants.
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
          <tr><td>Distribution du site / CDN &amp; sécurité</td><td>Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis</td></tr>
          <tr><td>Hébergement de la base de données et de l'infrastructure applicative</td><td>Contabo GmbH — Aschauer Straße 32a, 81549 Munich, Allemagne (Union européenne) · <a href="https://contabo.com" target="_blank" rel="noopener noreferrer">contabo.com</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm">La localisation et les garanties de ces prestataires sont détaillées dans l'<a href="{base}/dpa">accord de sous-traitance</a> et la <a href="{base}/privacy">politique de confidentialité</a>.</p>
  </section>

  <section id="contact" class="policy-section">
    <div class="section-badge">04</div>
    <h2>Contact</h2>
    <ul>
      <li>Contact général&nbsp;: <a href="mailto:contact@kotbo.fr">contact@kotbo.fr</a></li>
      <li>Données personnelles &amp; vie privée&nbsp;: <a href="mailto:privacy@kotbo.fr">privacy@kotbo.fr</a></li>
    </ul>
  </section>

  <section id="pi" class="policy-section">
    <div class="section-badge">05</div>
    <h2>Propriété intellectuelle</h2>
    <p>
      L'ensemble des éléments du service (nom, logos, interface, code) est protégé. Toute reproduction ou réutilisation
      non autorisée est interdite. Voir les <a href="{base}/terms">CGU</a> pour les conditions d'utilisation.
    </p>
  </section>
</LegalPageLayout>
