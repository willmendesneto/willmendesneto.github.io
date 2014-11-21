---
layout: post
title: Novidades do AngularJS 1.3
categories: angularjs javascript architecture
tags: javascript angularjs frameworks frontend
status: publish
image: https://pbs.twimg.com/profile_images/2149314222/square.png
type: post
published: true
meta: { keywords: "javascript angularjs frameworks frontend"}
author: Wilson Mendes Neto
---

## INTRODUÇÃO

Quem acompanha as iniciativas que o AngularJs vem tendo desde o nascimento do projeto sabe o quanto o grupo é empenhado para com o projeto. Desde seu primeiro commit no repositório oficial do Github até então é notória a evolução do projeto para que atenda a todos os requisitos possíveis. Isto é bastante motivador, pois percebe-se o quanto o projeto é ativo e que houve uma aceitação por parte da comunidade.

Para que toda a comunidade saiba sobre os rumos do projeto existe alguns repositórios de documentos com as [decisões arquiteturais do projeto no Google Drive][link-architecture-angular-js] que estão disponíveis a todos.

Existe também um processo rigoroso de envios de alterações, correções e novas features também. Você precisa estar cadastrado em uma lista específica de mantenedores do projeto. Esta inscrição é feita via Google Docs e é bem simples. Com as alterações/correções feitas no projeto e com elas testadas (sim, tenho certeza que vocês utilizam testes para o desenvolvimento de seus apps, mas é sempre bom frisar este ponto) existem mais algumas regras quanto ao formato do commit, com a utilização de prefixos com base no que foi feito (docs, feat, etc). O último teste é baseado em testes automatizados feitos com uma lista de browsers distintos em sistemas operacionais distintos.

O processo parece um pouco burocrático, mas realmente não é. Pense em um projeto utilizado por milhares de aplicações. Com certeza entenderão o porquê da preocupação com o codebase do projeto.

Este processo está sempre em evolução na construção do framework e muita coisa já foi alterada para facilitar e melhorar este fluxo.

## O MARCO: MUDANÇA DE VERSÃO E NG-EUROPE

Semana passada ( mais especificamente no dia XX de XX de XXXX) foi lançada a tão esperada versão 1.3 do AngularJS trazendo grandes novidades. Listarei algumas delas neste post.

### Performance

Um dos pontos que mais se pesava quanto a performance do AngularJS era o seu conceito de dirty checking. Foram criados vários módulos para otimizar o two-way data binding e até mesmo removê-lo de componentes, locais e blocos que não o utilizassem, como tabelas renderizadas com informações que não serão alteradas, por exemplo.

Uma das grandes novidades é o one-way time binding que outros módulos externos simulavam como algo padrão do core do framework. Sua sintaxe é bem simples.

{{:: valor }}

Outra novidade: para diretivas que utilizam vários eventos, por exemplo, houve uma otimização no algoritmo que manipulações de DOM. Existem propostas para simu







dados da ng-europe
- Mais de 1600 aplicações utilizando angularjs
- Mais de 1000 contribuidores ativos

AngularJs 1.3

Melhorias de Performance

- One way time binding de maneira mais simples (adeus bindonce?);
- Otimização de Manipulações do DOM. Otimização no algoritmo. Existe propostas para dom virtual, similar ao conceito utilizado pelo ReactJS;
- Dirty check otimizada, $observers, etc. Checagem mais concisa == performática. Lembrando que a idéia é a utilização do patter Observer do ES6, mas como nem o traceur resolve ainda, esperemos coisa boa por aí;
- Uso de memória reduzido. Com todas estas medidas, dentre várias outras otimizações o consumo de memória foi bastante reduzido;
- Criado novo método $watchGroup para otimizar uma série de observações em cima de determinado model com base em expressões;
- Models com gatilhos (triggers) personalizados;
- $compile agora aceitando svg e mathml com tipos de propriedades específicos;
- Quer remover dados de um elemento? use o element.remove()

Formulários
- Validações mais flexíveis, dando maiores possibilidades aos desenvolvedores;
- Utilização do pattern debounce nos campos do formulário para as diretivas ng-model. POR PADRÃO (antes era necessário alguns workarounds para conseguirmos este efeito);
- Erro reporting (lo/). Se você usava o toastr, alerts estilizados ou outras soluções, dêem uma olhada no novo módulo "ngMessages";
- Suporte aos campos date, time, datetime-local, month e week

Novo módulo: ngAria;

- Módulo gera as arias da aplicação automaticamente, implementando uma web para todos e com foco em acessibilidade. Maiores opções para a leitura de informações dos leitores de tela, otimizando a sua manipulação em dispositivos assistivos;
- Facilidades para criar projetos acessíveis a todos REALMENTE;
- Citar o post de Ciro Nunes;

Material Design

- O novo Bootstrap? Não! Um novo mundo à parte ;)
- Novas especificações sobre interfaces (UI) com widgets, layouts, animações, interações e outros artifícios;
- E para o angular? Angular Material !!!

Mobile
- Ionic para mobile usando AngularJS: integração com Cordova e CLI de maneira simplificada;
- Solução? Ionic e Famo.us combinados!
- ngTouch: a solução para remoção de eventos de mouse na sua aplicação;


Adeus IE. Foi bom enquanto durou #SQN

- Manter o suporte ao Internet Explorer 8 aumentava o codebase do Angular consideravelmente. A partir da versão 1.3 o suporte é igual e/ou acima a versão 9 do navegador internet Explorer.



Links:

- Migração do 1.2 para o 1.3: Guia oficial: [https://docs.angularjs.org/guide/migration][angularjs-migration]
- decisões arquiteturais do projeto no Google Drive: [https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub][link-architecture-angular-js]



[angularjs-migration]:https://docs.angularjs.org/guide/migration
[link-architecture-angular-js]:https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub
