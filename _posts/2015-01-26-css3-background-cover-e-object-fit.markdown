---
layout: post
title: "CSS3: background: cover e object-fit: cover"
categories: javascript angularjs frontend frameworks architecture
tags: css3 tips tricks frontend
status: publish
image: /assets/images/css3-post.png
type: post
lang: "us"
published: true
meta: {}
author:
---

## INTRODUÇÃO

O CSS 3 melhorou a forma que interagíamos com o usuário de maneira direta. Muitos dos artifícios que utilizávamos javascript para proporcionar maior interatividade (animações, transições, etc) em nossas aplicações hoje em dia são feitas utilizando CSS 3 de maneira simples e usual.

Uma das coisas que o CSS3 proporciona é a de utilizar um full background usando `background-size: cover` para centralizar uma determinada imagem, mas nem todos conhecem uma outra propriedade (ou não sabem a real diferença entre uma e a outra) que é a `object-fit: cover` e utilizam o background-size para o mesmo efeito, o que diminui a semântica do app.

## CENTRALIZANDO IMAGEM COM CSS

Podemos centralizar imagens utilizando somente CSS? Sim! E para isso podemos utilizar estas propriedades. Por exemplo: em um app que precise de uma imagem que tome todo o fundo do browser, por exemplo, podemos muito bem utilizar a propriedade `background-size: cover`:

Podemos fazer isso desde 2009 graças à propriedade do CSS3 `background-size: cover`. Utilizaremos o element "html" para montar um fundo fixo e centrado sobre ele, em seguida, ajustar o seu tamanho usando `background-size` definido com a propriedade `cover`.

{% highlight css linenos %}

html {
  background: url(/assets/images/css3-post.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

{% endhighlight %}

Você pode acessar visualizar este [código de exemplo em um plunker][background-size-example], mas vale ressaltar 2 aspectos:

1°: Tudo vai funcionar como esperamos nos browsers:

- Safari 3+;
- Chrome *;
- IE 9+;
- Opera 10+ (com prefixo `-o`);
- Firefox 3.6+ (com prefixo `-moz`);

2°: Caso utilize pré-processadores esta questão de prefixos já são resolvidos por várias ferramentas. Dá uma olhada no seu pré-processador preferido.

Muitas pessoas utilizavam a propriedade background-size para criarem um "workaround" colocando elementos como "div", "spam" com a propriedade `cover` para simularem este evento, mas atualmente podemos simular este evento de outra forma e é aí que entra a propriedade `object-fit`.

Podemos utilizá-lo para cortarmos de maneira proporcional uma imagem de avatar, por exemplo. Com o `object-fit: cover` aplicado à imagem com largura e altura definidas, ela é dsitribuída de forma centralizada. Para isso defina as dimensões da imagem e usando o seguinte CSS:

{% highlight css linenos %}

img {
    object-fit: cover;
}

{% endhighlight %}

Criei um código de exemplo no [plunker com os formatos de utilização do atributo no plunker][object-fit-example] para darem uma olhada no `object-fit` em ação. Caso queiram saber mais podem dar uma olhada sobre os [browsers que suportam `object-fit` via Can I use][can-i-use-object-fit].

## CONCLUSÃO

Simples, não? A depender do que queira fazer não precisa adicionar elementos no DOM e afetar diretamente a semântica do nosso app. Estas técnicas funcionam muito bem em evergreen browsers, mas existe um [polyfill][object-fit-polyfill] para os browsers mais antigos. Você pode adicioná-lo a seu projeto via npm ou bower. Agora é só utilizá-los em seus apps da melhor maneira possível!

Valeu e até mais!

Links:

* CSS3 - The Object-fit: [http://www.w3.org/TR/css3-images/#the-object-fit][w3c-object-fit]
* CSS3 - Background-size: [http://www.w3.org/TR/2002/WD-css3-background-20020802/#background-size][w3c-background-size]
* Center and crop images with a single line of CSS: [https://medium.com/@chrisnager/center-and-crop-images-with-a-single-line-of-css-ad140d5b4a87][center-crop-images-post]
* Can I use object-fit: [http://caniuse.com/#feat=object-fit][can-i-use-object-fit]

[center-crop-images-post]: https://medium.com/@chrisnager/center-and-crop-images-with-a-single-line-of-css-ad140d5b4a87
[can-i-use-object-fit]: http://caniuse.com/#feat=object-fit
[object-fit-polyfill]: https://github.com/anselmh/object-fit
[w3c-object-fit]: http://www.w3.org/TR/css3-images/#the-object-fit
[w3c-background-size]: http://www.w3.org/TR/2002/WD-css3-background-20020802/#background-size
[background-size-example]: http://plnkr.co/edit/BjE3ct?p=preview
[object-fit-example]: http://plnkr.co/edit/erzWvD?p=preview
