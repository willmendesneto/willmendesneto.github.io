---
layout: post
title: AngularJS: Sobre $filter
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

Desta vez uma postagem bem simples e rápida. Vamos falar um pouco sobre o conceito de filtros e como é o fluxo da interface de `$filter` no AngularJS.

O conceito de filtros é algo bem bacana que o framework já traz no seu core. Isso facilita horrores, pois a interface fornecida pelo AngularJS pode ser utilizada em todos os locais de sua aplicação, sejam elas templates html, services, directives, controllers, etc.



## DESIGN PATTERN

Quer dizer então que você utilizada o `$filter` e não entendeu sobre como foi criado? Alguns padrões de projetos são implementados no angularjs, alguns não tão conhecidos e o filter utiliza um deles que é o [Pipe-and-Filter][pipe-filter-pattern]

imagem - Yes, we can!



Espero que tenham gostado e até mais!

Links:

* Proposta de estruturação das aplicações: [https://github.com/yeoman/generator-angular/issues/109][angularjs-structure-yeoman-issue]
* Pipe-and-filter pattern: [http://webcem01.cem.itesm.mx:8005/apps/s200911/tc3003/notes_pipes_and_filters/][pipe-filter-pattern]
