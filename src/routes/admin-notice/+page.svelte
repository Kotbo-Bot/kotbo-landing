<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head><title>Modèle d'information des membres | Kotbo</title></svelte:head>

<main class="min-h-screen bg-gray-50 text-gray-800 py-14 px-6">
  <article class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl p-7 md:p-12 shadow-sm prose-legal">
    <a href="{base}/" class="text-sm font-bold text-indigo-700 hover:underline">← Retour à Kotbo</a>
    <h1>Modèle d'information des membres</h1>
    <p>Ce modèle doit être adapté aux modules réellement activés, aux durées retenues par le serveur et à l'identité de son administrateur.</p>
    <div class="template">
      <h2>Utilisation du bot Kotbo</h2>
      <p>[Nom du serveur / responsable] utilise Kotbo pour : [modules et finalités activés].</p>
      <p>Selon ces modules, Kotbo peut traiter votre identifiant et profil Discord, votre activité sur le serveur, vos participations,
        tickets, candidatures ou informations de modération. [Nom du serveur] est responsable de ces traitements et Kotbo intervient
        comme prestataire sous-traitant.</p>
      <p>La base légale retenue est : [intérêt légitime / contrat / consentement selon la finalité]. Les données sont accessibles à
        [rôles autorisés] et conservées pendant [durées].</p>
      <p>Vous pouvez demander l'accès, la rectification, la limitation, l'opposition ou l'effacement de vos données auprès de
        [contact du serveur]. Vous pouvez également contacter privacy@kotbo.fr ou saisir la CNIL.</p>
      <p>Politique complète : https://kotbo.fr/privacy</p>
    </div>
    <h2>Points à compléter obligatoirement</h2>
    <ul><li>identité et contact du responsable du serveur ;</li><li>finalités, modules et bases légales ;</li><li>destinataires et durées ;</li><li>modalités concrètes d'exercice des droits.</li></ul>
    <footer><a href="{base}/privacy">Confidentialité</a><a href="{base}/terms">CGU</a><a href="{base}/dpa">DPA</a><a href="{base}/mentions-legales">Mentions légales</a></footer>
  </article>
</main>

<style>
  .prose-legal{line-height:1.75}.prose-legal h1{font:800 2.3rem Manrope,sans-serif;margin:1.5rem 0;color:#111827}.prose-legal h2{font:800 1.3rem Manrope,sans-serif;margin:2rem 0 .5rem}.template{margin:2rem 0;padding:1.5rem;border:1px solid #c7d2fe;background:#f5f7ff;border-radius:1rem}.template h2{margin-top:0}ul{padding-left:1.4rem;list-style:disc}footer{display:flex;gap:1.25rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;font-weight:700;color:#4338ca}
</style>
