---
layout: post
title: "Micro tunings em Angular apps - Pt 1"
categories: "performance, frontend, angular"
tags: "performance, frontend, angular, web performance, tips, tricks"
status: publish
lang: "us"
image: "/assets/images/components.jpeg"
type: post
published: true
meta: {}
author: Will Mendes
---

<a class="page-link" href="{{ '/2015/05/11/micro-tunnings-with-angular-apps-part-1/' | prepend: site.baseurl | replace: '//', '/' }}">Veja a versão em inglês</a>

## INTRODUÇÃO

Muitas aplicações estão usando Angular como framework Frontend e isso é muito bom, mas com o passar do tempo e evolução do software outros aspectos do produto/serviço possuem importância fundamental também, como manutenibilidade e... performance, claro!

Mas quando falamos sobre performance, quais são as (re)soluções que voê tem em mente?


- Mais máquinas?
- Mais cache?
- Mais minificação/compressão?
- Mais chamadas assíncronas?
- Utilizar HTTP2?

> Não esconda os seus problemas

Sim, todos estes são idéias sensacionais, mas **não resolvem o problema realmente**. Porque não? Todas estas idéias são **paliativos**, porque you nunca está atacando o real problema, com o tempo, ele irá aparecer novamente.


## REAL-TIME WEB - CONCEITOS

Angular é utilizado em vários apps, incluindo apps que trabalham com tempo real, seja usando web socket ou tree way data binding (com Firebase, por exemplo). Mas antes de tudo isso vamos conhecer alguns aspectos mais teóricos, certo?

Quando o usuário acessa sua aplicação e os dados são atualizados em uma velocidade <= 100 milisegundos: isto sim é o que conhecemos como tempo real.


Atualmente tempo real não existe. O que existe é um tipo de "truque", já que o nosso cérebro não consegue processar tudo o que acontece neste período de tempo. Por causa disso ele entende que tudo acontece em tempo real.


Two-way data binding ajuda bastante nesta tarefa, já que no Angular ele é baseado no [princípio de Hollywood][hollywood-principle].

> Devs não precisam entender como funciona o Two-way data binding por debaixo dos panos, inicialmente.


Sim, isto é verdade, mas quando você tem uma aplicação com muitos bindings todos os tipos de truques são bem vindos, como:

### **Minimize bindings e watchers**

Sempre que puder, minimize bindings e watchers, tente utilizar `Object.freeze` ([dê uma olhada nesta comparação entre `Object.freeze`, `Object.seal` e Json object com comportamento padrão no jsperf][jsperf-object-freeze])

### **ng-if ao invés de ng-show**

Use ng-if ao invés de ng-show sempre que puder, já que o  ng-show manipula o atributo `display`do elemento, but o mesmo já existe no DOM e o two-way data binding já está ativo, o que impacta na performance.

```html
<div ng-if="!vm.usingOneTimeBinding">
  <p>
    Makes more sense
  </p>
</div>

<div ng-show="!vm.usingOneTimeBinding">
  <p>
    Please, avoid this approach
  </p>
</div>
```


### **$filter + two-way data binding === não, por favor!**

Manipule os dados uma única vez e ao invés de utilizar o service $filter no template;

```javascript
...
this.users = [
  {firstName: 'eu', lastName: 'ea'},
  {firstName: 'William', lastName: 'Wallace'}
];
...
```
Baseado nestes dados, ao invés de utilizar um $filter no template HTML...

```html
...
<div ng-repeat="item in vm.users">
  {{ item | username }}
</div>
...
```

... com isso os efeitos na performance são bem consideráveis quando você faz o tratamento antes...

![Quando você usa o filter no template](/assets/images/using-filters-in-template.png)

... ao invés disso, manipule a stream de dados no controller/service/etc, passando os dados com o seu formato final esperado para somente serem renderizados no template. Neste exemplo usamos a função `.map()` do javascript para isso.

```javascript
...
this.users.map(function(el){
  el.username = el.firstName + ' ' + el.lastName;
});
...
```

```html
...
<div ng-repeat="item in vm.users">
  {{ item.username }}
</div>
...
```

### **ngRepeat + Track by**

Track by em elementos são sempre bem vindos! `ngRepeat` é mais performático quando utiliza algo para indexar os elementos.

```html

<!-- sem track by -->
<div ng-repeat="item in vm.users">
  {{ item.username }}
</div>

<!-- com track by -->
<div ng-repeat="item in vm.users track by $index">
  {{ item.username }}
</div>

```
Em um simples exemplo com e sem a utilização do `ngRepeat + Track by` os resultados são bem expressivos (Baseado em uma lista com 10 elementos somente. Imagine então em uma lista com mais elementos).

![Comparação do template com ngRepeat e track by](/assets/images/ng-repeat-track-by-comparison.png)



### **One-time-binding usage**

Use one-time-binding sempre que puder, seu app e os usuários ficarão eternamente gratos!

```html
<div ng-repeat="item in ::vm.users track by $index" >
  {{ ::item.username }}
</div>

<div ng-if="::vm.users.loggedIn">
  ...
</div>

<div ng-class="::{ 'my-awesome-class': vm.users.loggedIn}">
  ...
</div>
```

### Use async patterns

Em qualquer app que usa ou é baseado em javascript, é sempre bom o uso de patterns assíncronos. Patterns como `debounce` são muito fáceis de serem implementados e adicionados graças a diretiva `ngModelOptions`. Esta diretiva habilita patterns assíncronos, dando mais poder ao seu app.

Debounce é um pattern utilizado para verificar quantas vezes o evento/método foi chamado em sua aplicação. Um exemplo de como utilizá-lo é pensarmos em uma simples de busca em uma lista de itens.

```html
<form autocomplete="off" role="form">
  <div class="form-group">
    <fieldset>
      <input type="search" name="search" id="search" placeholder="Search..." ng-model="vm.searchItem" class="form-control" />
    </fieldset>
  </div>
</form>
<ul>
  <li ng-repeat="item in vm.users | myFilter:vm.searchItem">
    {{item.firstName}}
  </li>
</ul>
```

Neste exemplo a busca será chamada cada vez que o usuário adicionar ou remover um caracter no campo de busca do formulário. Mas isso não é uma boa idéia, então vamos dar uma olhada agora e ver como ficaria este exemplo usando `debounce`.

```javascript
...
this.myModelOptions = {
  updateOn: 'keydown blur',
  debounce: {
      keydown: 250, //for search we don't want to update server during user type
      blur: 250 //when user move on to the next field, we update immediately
  }
};
...
```

```html
<form autocomplete="off" role="form">
  <div class="form-group">
    <fieldset>
      <input type="search" name="search" id="search" placeholder="Search..." ng-model="vm.searchItem" class="form-control" ng-model-options="vm.myModelOptions" />
    </fieldset>
  </div>
</form>
<ul>
  <li ng-repeat="item in vm.users | myFilter:vm.searchItem">
    {{item.firstName}}
  </li>
</ul>
```

Desta forma o evento/método de busca será disparado somente após 250 milisegundos do evento de `keydown` ou `blur` serem acionados. O número que foi impresso no DevTools é baseado na inserção de somente 3 caracteres no formulário de busca.

![Comparação: busca utilizando Debounce e busca padrão](/assets/images/debounce-comparison.png)

Para o patter `memoization`, a abordagem de utilização do `$provide.decorator()` é uma tática excelente, já que ele modifica o comportamente padrão de componentes angular, melhorando e habilitando cache por padrão ou outras possibilidades, por exemplo.

```javascript
// Creating a new module for enable cache by default
angular.module('perf.rootScope', [])
  // $rootScope modified
  .decorate('$rootScope', function($delegate){
    $delegate.__proto__.$watch = function() {
      ...
    };

    $delegate.__proto__.$apply = function() {
      ...
    };

    return $delegate;
  });

...
angular.module('myApp', 'perf.rootScope']);
```


## CONCLUSÃO

Neste primeiro post falamos sobre conceitos de Tempo Real e alguns aspectos sobre micro tunagens mais simples, como boas práticas sobre como utilizar componentes do core do angular, otimizações Javascript e padrões (funcionais e assíncronos). No próximo post vamos falar sobre outros conceitos como estrutura de dados imutáveis, como utilizá-lo em seu app, bibliotecas que podem nos ajudar nesta etapa.

Você utiliza este ou outros métodos? Comente e compartilhe a sua experiência aqui.

Obrigado e até mais!

Links:

* Princípio de Hollywood: [http://en.wikipedia.org/wiki/Hollywood_principle][hollywood-principle]
* JsPerf: Object.freeze, Object.seal and object with default behaviour: [http://jsperf.com/freeze-vs-seal-vs-normal/19][jsperf-object-freeze]

[hollywood-principle]:http://en.wikipedia.org/wiki/Hollywood_principle
[jsperf-object-freeze]: http://jsperf.com/freeze-vs-seal-vs-normal/19
