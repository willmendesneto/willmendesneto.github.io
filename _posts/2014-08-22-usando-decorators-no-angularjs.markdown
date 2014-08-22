---
layout: post
title: Usando decorators no AngularJS
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

Todos já conhecem sobre a fama da curva de aprendizado no AngularJS, que é comparado a uma montanha russa (risos).

![Curva de Aprendizado no AngularJS](http://www.bennadel.com/resources/uploads/2013/feelings_about_angularjs_over_time.png)

Alguns conceitos como directives, factories e services são comumente mais usados, mas e se você tiver de alterar um comportamento mais específico de um módulo seu e/ou até mesmo de um módulo da comunidade? Como fazê-lo sem interferir no Core do módulo utilizado?

## USANDO DECORATORS NO CORE DO ANGULAR JS

Um post interessante feito por [Brian Ford][btford-github] ([@briantford][btford-twitter]) com um nome bem sugestivo ["Hacking Core Directives in AngularJS"][btford-post] explica sobre um cenário no qual existe a necessidade de há a necessidade de se alterar uma diretiva do Core (todas as diretivas do Core do AngularJS utilizam o namespace `ng` e sua utilização para seus apps é considerada uma má prática de desenvolvimento) do AngularJS utilizando decorators a partir da interface `$provide`. Vale citar que o mesmo autor tem um [lightning talk bem interessante falando sobre Decorators, disponibilizada no seu github][btford-about-decorators].

[Jacob Wejendorp][jacob-gh] falou mais sobre inserção/alteração de métodos interessantes para quem trabalha com promises no angular e gostaria de maiores tratamentos e opções no ["Extending $q promises in Angular"][jacob-post].

## USANDO DECORATORS EM MÓDULOS EXTERNOS

Outro post bem bacana é o do [Damien Klinnert][damien] falando sobre sua experiência ao utilizar decorators no AngularJS. Em um de seus exemplos ele mostra como alterar o comportamento do módulo angular-resource. Sua alteração é bastante simples e didática:

- Ele cria um módulo utilizando o `ngResource` padrão para acessar o angular-resource;
- Cria-se uma configuração específica para fazer as alterações no módulo, utilizando o `$provide.decorator()`;

Achava que esta era uma abordagem meio que didática, mas me deparei com uma utilização real em uma de minhas empreitadas com o AngularJS. Um sistema que já estava em produção e que tinha um codebase considerável tinha de ser alterado. A sua API foi atualizada e com base em alguns parâmetros iniciais teríamos de verificar qual a API está disponível para o usuário e inicializarmos via app. Outra coisa interessante é que o sistema não pensava anteriormente em versionamento de API (já que era uma mescla caótica entre MVC e entregas de conteúdo via REST), ou seja, nada de `/v1`, `/v2` para facilitar a nossa vida inicialmente (senão seria algo bem simples).

{% highlight javascript %}

angular.module('ngResource+apiPrefix', [
    'ngResource'
])
.config(function ($provide) {
    $provide.decorator('$resource', function ($delegate) {

        // Return a new constructor function that prepends an API
        // prefix to the passed resource URL (first parameter).
        return function decoratedResource() {
            var l = window.location,
                 API_PREFIX = ''
            ;
            if (l.pathname.indexOf('/primeira-parte-da-url/segunda-parte-da-url') !== -1) {
                var pathnameSplit = l.pathname.split('/');
                API_PREFIX = l.host + '/' + pathnameSplit[1] + '/' + pathnameSplit[2] + '/';
            } else {
                API_PREFIX = l.host + '/';
            }

            arguments[0] = API_PREFIX + arguments[0];
            arguments[0] = l.protocol + '//' + arguments[0].replace('//', '/');
            return $delegate.apply(this, arguments);
        };

    });
});

{% endhighlight %}

Inicialmente bem simples. Além disto podemos refatorar para que essa verificação seja feita com base em informações server-side, usando alguma linguagem de backend para auxiliar e várias outras opções, aumentando ainda mais a nossa gama de possibilidades. No meu caso acabei optando por algo auxiliado pelo backend, afim de evitar tratamentos desnecessários.

## CONCLUSÃO

A utilização de decorators no Angular é algo bem simples e muito poderoso, indo além de algo como [sugar syntax][sugar-syntax], trazendo uma maior modularidade de alterações. Mas tenha cuidado, pois as alterações serão refletidas em todo o seu projeto. Use-o com cautela e seja feliz!

Links:

* Post "Hacking Core Directives in AngularJS": [http://briantford.com/blog/angular-hacking-core][btford-post]
* Brian Ford: [https://github.com/btford][btford-github]
* LIghtning Talk "Decorators in AngularJS": [https://github.com/btford/brian-talks-about-decorators][btford-about-decorators]
* Post "Extending $q promises in Angular": [http://dorp.io/blog/extending-q-promises.html][jacob-post]
* Sugar Syntax:[http://en.wikipedia.org/wiki/Syntactic_sugar][sugar-syntax]

[btford-post]:http://briantford.com/blog/angular-hacking-core
[btford-github]:https://github.com/btford
[btford-about-decorators]:https://github.com/btford/brian-talks-about-decorators
[jacob-post]:http://dorp.io/blog/extending-q-promises.html
[jacob-gh]:https://github.com/wejendorp
[sugar-syntax]:http://en.wikipedia.org/wiki/Syntactic_sugar
