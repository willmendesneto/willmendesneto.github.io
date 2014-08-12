---
layout: post
title: Nodist usando NVM no Windows
categories: javascript nodejs architecture tools
tags: javascript nodejs management version control frontend
status: publish
image: http://udgwebdev.com/images/nodejs-logo.jpg
type: post
published: true
meta: {}
author:
---

## INTRODUÇÃO

Todo desenvolvedor (normalmente) no seu primeiro contato com o [NodeJS][nodejs] pensa inicialmente em instalar o NodeJS diretamente em seu computador ou até mesmo via uma máquina virtual. Mas ao tempo de que vamos nos aprofundando um pouco mais no mundo "javascript server-side", temos uma real necessidade de utilizar/verificar/testar/whatever uma aplicação usando versões diferentes do Nodejs.

## INSTALAÇÃO E UTILIZAÇÃO

No Linux (ou outros Sistemas Operacionais baseados em UNIX) podemos utilizar o [Node Version Management - NVM][nvm], mas e para quem utiliza o Windows? Utilizei algumas soluções como o nvmw, mas a que mais me adaptei foi o [Nodist][nodist], uma solução criada por Marcel Klehr e que tem sua instalação bem simples.

Inicialmente iremos no repositório do projeto [Nodist][nodist] e faremos um clone do projeto (lembrando que caso já tenha o NodeJS instalado no seu Windows, desinstale-o antes). A partir daí insira a pasta "nodist/bin" na sua variável de ambiente PATH no Windows para que possa utilizar o nodist normalmente via linha de comando. Caso queira saber mais sobre como incrementar seu ambiente CLI no Windows, dê uma olhada no [post que fala como utilizar o Console2 + Git Bash][console2-gitbash] e siga os passos. Bastante simples, mas ajuda bastante.

Após isto, basta rodar o comando `nodist update`, aguarde até o final e pronto.

* Esta postagem é bem curta, mas acredito que é importante para alguns devs que utilizam Nodejs em ambiente Windows. Não abordei outras formas de instalação do Nodist, pois o [README.md do projeto][nodist-readme] tem todo o processo detalhado, mostrando inclusive sua instalação via [Chocolatey][chocolatey]. Todo desenvolvedor tem de ser curioso, acima de tudo ;)

Links:

* Nodejs: [http://nodejs.org/][nodejs]
* NVM: [https://github.com/creationix/nvm][nvm]
* Nodist: [https://github.com/marcelklehr/nodist][nodist]
* Chocolatey: [http://chocolatey.org/][chocolatey]

[nodejs]:http://nodejs.org/
[nvm]:https://github.com/creationix/nvm
[nodist]:https://github.com/marcelklehr/nodist
[console2-gitbash]:http://willmendesneto.github.io/2013/07/31/usando-abas-na-linha-de-comando-do-windows/
[chocolatey]:http://chocolatey.org/
[nodist-readme]:https://github.com/marcelklehr/nodist/blob/master/README.md
