---
layout: post
title: Usando ng-class e css para criar um widget de bloco animado
categories: javascript angularjs frontend frameworks architecture
tags: javascript angularjs management version control frontend
status: publish
image: http://www.bennadel.com/resources/uploads/2013/feelings_about_angularjs_over_time.png
type: post
published: true
meta: {}
author:
---

## INTRODUÇÃO

Esta é uma postagem mais simples, mas baseada em um questionamento. Quem utiliza o AngularJs conhece o "ngAnimate", um módulo para gerenciar animações em aplicações que utilizam o framework. Porém desta vez utilizaremos animações CSS3 e a diretiva `Ng-class` para criarmos um exemplo de bloco animado.

Algo simples, mas usual e que mostrará que nem sempre precisamos utilizar um módulo mais completo/complexo para melhorar a interação na aplicação, diminuindo a complexidade de gerenciamento de módulos e performance, já que o módulo de animações também utiliza javascript para animações e carrega o módulo para a aplicação (mais um request no browser). Mas antes vamos falar um pouco das tecnologias utilizadas para fecharmos com um exemplo prático utilizando-os.

## HTML5

Em um de seus posts de título ["HTML5 – W3C versus WHATWG"][maujor-post] Maujor, um ícone quando tratamos de css e web, cita um conteúdo da WHATWG que define HTML5 de uma maneira bem bacana.

> O termo "HTML5" é um buzzword para designar as modernas tecnologias para web, muitas das quais (não todas) são desenvolvidas pelo WHATWG. Este documento é dedicado a uma destas tecnologias; outros estão disponíveis e estão relacionados no índice das especificações do WHATWG (http://kwz.me/wm).

Ou seja, HTML5 é nada mais, nada menos que a combinação entre as tecnologias HTML5 + CSS3 + API's Javascript, dando maiores possibilidades ao Frontend de sua aplicação.

## NG-CLASS

NG class é uma diretiva do core do framework AngularJS que habilita a inserção e remoção de classes em elementos do DOM baseados em parâmetros controlados pelo framework via controller, service e outros elementos, baseando em valores acessados via interface "$scope".

Definição do `ngClass` pela documentação oficial do framework:

> The ngClass directive allows you to dynamically set CSS classes on an HTML element by databinding an expression that represents all classes to be added.


## UM EXEMPLO PRÁTICO: WIDGET ANIMADO

Agora que cada um foi devidamente apresentado, podemos finalizar com o exemplo bem simples: um widget animado. Este bloco deve iniciar "invisível" e, ao clicar no botão ficará visível ou invisível, baseando-se no evento anterior (se estiver invisível, ficará visível e vice-versa).

Neste exemplo basicamente utilizarei o ngClass para adicionar ou remover uma classe, sendo que nesta classe está atrelada uma animação simples.

`index.html`

{% highlight html %}
<!DOCTYPE html>
<html ng-app="plunker">

  <head>
    <meta charset="utf-8" />
    <title>AngularJS Plunker</title>
    <script>document.write('<base href="' + document.location + '" />');</script>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
  </head>

  <body class="fundo-form" ng-controller="PlunkerCtrl">
    <div class="container">
      <button ng-click="visible = !visible;">{{ !!visible ? 'Inv' : 'V' }}isible</button>
    </div>
    <div class="widget-content" ng-class="{'is-visible': visible}">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, quam accusantium iure harum autem id ex sit nemo officiis veritatis earum voluptas perspiciatis dolor quaerat ipsum odio culpa similique alias.
    </div>

    <script data-require="angular.js@1.0.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.min.js" data-semver="1.0.8"></script>
    <script src="app.js"></script>

  </body>

</html>
{% endhighlight %}

`main.css`
{% highlight css %}

[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
}
.widget-content{
  position: fixed;
bottom: 0;
width: 100%;
height: 0px;
background: #251b15;
color: #CCCCCC;
font-size: 0.8em;
border: none;
  -webkit-transition: height 0.5s ease-in-out;
  -moz-transition: height 0.5s ease-in-out;
  -o-transition: height 0.5s ease-in-out;
  transition: height 0.5s ease-in-out;
}

.widget-content.is-visible {
  height: 300px;
    -webkit-transition: height 0.5s ease-in-out;
    -moz-transition: height 0.5s ease-in-out;
    -o-transition: height 0.5s ease-in-out;
    transition: height 0.5s ease-in-out;
}
{% endhighlight %}

`app.js`
{% highlight javascript %}
var app = angular.module('plunker', []);

app.controller('PlunkerCtrl', function ($scope) {
});
{% endhighlight %}

Você pode ver um exemplo com este código [no meu plunker][plunker-example].

## CONCLUSÃO

A idéia deste post é primeiro apresentar a diretiva `ngClass` caso não conheçam e mostrar o poder em aliarmos tecnologias que em conjunto formam o que chamamos de HTML5. Além disso um ponto importante é termos senso crítico ao utilizarmos componentes, bibliotecas e outros elementos em nossa aplicação, já que existem outros aspectos importantes em uma aplicação, como performance, quantidade de requisições e outros.

Espero que tenham gostado e até mais!

Links:

* Documentação da diretiva "ngClass": [https://docs.angularjs.org/api/ng/directive/ngClass][ngclass-doc]
* CSS3 Animations: [http://www.w3.org/TR/css3-animations/][css3-doc]
* Postagem "HTML5 – W3C versus WHATWG" do Maujor:[http://www.maujor.com/blog/2014/08/05/html5-w3c-versus-whatwg/][maujor-post]

[css3-doc]:http://www.w3.org/TR/css3-animations/
[ngclass-doc]:https://docs.angularjs.org/api/ng/directive/ngClass
[plunker-example]:http://plnkr.co/edit/jrROjT?p=preview
[maujor-post]:http://www.maujor.com/blog/2014/08/05/html5-w3c-versus-whatwg/
