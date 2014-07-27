---
layout: post
title: Trabalhando com Thin Directives no AngularJS
categories: angularjs javascript directives architecture
tags: javascript angularjs frameworks frontend
status: publish
image: https://pbs.twimg.com/profile_images/2149314222/square.png
type: post
published: true
meta: {}
author: Wilson Mendes Neto
---

## INTRODUÇÃO

O conceito de diretivas no AngularJS é algo bastante interessante para apps, visando aspectos como reuso, portabilidade, modularização, dentre outros. Porém, a depender da complexidade de sua diretiva, alguns testes tornam-se mais complexos. Uma abordagem para simplificar alguns procedimentos é a contrução de diretivas baseando-se no conceito de diretivas "magras" (Thin Directives). Conheci este conceito no post de Joel Hooks ["Let's Make Full-Ass AngularJS Directives"][post-thin-directives], onde ele aborda os conceito de uma maneira bastante simples. Recomendo esta leitura, bastante explicativo!

O conceito de thin directives é a construção de uma diretiva Angular utilizando também outros componentes (como Controllers, Services, Factories, etc) como base de uma diretiva. Com esta abordagem os testes ficam muito mais simples, já que você delega algumas responsabilidades a outros componentes Angular.

## PROBLEMA: DIRETIVA NAVBAR

Criaremos uma diretiva de menu como exemplo. Algo bastante simples, mas acredito que bem didático para que todos entendam melhor este novo conceito (para alguns) e algumas formas de utilizá-lo. A idéia é que nossa diretiva possa verificar qual item está sendo acessado em tempo real, a partir das informações passadas pela url.

Para isto vamos criar 3 arquivos para lidar diretamente com esta diretiva:

- `navbar.html`: Template da nossa diretiva com as informações e valores a serem atualizados.
- `navbar-ctrl.js`: Controller para o nosso menu. Ele será responsável por fazer a integração para que o nosso controller funcione perfeitamente
- `navbar.js`: Diretiva de nosso app. Este arquivo será bem compacto, pois possuirá somente algumas configurações mais simples.

Baseando a construção de nossa diretiva em [TDD][tdd], vamos focar no conceito de [Red, Green, Refactor][red-green-refactor], assim além do conceito de Thin Directives, ainda teremos conhecimento de TDD (para quem tem dúvidas sobre).

## CRIAÇÃO DA DIRETIVA

Inicialmente temos este código html que se tornará o template de nossa aplicação, o arquivo com a configuração das rotas de nosso app e outro template html que será o da diretiva.

`index.html`:

{% highlight html %}
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <script>document.write('<base href="' + document.location + '" />');</script>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  </head>
  <body ng-app="plunkerApp">
    <!-- Esta é a nossa diretiva-->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
{% endhighlight %}

`app.js`:

{% highlight javascript %}
'use strict';

angular.module('plunkerApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
{% endhighlight %}

`navbar.html`:

{% highlight html %}
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
{% endhighlight %}

`isActive()` é o método que o controller `NavbarCtrl` utilizará acessando a diretiva, mas por ora não criaremos o controller e sim a nossa diretiva. Porém temos que fazer alguns testes para validarmos a diretiva e saber se tudo está ocorrendo corretamente. Vamos ao nosso teste:

`navbar-test.js`:

{% highlight javascript %}

'use strict';

describe('Directive: navbar', function () {

  // load the directive's module
  beforeEach(module('plunkerApp'));

  var element,
    template,
    httpBackend,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;

    template = '<div class="header">' +
  '<ul class="nav nav-pills pull-right">' +
  '  <li ng-class="{active:{active:isActive('/')}"><a href="#">Home</a></li>' +
  '  <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>' +
  '</ul>' +
  '<h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>' +
'</div>';
    httpBackend.whenGET('navbar.html').respond(template);

    element = angular.element(template);
    element = $compile(element)(scope);
  }));

  it('should create a navbar header with ".header" class in element', function () {
    expect(element.hasClass('header')).toBe(true);
  });

  it('should create a navbar header with ng-controller value equals "NavbarCtrl"', function () {
    expect(element.attr('ng-controller')).toEqual('NavbarCtrl');
  });

});
{% endhighlight %}

Agora vamos criar a nossa diretiva

`navbar.js`:

{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .directive('navbar', function () {
    return {
      restrict: 'E',
      templateUrl: 'navbar.html',
      controller: 'NavbarCtrl',
    };
  });
{% endhighlight %}

Estamos utilizando a diretiva com o formato "elemento". Temos alguns formatos para diretivas:

- 'E': Elemento (<navbar></navbar>);
- 'C': Classe (<div class="navbar"></div>);
- 'A': Atributo (<div navbar ></div>);

Estas opções podem ser combinadas, o que abre um leque de possibilidades a mais para as diretivas.
Ex :

{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .directive('navbar', function () {
    return {
      restrict: 'EAC', // Aceita o formato de classe, atributo ou element
      templateUrl: 'navbar.html',
      controller: 'NavbarCtrl',
    };
  });
{% endhighlight %}

Caso queiram saber mais sobre as diretivas, dêem uma olhada na [documentação das diretivas do angularjs][angular-directive-docs].

## ETAPA FINAL DA CONSTRUÇÃO DA DIRETIVA

Ainda assim, nosso teste não estará correto, pois não temos o nosso controller criado. Vamos criar agora ele e o seu respectivo teste

`navbar-ctrl-test.js`:

{% highlight javascript %}
'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('plunkerApp'));

  var NavbarCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    location = $location;
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  describe('isActive', function(){

    it('should return "true" when paths are the same', function () {
      location.path('/');
      expect(scope.isActive('/')).toBeTruthy();
    });

    it('should return "false" when paths aren\'t the same', function () {
      location.path('/');
      expect(scope.isActive('/error')).toBeFalsy();
    });

    it('should return "true" when word starts are the same', function () {
      location.path('/contacts/1/edit');
      expect(scope.isActive('/contacts')).toBeTruthy();
    });

    it('should return "true" when word starts are the same followed by query string', function () {
      location.path('/contacts?id=1');
      expect(scope.isActive('/contacts')).toBeTruthy();
    });

  });
});
{% endhighlight %}

`navbar-ctrl.js`:
{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isActive = function(path){
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
  });
{% endhighlight %}

Agora ao rodar os testes, tudo estará ok.

## CONCLUSÃO

Diretivas magras são interessantes para diretivas com complexidade média e/ou alta, pois delega características a outros elementos do AngularJS, melhorando a sua manutenção, testes, etc. Vale a pena visar aspectos um pouco mais avançados juntamente às diretivas, com outros Patterns unidos ao AngularJS. Assim podemos criar uma aplicação muito mais modular utilizando o melhor do javascript e do AngularJS.

Caso queiram ver este exemplo funcionando, acessem o plunker que criei com este exemplo.

Link Plunker: [http://plnkr.co/edit/UHnbq5Nn5dNLsAPxOikk?p=preview][link-plunker]

O que acharam? Como vocês utilizam no seu dia-a-dia?

Obrigado e até mais!

Links:

- Documentação das diretivas: [https://docs.angularjs.org/guide/directive][angular-directive-docs]
- Let's Make Full-Ass AngularJS Directives: [http://joelhooks.com/blog/2014/02/11/lets-make-full-ass-angularjs-directives/][post-thin-directives]
- Test Driven Development (TDD): [http://pt.wikipedia.org/wiki/Test_Driven_Development][tdd]
- Red, Green, Refactor: [http://www.jamesshore.com/Blog/Red-Green-Refactor.html][red-green-refactor]


[post-thin-directives]: http://joelhooks.com/blog/2014/02/11/lets-make-full-ass-angularjs-directives/
[red-green-refactor]: http://www.jamesshore.com/Blog/Red-Green-Refactor.html
[tdd]: http://pt.wikipedia.org/wiki/Test_Driven_Development
[link-plunker]: http://plnkr.co/edit/UHnbq5Nn5dNLsAPxOikk?p=preview
[angular-directive-docs]: https://docs.angularjs.org/guide/directive
