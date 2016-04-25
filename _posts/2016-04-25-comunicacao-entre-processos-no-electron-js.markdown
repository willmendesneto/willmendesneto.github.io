---
layout: post
title: "Comunicação entre processos no ElectronJS"
categories: desktop apps nodejs
tags: desktop apps nodejs
status: publish
type: post
published: true
meta: {}
author:
---


Fala galera. Este post é bem simples, apesar de focar alguns aspectos mais intermediários sobre o ElectronJS. Para quem não conhece é um framework para cross-platform desktop apps, com base nas tecnologias como NodeJS e Chromium.

> Caso tenha interesse em uma introdução ao ElectronJS, acesse ao post do Henrique Sosa no Tableless [Introdução ao Electron][electron-intro]

E neste momento você deve estar se perguntando: "Mas o que tem a ver o Electron com processos? Realmente tenho que saber sobre isso?". A resposta é sim, você precisa (felizmente ou infelizmente). Infelizmente a documentação do ElectronJS é realmente deficitária neste ponto, daí a idéia deste post.


# Sobre os Processos

Todo o ciclo de sua aplicação electron está baseada nos processos:

- main: O processo principal é aonde lida-se diretamente com A API electron, como Tray, BrowserWindow, etc. Nele você dará o `bootstrap` de sua aplicação com informações como tamanho da tela da aplicação, se existirá um menu com ícone integrado (Tray) além de outros opcionais. Para maiores detalhes acesse a [documentação do Electron][electron-docs].
- renderer: Camada onde a aplicação realmente estará ativa e possui acessos ao DOM e stylesheets, por exemplo;

Em alguns momentos você quer criar uma maior e melhor interação entre usuário e app, como por exemplo inserir algumas preferências para o usuário. Vamos pensar no seguinte cenário:

> O usuário pode ir na página de "Preferências" e escolher se o app poderá enviar notificações nativas para o usuário.

Se pensarmos de uma maneira técnica, devemos pensar em armazenar estas informações localmente e carregarmos no momento do carregamento do aplicativo. Para isso vamos usar um banco simples, como o [SQLite][sqlite] ou o [LowDB][lowdb]. Alguns pontos que você precisa saber são:

- A depender a sua opção de armazenamento de dados estas informações só poderão ser acessadas no momento que o processo de renderização iniciar;
- O DOM não pode ser acessado no processo principal, somente no de renderização;


# Conhecendo os IPC's

Para fazer esta comunicação entra em cena o [IPC Renderer][ipc-renderer] e o [IPC Main][ipc-main]. O IPC Main será utilizado no arquivo de bootstrap do aplicativo (configurado no `package.json` do seu app) e o IPC Renderer será utilizado no arquivo principal do da sua aplicação realmente dita (com os comportamentos, acesso ao DOM, etc). Todos os IPC's tem os mesmos eventos que são:

- .on(): cria o listener do evento;
- .send(): faz o trigger do evento previamente criado;

Então para isso o seu arquivo principal terá o seguinte código.

```javascript
import {ipcMain} from 'electron';
...
// Iniciando o evento que aguarda o trigger do `ipc-renderer`
ipcMain.on('app:updateAppWithConfigInformations', function(event, config){
  ...
  // Retorno de sucesso ou erro para o `ipc-renderer`
  // Neste exemplo sempre retornará com sucesso
  event.sender.send('app:updateAppWithConfigInformationsCallback', {success: true});
});

```

E no seu processo de renderização você acessa da seguinte maneira.

```javascript
import ipcRenderer from 'ipc-renderer';

...
// Acesso ao seu formato de armazenamento
ipc.send('app:updateAppWithConfigInformations', config);
...
// Listener para verificar se a operação no processo principal foi finalizada com sucesso
ipcRenderer.on('app:updateAppWithConfigInformationsCallback', function(event, response) {
  // Validação do retorno do processo principal
});
```


# Conclusão

Este exemplo é simples, lembrando o [comando PING entre o Redis Client e Redis Server][redis-ping]. Desta forma, você consegue adicionar várias outras integrações entre os processos da sua aplicação desktop. Como esta integração não é muito bem documentada pelo framework (infelizmente vários projetos open source sofrem deste mal), fica uma dica bem interessante de sua utilização com uma situação real.

E aí? Já utilizou esta comunicação entre processos antes? Qual foi a sua necessidade? Compartilhe sua experiência!

Links:

- Tableless - Introdução ao Electron: [http://tableless.com.br/introducao-ao-electron/][electron-intro]
- Documentação do ElectronJs: [http://electron.atom.io/docs/all/][electron-docs]
- LowDB: [http://typicode.github.io/lowdb/][lowdb]
- SQLite: [https://www.sqlite.org/][sqlite]
- ElectronJS - IPC Renderer: [http://electron.atom.io/docs/v0.33.0/api/ipc-renderer/][ipc-renderer]
- ElectronJS - IPC Main: [http://electron.atom.io/docs/v0.33.0/api/ipc-main-process/][ipc-main]
- Redis - Comando PING: [http://redis.io/commands/ping][redis-ping]

[electron-intro]:http://tableless.com.br/introducao-ao-electron/
[lowdb]:http://typicode.github.io/lowdb/
[sqlite]:https://www.sqlite.org/
[electron-docs]:http://electron.atom.io/docs/all/
[ipc-renderer]:http://electron.atom.io/docs/v0.33.0/api/ipc-renderer/
[ipc-main]:http://electron.atom.io/docs/v0.33.0/api/ipc-main-process/
[redis-ping]:http://redis.io/commands/ping
