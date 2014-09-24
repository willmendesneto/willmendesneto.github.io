---
layout: post
title: This e $scope no AngularJS
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


Ao usar o AngularJS entendemos o porquê do framework ser um dos mais populares atualmente, estando na lista dos mais pesquisados no Google e Github. A adoção do AngularJs em aplicações de pequeno, médio e grande porte é algo fantástico (estando o framework nos top trends do google search e de frameworks frontend) e isso acontece devido a vários fatores dentre eles:

* Facilidade em integração de ferramentas de testes (unitários, end-to-end, etc);
* Modularização baseada em princípios SOLID;
* Two-way data bind, tendo o $scope como interface para a atualização de dados;
* Vasta documentação;
* Comunidade ativa;

Com o seu crescimento surgiram várias iniciativas afim de fornecer conteúdo de qualidade. Porém algumas coisas foram melhoradas desde então. Grandes nomes do Javascript, como John Papa e Todd Motto, fora alguns cursos gratuitos e conteúdos diversos na web mostram a utilização do elemento `this` dentro dos elementos angular.

Isso nos remete a questão: qual a diferença entre cada um deles? É melhor usar `this` ou `$scope` em seu projeto? Quando aliar a utilização de cada um deles?

## ENTENDENDO O PAPEL DO THIS NO JAVASCRIPT

O elemento `this` é referente ao escopo no qual ele se encontra. Caso você não tenha especificado um valor para `this` ao escopo atual, o seu valor padrão será o do elemento `window`. Em algumas situações você pode perder a referência do elemento `this` por alterações do escopo. Para isto podemos referenciar o escopo em outra variável e chamarmos diretamente. Um exemplo clássico é:

{% highlight javascript %}
function Test(){
  this.phrase = 'Calling function "Test"';
  this.showAlert = function(){
    alert(this.phrase);
  }
  this.showAlertTimeout = function(){
    setTimeout(function(){
      alert(this.phrase);
    });
  }
}

var test = new Test();

// Mostra a mensagem no alert
test.showAlert();

// Mostra "undefined" no alert, pois o escopo se perdeu
test.showAlertTimeout();
setTimeout(test.showAlert, 1000);

{% endhighlight %}

Uma forma de utilizarmos o método `showAlertTimeout` corretamente é atribuirmos o escopo `this` a uma variável. Este exemplo então ficaria assim:

{% highlight javascript %}
function Test(){
  this.phrase = 'Calling function "Test"';
  this.showAlert = function(){
    alert(this.phrase);
  }
  this.showAlertTimeout = function(){
    var self = this;
    setTimeout(function(){
      alert(self.phrase);
    });
  }
}

var test = new Test();

// Mostra a mensagem no alert
test.showAlert();
test.showAlertTimeout();

// Mostra "undefined" no alert, pois o escopo se perdeu
setTimeout(test.showAlert, 1000);

{% endhighlight %}

Com estes dois exemplos temos uma definição mais clara da utilização do `this` e do seu comportamento referente ao escopo atual que se encontra. Além disso percebemos uma maneira de utilizar referencias para efetuarmos chamadas baseadas em outros fluxos.

Mas quando utilizar `this` e `$scope`

## QUANDO USAR CADA UM

De maneira bem resumida fica aqui a diferença real entre a utilização do `this` e do `$scope`.

this:

- Quando a função de controller é chamado, o this é a referencia do controller, já que ele é baseado no escopo atual em que se encontra; normalmente o this refere-se ao seu pai em primeiro grau. por exemplo
- O elemento this não pode acessar métodos já existentes no $scope, como `.$emit()`, `.$on()` e `.$broadcast()`
{% highlight javascript %}

var globalValue = 10;
function Controller(){

  return {
    globalValue: 20
    method: function(){
      return globalValue; // returns 10, value based in global variable
    },
    anotherMethod: function(){
      return this.globalValue * 2; // returns 40, because this value is refered of local function
    }
  };
}
{% endhighlight %}

$scope

- Cada controller (ou classes que utilizem o $scope diretamente) tem um objeto de interface `$scope` associado.
- A função do controlador (construtor) é responsável por definir as propriedades do modelo e funções / métodos / comportamento no seu `$scope` associado, mas todos eles podem ser acessados por outra interface, a `$rootScope`.
- Somente métodos definidos via $scope (e objetos escopo pai, usando a herança via prototype, por exemplo ) podiam ser acessados via template HTML a partir de diretivas como ng-click, filtros, etc;

Um exemplo claro de seus prós e contras é em um controller para um elemento de abas, para verificar a aba selecionada utilizando um parâmetro guardado via LocalStorage, uma das 3 API's HTML5 para WebStorage. Inicialmente o valor da aba selecionada será a da primeira aba. Após o clique do usuário em outra aba, ao atualizar a página o controller para as abas deve ser capaz de verificar a última aba selecionada e colocá-la como ativa e visível para o usuário.

Ao lidarmos com o this percemos inicialmente um problema. A informação que guardamos referente à aba selecionada não é aplicada. No caso a aba selecionada pelo usuário não é ativada e visível ao atualizar a página. Já no caso do mesmo controller utilizando o $scope percebemos que o fluxo de comportamento ocorre como esperado e a última aba continua visível ao atualizar a página.

Estes exemplos encontram-se no plunker:

- Controller para abas utilizando o "this": http://plnkr.co/edit/g9dasZ?p=info

- Controller para abas utilizando o "$scope": http://plnkr.co/edit/oVmfIX?p=info

Neste exemplo podemos perceber que o `this` não pode acessar alguns métodos do $scope, como já foi dito antes. Caso queira testar, basta remover o comentário do exemplo utilizando o `this`. Não explicarei muito sobre o service `WebStorage`, pois ele faz parte do toolset de componentes [angular-keepr/KEEPR][keepr]. Caso tenham curiosidade basta darem uma olhada no projeto (se curtirem mandam um star no projeto, ajuda bastante =) ).

{% highlight javascript %}
app.controller('PanelsController', function ($scope, $timeout, WebStorage) {

    var me = this;
    this.tab = WebStorage.get(me.panelSelectedKey) || 1;

    this.panelSelectedKey = 'panelSelected';

    this.setPanel = function (_tab) {
        this.tab = _tab;
        WebStorage.set(me.panelSelectedKey, _tab);
    };

    this.isSelected = function (_tab) {
        return this.tab === _tab;
    };

    // This code doesn't run
    //this.$on('selectPanel', function () {
    //  me.setPanel(this.tab);
    //});
    //this.$emit('selectPanel');

    this.setPanel(this.tab );

});
{% endhighlight %}

Já o exemplo utilizando o $scope funciona perfeitamente como o esperado

{% highlight javascript %}
app.controller('PanelsController', function ($scope, $timeout, WebStorage) {

    $scope.tab;

    $scope.panelSelectedKey = 'panelSelected';

    $scope.setPanel = function (_tab) {
        $scope.tab =  _tab;
        WebStorage.set($scope.panelSelectedKey, _tab);
    };

    $scope.isSelected = function (_tab) {
      return $scope.tab === _tab;
    };

    $scope.$on('selectPanel', function () {
      $scope.setPanel(WebStorage.get($scope.panelSelectedKey) || 1);
    });
    $scope.$emit('selectPanel');
});
{% endhighlight %}


## CONCLUSÃO

Acompanho a publicação de novos conteúdos e percebo uma crescente preferência para anexar models ao controller e apelidá-lo no template utilizando a sintaxe 'ng-controller="RealController as real"' utilizando o `this` e quando existe a necessidade de compartilhar algo entre várias directivas ou o exige um comportamento mais específico, o $scope fornece um conjunto de features bastante úteis ($watch, $broadcast e $on, por exemplo). Mas se tudo que você precisa é de um compartilhamento de dados simples entre elemento e html, usando o controller com o `this` é, sem dúvida, uma solução a se pensar.

Para quem tiver interesse, existe alguns repositórios interessantes sobre patterns no AngularJS



Espero que tenham gostado e até mais!

Links:

* Projeto "KEEPR": [https://github.com/willmendesneto/keepr][keepr]
* AngularJS Style Guide: [https://github.com/johnpapa/angularjs-styleguide][angularjs-style-guide]
* StackOverflow "this vs $scope in AngularJS controllers": [http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers][question-stackoverflow]
* $scope - Documentação oficial: [https://docs.angularjs.org/guide/scope][scope-docs]
* $rootScope - Documentação oficial: [https://docs.angularjs.org/api/ng/type/$rootScope.Scope][root-scope-docs]
* Opinionated AngularJS styleguide for teams: [http://www.linkplugapp.com/a/437872][oppiniated-angular]
* Best Practice Recommendations for Angular App Structure: [https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub][angular-best-practices]
* Leverage Scope Creep! An in-depth tutorial on Angular.js Scope: [http://modernweb.com/2014/07/14/leverage-scope-creep-depth-tutorial-angular-js-scope/][leverage-scope]
* Rethinking AngularJS Controllers: [http://toddmotto.com/rethinking-angular-js-controllers/?=utm&utm_content=buffere9265&utm_medium=social&utm_source=linkedin.com&utm_campaign=buffer][rethinking-controllers]

[keepr]:https://github.com/willmendesneto/keepr
[angularjs-style-guide]:https://github.com/johnpapa/angularjs-styleguide
[scope-docs]:https://docs.angularjs.org/guide/scope
[root-scope-docs]:https://docs.angularjs.org/api/ng/type/$rootScope.Scope
[question-stackoverflow]:http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers
[oppiniated-angular]:http://www.linkplugapp.com/a/437872
[angular-best-practices]:https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub
[leverage-scope]:http://modernweb.com/2014/07/14/leverage-scope-creep-depth-tutorial-angular-js-scope/
[rethinking-controllers]:http://toddmotto.com/rethinking-angular-js-controllers/?=utm&utm_content=buffere9265&utm_medium=social&utm_source=linkedin.com&utm_campaign=buffer
