<script lang="ts">
  /**
   * Mot mis en avant dans un titre.
   *
   * Les titres de cette page criaient : capitales, ronds au marqueur, gras
   * partout. Quand tout est souligné, plus rien ne l'est. Ce composant ne fait
   * qu'incliner un mot et lui poser un trait discret dessous - assez pour que
   * l'oeil sache où se poser, assez peu pour que la phrase reste lisible d'un
   * trait.
   *
   * Le trait est un pseudo-élément et non un `underline` : il se place sous la
   * ligne de base sans couper les jambages, et suit la taille du texte.
   */
  interface Props {
    /** Neutralise le trait quand le titre en compte déjà plusieurs. */
    plain?: boolean;
    children: import('svelte').Snippet;
  }

  const { plain = false, children }: Props = $props();
</script>

<em class="emph" class:emph--plain={plain}>{@render children()}</em>

<style>
  .emph {
    font-style: italic;
    position: relative;
    display: inline-block;
    /* Manrope penche peu : un demi-degré de plus rend l'italique lisible
       comme une intention, et non comme un défaut de rendu. */
    transform: skewX(-2deg);
  }

  .emph::after {
    content: '';
    position: absolute;
    left: 0.06em;
    right: 0.06em;
    /* Sous la ligne de base, pas sur les jambages du g et du p. */
    bottom: -0.06em;
    height: 0.07em;
    border-radius: 999px;
    background: currentColor;
    opacity: 0.22;
  }

  .emph--plain::after {
    display: none;
  }
</style>
