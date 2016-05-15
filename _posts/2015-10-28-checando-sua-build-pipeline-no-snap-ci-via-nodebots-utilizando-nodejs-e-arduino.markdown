---
layout: post
title: "Checando sua build pipeline no Snap-CI via NodeBots utilizando NodeJS e Arduino"
categories: frontend nodebots nodejs
tags: nodebots arduino nodejs
status: publish
image: http://london.nodebots.io/images/robot.jpg
type: post
published: true
meta: {}
author:
---

<a class="page-link" href="{{ '/2016/05/15/checking-your-build-in-snap-ci-via-nodebots-using-nodejs-and-arduino' | prepend: site.baseurl | replace: '//', '/' }}">Veja a versão em inglês</a>

# Introdução

A idéia desta postagem é compartilhar alguns conceitos básicos sobre a utilização de open hardware manipulando-o a partir do Javascript.

Sempre que começamos o contato com o [Arduino][arduino], por exemplo, fazemos o exemplo de piscas as leds, comumento conhecido como blink. Neste exemplo mostrarei uma forma mais atrativa de abordar este exemplo para o nosso cotidiano, baseado em modelos como Hubot e Retaliation para checarmos a nossa build pipeline e averiguarmos a saúde de nossa aplicação utilizando [Arduino][arduino] + NodeJS + [Johnny-Five][johnny-five] em uma introdução a [NodeBots][nodebots].


# Build pipeline

Em algumas apresentações percebi que este termo não é conhecido por muitas pessoas, mesmo as que são mais familiarizadas com abordagens como integração contínua e entrega contínua. Build pipeline é um conceito que foi construído em meados de 2005 e é baseado na idéia de paralelização de tarefas, separando cada etapa em pequenos critérios de aceitação para a aplicação. Vale lembrar que esses passos podem automáticos ou manuais.

Um exemplo de um serviço gratuito que utiliza este conceito é o [Snap-CI][snap-ci], que te dá várias facilidades, suporte a outras linguagens, deploy em diversas plataformas, dentre outras funcionalidades bem bacanas.

Para este exemplo de nosso build-checker criei um projeto de exemplo no github e o integrei no nosso [Snap-CI][snap-ci]. Após as configurações iniciais (uma das coisas bacanas no projeto é que ele tem um guia bem bacana e simples) podemos verificar o nosso build mais atual a partir da aba de notificações. Você


# NodeBots

NodeBots é um conceito que une a linguagem de programação Javascript e robótica. Isso foi possível graças ao surgimento do NodeJS, que possibilita a utilização do Javascript em outros ambientes além dos navegadores (como em geladeiras, micro controladores e outras opções) e o pacote node-serialport, criado por Chris Williams, permitindo que os desenvolvedores controlassem hardware a partir da utilização do javascript.


# Arduino

[Arduino][arduino] é uma plataforma open-source baseada em hardware e software de fácil utilização. Com isso qualquer um pode construir interações utilizando-o em projetos dos mais diversos. Até podendo evoluir aos seu bel prazer, já que o projeto é de código aberto.

Dentre as suas vantagens encontramos:

- Custo: o valor de um arduino é menor do que $50
- Cross-platform: Arduino é uma plataforma open-source
compatível com todos os sistemas operacionais;
- Simples: Não exige de quem vai manipulá-lo um vasto conhecimento em eletrônica. Basta ter uma noção básica de desenvolvimento e você já pode fazer coisas bem bacanas;

Baseado nestas características, vamos ao que interessa o nosso projeto de introdução a [NodeBots][nodebots] com a ferramenta [build-checker][build-checker].


# Build checker: o projeto

O projeto foi baseado no CCmenu, projeto criado pelo ThoughtWorker Erik Doernenburg para checar e mostrar o
status de um determinado projeto em um servidor de integração contínua.

No nosso caso passamos a idéia para algo físico, utilizando open hardware e NodeJS. Nossa aplicação consumirá um XML com as informações retornadas pelo [Snap-CI][snap-ci]. A partir destes dados checaremos o estado atual da aplicação e o retornaremos utilizando alguns artifícios como Arduino e Led's para avisar ao nosso time de que algo de errado aconteceu com o nosso build e devemos corrigir o quanto antes.

Primeiramente precisamos instalar o NodeJS em nossa máquina. Sua instalação é muito simples e pode ser feita seguindo as instruções contidas no próprio site do projeto.

O nosso próximo passo é a instalação do Arduino IDE. Após instalado, vamos nas opções > Arquivos > Exemplos > StandardFirmata.

![Abrindo opções de exemplo no Arduino IDE](/assets/images/open-firmata-example.png)

Com o Arduino plugado no nosso computador rodamos o código a seguir e aguardamos a mensagem da IDE de que tudo ocorreu com sucesso.

![Tudo ok. Firmata rodando](/assets/images/upload-firmata-example.png)

Agora vamos ao nosso build checker. Para isso utilizaremos o pacote NodeJs [Johnny-Five][johnny-five]. O código é bem simples.

{% gist willmendesneto/b5f92a932ec3b7ffadd0 %}

Como vocês podem ver a interface do Johnny-Five é bem intuitiva. Ele possui o evento `board.on('ready')` que é similar ao evento `$(document).ready()` do jQuery. Quando todo o ambiente está preparado, iniciamos com base no conteúdo desta função.

Agora basta plugarmos 2 leds: 1 vermelha (para sinalizar o build quebrado) e 1 verde (para sinalizar o build sem problemas). Colocamos o build de sucesso na porta de número 12 + uma porta GND do nosso Arduino e o build de erro na porta de número 10 + uma porta GND do nosso Arduino, como podem ver na imagem.

![Conectando o Arduino: portas e LEDS](/assets/images/connecting-arduino-leds.png)

A partir daí criamos uma requisição para pegar o conteúdo via GET no [SNAP-CI][snap-ci], o nosso serviço de integração contínua. O SNAP-CI utiliza um conceito de build pipeline que é bem interessante e um dos prós dele é o de feedbacks mais rápidos (dando a possibilidade de paralelismo ou não) e definição de etapas para o build total. [Para maiores informações sobre Build Pipeline recomendo esta leitura][build-pipeline].

Vamos no site do SNAP-CI, efetuamos o login (caso não tenha cadastro você terá que criar um, mas é bem rápido =) ) e cadastramos um projeto.

![SNAP-CI "Adicionar novo Repositório"](/assets/images/snap-ci-setup-repo.png)

![Adicionando Repositório para integração](/assets/images/snap-ci-choosing-repo.png)

Ao cadastrar o projeto ele vai aparecer na parte superior, à direita, um campo com o nome "CCTray" que, ao clicarmos, direciona para o arquivo XML com as informações do build.

![SNAP-CI: Alerta CCTray](/assets/images/snap-ci-cctray.png)

São estas informações que serão consultadas pelo nosso build-checker.

![Arquivo "cctray.xml" com as informações do BUILD](/assets/images/snap-ci-build-xml.png)

Ele consultará os dados em um intervalo de 500 milisegundos previamente configurado e verifica o estado atual do build, baseado nas informações de todas as pipelines. Caso não haja a palavra "Success" no response da requisição, algo de errado aconteceu e o nosso build-checker irá acender a luz vermelha, caso contrário a luz verde continua acesa, sinalizando que está tudo ok.

Para conferirmos o resultado final, basta rodarmos os comandos

```bash
$ npm install # instala todas as dependências do projeto
$ node index.js # roda o código do build checker
```

Caso queiram saber mais sobre o projeto, [cliquem aqui e o projeto Build-Checker no github][build-checker]. O código é open-source, então sintam-se à vontade para feedbacks, sugestões e críticas construtivas. Lembrando também que estrelas no github são sempre bem vindas também!

Este projeto foi baseado no projeto [Relatiation][retaliation], feito pelo pessoal do Github para verificar a situação do build no Jenkins e dar um feedback ao time. Fica a dica deste vídeo bem simples e bacana mostrando como o Retaliation funciona.

[![Retaliation](http://img.youtube.com/vi/1EGk2rvZe8A/0.jpg)](https://www.youtube.com/watch?v=1EGk2rvZe8A)


# Conclusão

Este é um projeto bem introdutório do poder nos [NodeBots][nodebots], utilizando um dos exemplos mais simples para introdução ao Arduino, que é o código que faz com que uma led pisque (caso tenha interesse em ver como este código funciona, pesquise por "blink"). Este exemplo de led piscando é algo totalmente didático, mas ao utilizarmos NodeJS percebemos todo o poder que temos para aliar vários conceitos juntamente a um dos exemplos mais clássicos do Arduino. A partir daí é com você.

E aí? O que você tem feito com [NodeBots][nodebots], Javascript e/ou Arduino? Compartilhe sua experiência!

Links:

* Build Checker: [http://github.com/willmendesneto/build-checker][build-checker]
* Johnny-Five: [http://johnny-five.io/][johnny-five]
* SNAP-CI: [https://snap-ci.com/][snap-ci]
* Arduino: [https://www.arduino.cc/][arduino]
* NodeBots: [http://nodebots.io/][nodebots]
* Build Pipeline: [http://www.martinfowler.com/articles/continuousIntegration.html][build-pipeline]
* Retaliation: [https://www.youtube.com/watch?v=1EGk2rvZe8A][retaliation]


[build-checker]:https://github.com/willmendesneto/build-checker
[johnny-five]:https://johnny-five.io/
[snap-ci]:https://snap-ci.com/
[arduino]:https://www.arduino.cc/
[nodebots]:https://nodebots.io/
[build-pipeline]:http://www.martinfowler.com/articles/continuousIntegration.html
[retaliation]:https://www.youtube.com/watch?v=1EGk2rvZe8A
