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

Quem acompanha as iniciativas que o AngularJs vem tendo desde o nascimento do projeto sabe o quanto o grupo é empenhado para com o projeto. Desde seu [primeiro commit no repositório oficial do Github feito em XX de XX de XXXX][link-first-commit-angular-js]  até então é notória a evolução do projeto para que atenda a todos os requisitos possíveis. Isto é bastante motivador, pois percebe-se o quanto o projeto é ativo e que houve uma aceitação por parte da comunidade.

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

Outra novidade: para diretivas que utilizam vários eventos, por exemplo, houve uma otimização no algoritmo que manipulações de DOM.

