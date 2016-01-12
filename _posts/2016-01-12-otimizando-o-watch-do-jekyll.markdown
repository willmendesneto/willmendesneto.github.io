---
layout: post
title: "Otimizando o watch do jekyll"
categories: otimização ruby
tags: jekyll otimização
status: publish
type: post
published: true
meta: {}
author:
---

Este post é bem simples, mas crucial para melhorar o seu trabalho, além de ser o primeiro post do ano, claro =).

# Introdução

O [Jekyll][jekyll] é um gerador que transforma seus arquivos markdown em websites e/ou blogs baseado em arquivos estáticos. Mas quando seu projeto possui uma massa de dados (neste caso, arquivos markdown) relativamente grande percebe-se o tempo de compilação de mardown para páginas estáticas pode ser um problema.


# O comando serve

O comando `jekyll <serve|server|s>` é a base de tudo. A partir dele é possível rodar o servidor local do Jekyll para que possamos visualizar o conteúdo criado. Ele aceita alguns atributos (para visualizar lista completa basta dar uma olhada no output do comando `jekyll --help`). Um deles, o `--limit_posts` é bem interessante, pois nele podemos limitar a quantidade de posts a serem renderizados pelo comando `server`.

```bash
$ jekyll serve -w --limit_posts <number-of-posts>
```

Sendo que o `<number-of-posts>` é o número que para você é necessário para validar o layout e o conteúdo. Pode ser 1, 10, 20 e assim sucessivamente. Isso é bem bacana, pois podemos otimizar o feedback de nossas alterações/atualizações.

# Conclusão


Esta dica apesar de simples pode ser extremamente útil, pois ter um feedback mais rápido do seu código quer dizer também em otimização no seu workflow. E no caso de estar trabalhando com um projeto com mais de 1.000 arquivos markdown a compilação em ambiente de desenvolvimento pode ser algo realmente impactante.

E aí? Vocês tem outras dicas para otimização do Jekyll? Qual a sua? Compartilhe sua experiência!

Links:

- Jekyll: [https://jekyllrb.com/][jekyll]

[jekyll]:https://jekyllrb.com/
