---
layout: post
title: AngularJS Sobre filter
categories: javascript angularjs frontend frameworks architecture
tags: javascript angularjs management version control frontend
status: publish
image: http://i1098.photobucket.com/albums/g379/farazi482/AngularJS-filters.png
type: post
published: true
meta: {}
author:
---

<a class="page-link" href="{{ '/2014/12/14/angular-js-about-filter/' | prepend: site.baseurl | replace: '//', '/' }}">Veja a versão em inglês</a>


## INTRODUÇÃO

Desta vez uma postagem bem simples e rápida. Tenho um envolvimento bem bacana, participando de grupos locais e nacionais. Dentre estes grupos sou um dos organizers do [GDG - Google Developers Group Salvador][gdg-salvador-link] o qual fortaleceu meu envolvimento com várias tecnologias, mas atualmente curto bastante frontend e atuo diretamente em projetos que utilizam, dentre outras tecnologias, o framework AngularJS.

Neste processo percebo que várias pessoas possuem dúvidas distintas sobre algum aspecto do framework, seja conceitual ou prático, dos componentes fornecidos pelo AngularJS. E foi por isso que pensei em criar uma série de posts abordando alguns destes pontos pelo simples motivo:

> "Conhecimento bom é conhecimento compartilhado"

Neste post vamos falar um pouco sobre o conceito de filtros e como é o fluxo da interface de `$filter` no AngularJS. Claro, este é o primeiro, mas a idéia não é torná-lo algo [como o Building your own AngularJS ][building-angularjs] (nem tenho esta pretensão), mas algo que passe alguns fundamentos e dicas que possam valer a pena inicialmente ou mostrar alguns aspectos que não conhecia.



## SOBRE

O conceito de filtros é algo bem bacana que o framework já traz no seu core. Isso facilita horrores, pois a interface fornecida pelo AngularJS pode ser utilizada em todos os locais de sua aplicação, sejam elas templates html, services, directives, controllers, etc. Por padrão já podemos utilizar alguns filtros previamente criados, como:

- `currency`: para valores. Formata um número para o formato de moeda. Quando nenhum símbolo é fornecido, utiliza o símbolo padrão para o local como padrão;
- `date`: para formatação de datas. Com base no parâmetro passado pode retornar uma data em um formato específico;
- `filter`: filtro padrão para buscas em string, objetos JSON ou ArrayObjects;
- `json`: para transformarmos um valor em json. utilizado para transformar objetos Javascript em uma string Json;
- `limitTo`: Cria uma nova matriz/string com um número de elementos determinado previamente. Os elementos são retirados do início ou do fim da matriz de origem, número ou cadeia de caracteres, especificados pelo valor e sinal (positivo ou negativo para verificação de ordem). Se um número é usado como entrada, ele é convertido para uma string.
- `lowercase`: Conversão para caracteres minúsculos;
- `number`: Formatação de números;
- `orderBy`: Ordena em ordem alfabética ou numerica. Em caso de números vale observar se eles estão realmente sendo salvos como números e não strings, pois isto pode afetar na ordenação;
- `uppercase`: Conversão para caracteres maiúsculos;

Quando utilizado no template html, o filter aceita algumas verificações, como:

- `+`: Soma ou concatena. Utiliza o método `additive`;
- `-`: Diminui. Utiliza o método `additive`;
- `*`: Multiplica. Utiliza o método `multiplicative`;
- `/` : Divide. Utiliza o método `multiplicative`;
- `%`: Retorna o resto da divisão. Utiliza o método `multiplicative`;
- `===`: Compara com verificação de tipagem. Utiliza o método `equality`;
- `!==`: Compara com verificação de tipagem. Utiliza o método `equality`;
- `==`: Compara sem verificação de tipagem. Utiliza o método `equality`;
- `!=`: Compara sem verificação de tipagem. Utiliza o método `equality`;
- `<`: Menor que. Utiliza o método `relational`;
- `>`: Maior que. Utiliza o método `relational`;
- `<=`: Menor ou igual. Utiliza o método `relational`;
- `>=`: Maior ou igual. Utiliza o método `relational`;
- `&&`: AND. Utiliza o método `logicalAND`;
- `||`: OR. Utiliza o método `logicalOR`;
- `!`: Altera o valor (força o valor para o tipo boolean). Utiliza o método `unary`;
- `=`: Atribui o valor do segundo ao primeiro. Utiliza o método `assignment`;
- `|`: Retorna o boolean `true`;

Todos estes operadores estão configurados na variável `OPERATORS`. Caso queira saber mais sobre Operadores de comparação, o próprio Angular referencia a [documentação do MDN "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators"][mdn-comparison-operators]


E escapa alguns caracteres especiais, como:

- `\n`;
- `\f`;
- `\r`;
- `\t`;
- `\v`;
- `'`;
- `"`;

Todos estes caracteres especiais estão configurados na variável `ESCAPE`. Caso queira saber mais basta darem uma olhada no código final do AngularJS e buscarem por esta variável.

## ARQUITETURA E DESIGN PATTERN

Alguns padrões de projetos são implementados no angularjs, alguns não tão conhecidos. Conceitualmente falando, um filtro recebe um fluxo (stream de dados) como entrada e produz um fluxo de caracteres como saída. Além disso os filtros podem ser parametrizados. Definição oficial para filtros encontrada no site oficial do AngularJS:

> "Selects a subset of items from array and returns it as a new array."

O conjunto particular de regras aqui aplicado define um estilo arquitetural conhecido como [Pipe-and-Filter][pipe-filter-pattern]. O Pipe-and-filter é baseado no fluxo/stream de dados, tendo filtros que podem operar de forma concorrente ou não, ou seja, podem ou não aguardar o término do produtor para que o componente que consome a saída do produtor inicie o seu funcionamento.

No contexto desta arquitetura, um pipe (`|`) é uma forma de conectar dois filtros, onde a saída do primeiro filtro é conectada à entrada do segundo (o que acarretou no nome da arquitetura). Conhecendo os filtros e pipes utilizados pode-se facilmente compreender o seu funcionamento e/ou criar outros baseado em combinações.

Agora um exemplo simples utilizando múltiplos filtros combinados. De um determinado número dado queremos que ele retorne o seu valor como número romano. Pensando que temos 2 filtros já criados podemos fazer a seguinte combinação. No nosso template sua utilização ficaria da seguinte forma:

{% highlight html linenos %}

<tr>
    <!-- Returns "X" -->
    <td> { { '10' | returnOnlyNumbers | formatForRomanNumbers } }</td>
</tr>

{% endhighlight %}

Podemos verificar alguns métodos do Angular que demonstram o funcionamento desta arquitetura, como:

`filterChain`: Faz a chamada dos filtros combinados utilizando chainning methods, que é um tipo de fluent API e utiliza também o método `filter` internamente. Caso queiram saber mais sobre este conceito, [recomendo o artigo do Smashing Magazine "Designing Better JavaScript APIs"][fluent-api-smashing-magazine].

{% highlight javascript linenos %}

filterChain: function() {
    var left = this.expression();
    var token;
    while ((token = this.expect('|'))) {
      left = this.filter(left);
    }
    return left;
  },

{% endhighlight %}

`filter`: Método que trata todos os valores passados para o filter e retorna o valor final.

{% highlight javascript linenos %}

filter: function(inputFn) {
    var fn = this.$filter(this.consume().text);
    var argsFn;
    var args;

    if (this.peek(':')) {
      argsFn = [];
      args = []; // we can safely reuse the array
      while (this.expect(':')) {
        argsFn.push(this.expression());
      }
    }

    var inputs = [inputFn].concat(argsFn || []);

    return extend(function $parseFilter(self, locals) {
      var input = inputFn(self, locals);
      if (args) {
        args[0] = input;

        var i = argsFn.length;
        while (i--) {
          args[i + 1] = argsFn[i](self, locals);
        }

        return fn.apply(undefined, args);
      }

      return fn(input);
    }, {
      constant: !fn.$stateful && inputs.every(isConstant),
      inputs: !fn.$stateful && inputs
    });
  },

{% endhighlight %}

Sabendo que os filtros são apenas funções que transformam a entrada para uma saída solicitada. No entanto filtros precisam de uma injeção de dependências. Para isto uma definição de filtro é constituído por uma função factory (que já é fornecida internamente pelo AngularJS) com annotations de suas dependências e é aí que o `$filterProvider` se apresenta para nós a partir do método `$filterProvider.register()`.



## BOAS PRÁTICAS

Existem vários style guides sobre isso, mas vale lembrar que todos estão andando lado a lado com a documentação do Angular e feedbacks baseados em sua utilização em projetos.

Há pouco tempo foi abordado algo que funcionava, mas que não era o correto. Em uma das issues abertas no repositório do Github do AngularJS foi abordada um cenário no qual se utiliza o conceito de namespaces (pense no namespace do jQuery "my.awesome.namespace"). Este cenário era possível até a versão 1.3.2 do framework e além desta versão este formato não funcionava corretamente.

Esta issue levantou uma discussão bastante interessante, que foi finalizada com algo que era correto, mas que não constava na documentação dos filtros que é a de que não se deve utilizar caracteres especiais na definição do nome do filtro. Caso queira acompanhar mais informações sobre a discussão [vale a pena darem uma olhada na issue #10110 que aborda este tema][ng-filter-issue].

Caso utilize um $filter com dependência de outros filters  ou utilize um filter com strategy pattern é simples também, já que você terá que testar todos os filters e o parâmetros. Um exemplo de um filter com strategy pattern é este de datas. Sabemos que o $filter já possui um filtro de datas por padrão, mas em um app com suporte a multilinguagens, você poderia usar o seguinte formato:


{% highlight javascript linenos %}

angular.module('filters', [])
    // Chama os filtros
    .filter('strategyMoneyFilter', function ($filter) {
        return function (attribute) {
            return $filter('moneyFormat' + (attribute.country.toUpper() || 'BR'))(attribute.value);
        };
    })
    // Formato brasileiro
    .filter('moneyFormatBR', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    })
    // Formato estados unidos
    .filter('moneyFormatUS', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    })
    // Formato Europeu
    .filter('moneyFormatEU', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    });

{% endhighlight %}

Desta forma, somente com um parâmetro podemos utilizar o melhor de cada parâmetro e isto pode ser facilmente trabalhado no javascript, já que ao invés de if's o que definiria o formato de output do stream de dados é uma informação passada a seu filtro, informação esta que pode vir de uma base de dados, por exemplo!



## PERFORMANCE

Outro aspecto bacana é o de performance no seu app. Mas não abordarei questões como não utilizarem o two-way data binding em elementos que não possuirão nenhum tipo de interação/alteração ou questões mais básicas como minimizarmos o binds/watches.

O Filter pode ser utilizado em vários locais de sua aplicação, como Controllers, Services e até mesmo no próprio html. Porém devemos pensar bastante na melhor abordagem baseado em suas necessidades. Se a aplicação só vai possuir alguma interação com o $filter baseado em alguma interação do usuário (um click de botão, por exemplo) não existe o porque de deixarmos o filter em nosso template html. Poderíamos utilizar vinculado ao evento que é ativado na interação, por exemplo. Assim passaríamos os valores previamente tratados com o formato que esperamos e em qualquer interação na aplicação ele seria tratado somente em um ponto único da aplicação, sem falar que podemos utilizar uma melhor abordagem com abstrações de código para tal. O Angular trata a injeção de dependências de maneira transparente e devemos utilizá-lo da melhor forma possível.



## TESTES

A questão de testes é importante em sua aplicação por "N" fatores. Não abordarei o porquê dos testes em sua aplicação, mas caso queira se aprofundar aconselho [o conteúdo produzido para a Caelum por Maurício Aniche, referência no Brasil quando se fala em Testes de Software][links-tests]. Um formato de teste para filtros customizados é mostrado no [tutorial fornecido pelo site oficial do projeto][ng-tutorial-filter]. Neste tutorial temos o seguinte exemplo e seu código de testes, respectivamente. Com base nele podemos ter um norte de como testar os nossos filtros.

{% highlight javascript linenos %}

// phonecatFilters.js
angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

{% endhighlight %}

Com base no filtro customizado `phonecatFilter` previamente criado, agora vamos dar uma olhada no seu código de testes.

{% highlight javascript linenos %}

// phonecatFiltersTest.js
describe('filter', function() {

  beforeEach(module('phonecatFilters'));

  describe('checkmark', function() {
    it('should convert boolean values to unicode checkmark or cross', inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    }));
  });
});

{% endhighlight %}


## CONCLUSÃO

Com isto finalizo este post sobre filtros. Aprendemos alguns aspectos bacanas sobre arquitetura, patterns, boas práticas e performance quando utilizamos o $filter em uma aplicação AngularJS.

Espero que tenham gostado e que esta leitura tenha sido proveitosa para você. Vale lembrar que feedbacks são sempre bem vindos =)

Abraço e até mais!

Links:

* Proposta de estruturação das aplicações: [https://github.com/yeoman/generator-angular/issues/109][angularjs-structure-yeoman-issue]
* Pipe-and-filter pattern: [http://webcem01.cem.itesm.mx:8005/apps/s200911/tc3003/notes_pipes_and_filters/][pipe-filter-pattern]
* Building your own AngularJS: [http://teropa.info/build-your-own-angular][building-angularjs]
* Issue #10110 do AngularJS: [https://github.com/angular/angular.js/issues/10110][ng-filter-issue]
* Documentação do MDN: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators][mdn-comparison-operators]
* Testes: [http://tdd.caelum.com.br/][links-tests]
* Documentação [https://docs.angularjs.org/tutorial/step_09][ng-tutorial-filter]
* Smashing Magazine "Designing Better JavaScript APIs": [http://www.smashingmagazine.com/2012/10/09/designing-javascript-apis-usability/][fluent-api-smashing-magazine]


[gdg-salvador-link]: https://plus.google.com/109551746919819088573/posts
[angularjs-structure-yeoman-issue]: https://github.com/yeoman/generator-angular/issues/109
[pipe-filter-pattern]: http://webcem01.cem.itesm.mx:8005/apps/s200911/tc3003/notes_pipes_and_filters/
[building-angularjs]: http://teropa.info/build-your-own-angular
[ng-filter-issue]: https://github.com/angular/angular.js/issues/10110
[mdn-comparison-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
[links-tests]: http://tdd.caelum.com.br/
[ng-tutorial-filter]: https://docs.angularjs.org/tutorial/step_09
[fluent-api-smashing-magazine]: http://www.smashingmagazine.com/2012/10/09/designing-javascript-apis-usability/
