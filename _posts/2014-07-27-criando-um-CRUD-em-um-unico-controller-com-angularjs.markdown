---
layout: post
title: Criando um CRUD em um único controller com AngularJS
categories: angularjs javascript crud architecture tools
tags: javascript angularjs frameworks frontend
status: publish
image: https://pbs.twimg.com/profile_images/2149314222/square.png
type: post
published: true
meta: {}
author:
---
## Criando um CRUD em um único controller com AngularJS

Para quem já trabalha com algumas linguagens backend e pode direcionar ações na rota do seu app baseado em métodos de controllers sabe o quanto isso pode ser interessante em alguns apps (fiz um Pull Request para o AngularJS para que esta feature fosse algo padrão no Framework, caso queiram saber mais sobre ou votar para que ela seja incorporada, dêem uma olhada neste link), mas, por ora, nenhum framework frontend (que eu conheça, claro) tem algo a este nível por padrão.

No entanto a maioria dos exemplos que vejo de coisas simples utilizam-se muitos controllers para operações, já que baseiam-se em operações por página, como o [angular-phonecat, o exemplo oficial que pode ser encontrado no site oficial do AngularJS][angular-phonecat].

Neste caso quer dizer que se eu tiver 3 operações, devo criar 3 controllers, um para cara página/view? Não!

![A vida é linda!](http://i.imgur.com/dAnMWxQ.gif "A vida é linda!")

Nosso exemplo será baseado em uma lista simples de contatos, como a lista de contatos do seu celular, por exemplo. Um conceito simples, mas de conhecimento geral. É muito comum atualizarmos o conteúdo de nossos contatos por vários motivos e estamos fazendo algo simples, mas funcional.

Nosso cadastro de contato vai aceitar as informações:

- Id, somente para nosso controle;
- Nome, sendo o nome obrigatório
- Endereço, sendo opcional
- Telefone, sendo obrigatório;

E teremos as 4 operações:

- Create:  Área para criação de um novo contato; Arquivo `new.html`
- Retrieve: terá a nossa listagem de contatos, com uma busca simples e o link para as outras opções como Editar, Adicionar e Excluir;
- Update: Área para atualizarmos os dados do nosso contato; Arquivo `edit.html`
- Delete: Opção para a exclusão do nosso contato; Como é algo relativamente simples, deixemos vinculado ao nosso arquivo `index.html`;

Afim de facilitar o nosso processo do exemplo, utilizaremos um banco utilizando o LocalStorage, ]um dos HTML5 WebStorage][webstorage-api]. Para isso criaremos uma abstração simples do processo. Utilizaremos criptografia no nosso Localstorage a partir da biblioteca [CryptoJS][cryptojs].


### INICIANDO NOSSO APP

Ok, vamos inicialmente criar os nossos arquivos principais:

`index.html`, onde serão linkados os nossos arquivos externos e servirá de template principal para a nossa aplicação.

{% highlight html %}

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
 <head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title></title>
   <meta name="description" content="">
   <script>document.write('<base href="' + document.location + '" />');</script>
   <meta name="viewport" content="width=device-width">

   <link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
   <link href="http://fonts.googleapis.com/css?family=Quicksand:400,700" rel="stylesheet" type="text/css">
   <link href="http://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type="text/css">
   <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">

   <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

   <!-- Onde ficarao a nossa estilização -->
   <link rel="stylesheet" href="main.css">
   <!-- -->

 </head>
 <body ng-app="plunkerApp">

   <!-- Add your site or application content here -->
   <div class="container" ng-view=""></div>

   <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>


   <script src="angular-route.js"></script>
   <script src="https://rawgit.com/willmendesneto/keepr/master/dist/keepr.js"></script>

   <!-- Onde ficarao as nossas rotas -->
   <script src="app.js"></script>
   <!-- -->

   <!-- Onde ficarao os nossos controllers -->
   <script src="controllers.js"></script>
   <!-- -->

   <!-- Onde ficarao as nossas diretivas -->
   <script src="directives.js"></script>
   <!-- -->

   <!-- Onde ficarao os nossos serviços -->
   <script src="services.js"></script>
   <!-- -->

</body>
</html>

{% endhighlight %}

`main.css`, onde ficará a estilização do nosso app


{% highlight css %}

[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
}

html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Quicksand', 'Helvetica Neue',Helvetica,Arial, sans-serif;
  font-size: 16px;
  background: #E7E7E7;
}

html,
body,
legend {
  color: #666;
}

iframe, object, embed {
  max-width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Montserrat', 'Helvetica Neue',Helvetica,Arial,sans-serif;
}


/* Everything but the jumbotron gets side spacing for mobile first views */
.header {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  border-bottom: 1px solid #e5e5e5;
  background: #FFF;

}
.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
  padding-bottom: 19px;
}

.animate-show {
  line-height:20px;
  opacity:1;
  padding:10px;
  border:1px solid black;
  background:white;
}

.animate-show.ng-hide-add.ng-hide-add-active,
.animate-show.ng-hide-remove.ng-hide-remove-active {
  -webkit-transition:all linear 0.5s;
  transition:all linear 0.5s;
}

.animate-show.ng-hide {
  line-height:0;
  opacity:0;
  padding:0 10px;
}

.btn,
.form-control {
  border-radius: 0;
}
.btn {
  font-size:10px;
}
.btn-add-contact{
  width: 100%;
  font-size: 24px !important;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 16px;
  margin-bottom: 16px;
  outline: 0;
  cursor: pointer;
  letter-spacing: 1px;
  -webkit-appearance: button;
  cursor: pointer;
}
.form-group[class*="col-lg-"] {
  padding-left: 0;
}

.no-padding-left,
.form-group.no-padding-left[class*="col-lg-"] {
  padding-left: 0;
}
.no-padding-right,
.form-group.no-padding-right[class*="col-lg-"] {
  padding-right: 0;
}

.table > thead > tr > th,
.table > tbody > tr > td {
  color: #336077;
}

.btn-success {
  background: #23A658;
}
.btn-primary {
  background: #2DA0D4;
  color: #FFF;
}


form.contact-actions {
  margin-bottom: 2em;
  margin-top: 1em;
}
form.contact-actions legend {
  color: #2DA0D4;
  font-weight: 700;
}
form.contact-actions a,
form.contact-actions input[type="color"],
form.contact-actions input[type="email"],
form.contact-actions input[type="password"],
form.contact-actions input[type="search"],
form.contact-actions input[type="tel"],
form.contact-actions input[type="text"],
form.contact-actions input[type="url"],
form.contact-actions input[type="number"],
form.contact-actions input[type="date"],
form.contact-actions input[type="time"],
form.contact-actions input[type="datetime"],
form.contact-actions input[type="datetime-local"],
form.contact-actions input[type="week"],
form.contact-actions input[type="month"] {
  width: 100%;
  margin: 0;
  padding: 5px 10px;
  background: #F8F8F8;
  border: 0;
  border-bottom: 1px solid #CCC;
  outline: 0;
  font-style: italic;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: #5E5E5E;
  outline: 0;
}
form.contact-actions a{
  background: #E92429;
  color: #FFF;
}
form.contact-actions input[type="date"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
form.contact-actions input[type="date"]::-moz-inner-spin-button {
  -moz-appearance: none;
  display: none;
}
form.contact-actions input[type="date"]::-o-inner-spin-button {
  -o-appearance: none;
  display: none;
}
form.contact-actions input[type="date"]::-ms-inner-spin-button {
  -ms-appearance: none;
  display: none;
}
form.contact-actions input[type="date"]::inner-spin-button {
  appearance: none;
  display: none;
}

form.contact-actions input[type="submit"], a {
  width: 100%;
  font-size: 24px !important;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 16px;
  outline: 0;
  cursor: pointer;
  letter-spacing: 1px;
}

form.contact-actions input[type="submit"]:hover, a:hover {
  transition: background-color 0.5s ease;
}

form.contact-actions label, form.contact-actions a {
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
}


.btn-outline, a.btn-outline {
  color: #FFF;
  transition: all .5s;
}
.btn-outline .btn-primary:hover, a.btn-outline .btn-primary:hover {
  color: #428bca;
}

.btn-outline.btn-success:hover, a.btn-outline.btn-success:hover {
  color: #5cb85c;
}

.btn-outline.btn-info:hover, a.btn-outline.btn-info:hover {
  color: #5bc0de;
}

.btn-outline.btn-warning:hover, a.btn-outline.btn-warning:hover {
  color: #f0ad4e;
}

.btn-outline.btn-danger:hover, a.btn-outline.btn-danger:hover {
  color: #d9534f;
}

.btn-outline.btn-primary:hover, a.btn-outline.btn-primary:hover,
.btn-outline.btn-success:hover, a.btn-outline.btn-success:hover,
.btn-outline.btn-info:hover, a.btn-outline.btn-info:hover,
.btn-outline.btn-warning:hover, a.btn-outline.btn-warning:hover,
.btn-outline.btn-danger:hover, a.btn-outline.btn-danger:hover {
  background-color: transparent;
}

.contact-list {
  list-style: none;
  font-family: 'Lato', sans-serif;
  margin: 0px;
  padding: 0px;
}
.contact-list > li {
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 5px rgb(51, 51, 51);
  box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);
  padding: 0px;
  margin: 0px 0px 20px;
  position: relative;
  display: block;
  width: 100%;
  height: 125px;
  padding: 0px;
}
.contact-list > li > .first-letter {
  display: inline-block;
  width: 100%;
  color: rgb(255, 255, 255);
  background-color: rgb(197, 44, 102);
  padding: 5px;
  text-align: center;
  text-transform: uppercase;
}
.contact-list > li:nth-child(even) > .first-letter {
  background-color: rgb(165, 82, 167);
}
.contact-list > li > .first-letter > span {
  display: block;
  font-size: 100px;
  font-weight: 100;
  line-height: 1;
}
.contact-list > li > img {
  width: 100%;
}
.contact-list > li > .info {
  padding-top: 5px;
  text-align: center;
  background-color: rgb(245, 245, 245);
  overflow: hidden;
  position: relative;
  height: 125px;
  text-align: left;
}
.contact-list > li > .info > .title {
  font-size: 17pt;
  font-weight: 300;
  margin: 0px;
}
.contact-list > li > .info > .desc {
  font-size: 13pt;
  font-weight: 300;
  margin: 0px;
}
.contact-list > li > .info > ul{
display: table;
  list-style: none;
  margin: 10px 0px 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
}
.contact-list > li > .info > ul > li{
  display: table-cell;
  cursor: pointer;
  color: rgb(30, 30, 30);
  font-size: 11pt;
  font-weight: 300;
  padding: 3px 0px;
}
.contact-list > li > .info > ul > li > a {
  display: block;
  width: 100%;
  color: rgb(30, 30, 30);
  text-decoration: none;
}
.contact-list > li > .info > ul > li:hover{
  color: rgb(30, 30, 30);
  background-color: rgb(200, 200, 200);
}
.contact-list > li > .first-letter,
.contact-list > li > img {
  display: inline-block;
  float: left;
  width: 125px;
  height: 125px;
  padding: 0px;
  margin: 0px;
}
.contact-list > li > .info > .title,
.contact-list > li > .info > .desc {
  padding: 0px 10px;
}
.contact-list > li > .info > ul {
  position: absolute;
  left: 0px;
  bottom: 0px;
}

.main-content {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #FFF;
  margin-top: 15px;
  margin-bottom: 15px;
  border:1px solid #ccc;
}
.bg-blue {
  background: #2DA0D4;
}

/* Responsive: Portrait tablets and up */
@media screen and (max-width: 768px) {
  .container {
    max-width: 730px;
  }
}

{% endhighlight %}

Nossa aplicação tem algumas dependências externas:

- angular-route.js: Arquivo para o angularJS. A partir deste módulo podemos configurar as nossas rotas, quais as views, controllers e passar parâmetros para o controller;
- crypto-js/tripledes.js: um dos algoritmos de criptografia do projeto crypto-js. Será utilizado para ofuscar o nosso LocalStorage com as informações de nossos contatos;
- angular-keepr: Uma lista de directives, filters e services/factories utilizadas no nosso app para facilitar o processo;

Vamos inicialmente criar as nossas rotas no arquivo `app.js`:

{% highlight javascript %}
'use strict';

angular.module('plunkerApp', [
 'ngRoute', // Incluindo o módulo `angular-route.js` no nosso app
 'keepr' // Incluindo o módulo `angular-keepr.js` no nosso app
])
 .config(function ($routeProvider) {
   $routeProvider
     // Rota padrão do nosso app; Enviará o usuário para a lista de contatos
     .when('/', {
       templateUrl: 'list.html',
       controller: 'ContactsCtrl'
     })
     // Rota padrão do nosso app; Enviará o usuário para a lista de contatos
     .when('/contacts', {
       templateUrl: 'list.html',
       controller: 'ContactsCtrl'
     })
     // Rota para criação de um novo contato
     .when('/contacts/new', {
       templateUrl: 'new.html',
       controller: 'ContactsCtrl'
     })
     // Rota para a edição de um contato existente
     .when('/contacts/:id/edit', {
       templateUrl: 'edit.html',
       controller: 'ContactsCtrl',
       method: 'edit'
     })
     // Redirecionamento, caso o usuário tente acessar uma rota não cadastrada
     .otherwise({
       redirectTo: '/'
     });
 });
{% endhighlight %}


### CRIANDO OS SERVICES

Com as rotas criadas para o nosso app, vamos agora criar o nosso primeiro service. Chamaremos ele de `OfflineModel`. Este service terá alguns parâmetros:

- `_key`: parâmetro key passado para o localStorage. Vale lembrar que o LocalStorage é um banco baseado em chave-valor;
- `_items`: lista com as informações contidas no service;
- `_fields`: campos a serem verificados para criação de um [ValueObject][value-object] para a nossa lista de itens;

Este service utilizará o service `CryptoOffline` do Keepr, que trata diretamente com o Crypto e criptografa/decriptografa as informações para o nosso app. Para nós não é interessante entender mais a fundo este procedimento por ora, mas caso queira saber mais sobre como é esse processo, [você pode dar uma olhada no projeto Keepr no Github][angular-keepr].

{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
 .factory('OfflineModel', function OfflineModel($filter, CryptoOfflineStorageService) {

   // Service logic
   // ...

   var _key = null,
       _items = null,
       _fields = null
   ;

   // Public API here
   return {
     _secret: 'my-awesome-key',
     init: function (key, _items, params) {

       var self = this;
       _key = key;
       params = params || {};
       var i = _items;

       CryptoOfflineStorageService.init({secret: self._secret});
       _items = CryptoOfflineStorageService.get(_key);
       if (!_items){
         CryptoOfflineStorageService.set(_key, _items);
         _items = i;
       }
       self.setListItems(_items, params);

       //  Extend params for create a factory in service
       return angular.extend(self, params);
     },
     createValueObject: function(item) {
       var obj = {};
       angular.forEach( _fields, function( field ) {
         obj[field] = item[field] || '';
       });
       return obj;
     },
     setKey: function(key){
       _key = key;
       return this;
     },
     getKey: function(){
       return _key;
     },
     setListItems: function(items){
       _items = items;
       return this;
     },
     getListItems: function(){
       return _items;
     },
     setFields: function(fields){
       _fields = fields;
       return this;
     },
     countTotalItems: function(items) {
       return ($filter('max')(items, '_id') || 0) + 1;
     },
     create: function (item) {
       item = this.createValueObject(item);
       item._id = this.countTotalItems(_items);
       _items.push(item);
       CryptoOfflineStorageService.set(_key, _items);
       return _items;
     },
     update: function (item) {
       _items = _items.map( function (element) {
         if ( element._id === item._id){
           element = item;
         }
         return element;
       });
       CryptoOfflineStorageService.set(_key, _items);
       return _items;
     },
     delete: function(index) {
       var db = this.getListItems();
       var _id = db.filter( function (element, pos) {
         if ( element._id === index){
           element.pos = pos;
           return element;
         }
       });

       if (_id.length > 0) {
         var item = db.splice(_id[0].pos, 1);
         if (typeof item[0] ===  'object') {
           this.setListItems(db);
           CryptoOfflineStorageService.set(_key, db);
           return item[0];
         }
       }
       return false;
     }
   };

 });
{% endhighlight %}

Neste service podemos destacar alguns métodos:

- init: Instancia um novo objeto `OfflineModel`, passando parâmetros para os outros que o terão injetados via [composição][composition-pattern];
- createValueObject: Cria um [ValueObject][value-object], pegando somente as informações que foram inseridas no campo de _fields e descartando as demais;
- create: Cria um item
- update: Edita o item com base nas novas especificacoes
- delete: Remove um determinado item

Para que o nosso exemplo tenha alguma informação inicial, criaremos um `angular.value()` com alguns contatos.

{% highlight javascript %}
/**
* Initial listContacts list
*
* @type {Array}
*/
angular.module('plunkerApp')
 .value('listContacts', [
   {_id: 1, name: 'Allan Benjamin', address: 'St. Claire Avenue, Nº 101', phone: '557188339933'},
   {_id: 2, name: 'Georgia Smith', address: 'St. Claire Avenue, Nº 102', phone: '557188339933'},
   {_id: 3, name: 'Gregory Levinsky', address: 'St. Claire Avenue, Nº 103', phone: '557188339933'},
   {_id: 4, name: 'Jackeline Macfly', address: 'St. Claire Avenue, Nº 104', phone: '557188339933'},
   {_id: 5, name: 'Joseph Climber', address: 'St. Claire Avenue, Nº 105', phone: '557188339933'},
   {_id: 6, name: 'Joshua Jackson', address: 'St. Claire Avenue, Nº 106', phone: '557188339933'}
 ]);
{% endhighlight %}

Agora criaremos agora o nosso service de Contato. Veja que o seu conteúdo é bem simples, pois ele pega as informações de `OfflineModel` e depois cadastra os campos para que seja criado um [ValueObject][value-object].

{% highlight javascript %}

angular.module('plunkerApp')
 .service('ContactsService', function ContactsService(OfflineModel, listContacts) {

   var Contacts = OfflineModel.init('listContacts', listContacts);

   /**
    * Contact fields
    *
    * @type {Array}
    */
   var contactFields = ['_id', 'name' , 'address' , 'phone'];

   Contacts.setFields(contactFields);

   return Contacts;
 });
{% endhighlight %}


### CRIANDO O CONTROLLER E AS VIEWS

Criaremos agora o nosso controller com os métodos necessários para o nosso cadastro.

{% highlight javascript %}
/* globals confirm */
'use strict';

angular.module('plunkerApp')
 .controller('ContactsCtrl', function ($scope, $location, $routeParams, $route, $filter, AlertService, ContactsService) {

   /**
    * Valor inicial dos formulários de inserção/alteração de contatos
    *
    * @type {Array}
    */
   $scope.contact = [];

   /**
    * Reinicia o valor dos formulários com os campos vazios
    */
   $scope.reset = function() {
     $scope.contact = [
       {
         name: '',
         address: '',
         phone: ''
       }
     ];
   };

   /**
    * Retorna a quantidade de contatos
    * @return {Int}
    */
   $scope.numberOfPages = function(){
     return Math.ceil($scope.filteredData.length/$scope.pageSize);
   };

   /**
    * Insere um contato
    */
   $scope.create = function(contact){
     $scope.listContacts = ContactsService.create(contact);
   };

   /**
    * Retorna um contato específico selecionado para ser editado
    */
   $scope.edit = function(){
     var id = $routeParams.id;
     $scope.contact = $filter('filter')($scope.listContacts, {_id: id})[0];
     window.scrollTo(0, 0);
   };

   /**
    * Altera um contato
    * @param  {Object} item informações do contato
    */
   $scope.update = function( item ) {
     $scope.listContacts = ContactsService.update(item);
   };

   /**
    * Abstração dos métodos de inserir/alterar
    * @param  {Object} item informações do contato
    */
   $scope.save = function(item){
     if(typeof item._id !== 'undefined'){
       $scope.update(item);
     } else {
       $scope.create(item);
     }
     $scope.reset();
     $location.path('/contacts');
   };

   /**
    * Remove um contact da lista de contatos
    * @param  {Integer} index        valor do `_id` do contato
    * @param  {Boolean} confirmation verificação de chamada da função `window.confirm()` na aplicação
    * @return {Boolean}
    */
   $scope.delete = function( index, confirmation ){
     confirmation = (typeof confirmation !== 'undefined') ? confirmation : true;
     if (confirmDelete(confirmation)) {
       var message,
           item = ContactsService.delete(index);
       if (!!item) {
         message = 'Contact "' + item.name + '" with id "' + item._id+ '" was removed of your contact\'s list';
         AlertService.add('success', message, 5000);
         $scope.listContacts = ContactsService.getListItems();
         return true;
       }
       AlertService.add('error', 'Houston, we have a problem. This operation cannot be executed correctly.', 5000);
       return false;
     }
   };

   /**
    * Método para accessar a função "window.confirm()"
    * @param  {Boolean} confirmation verificador Boolean para chamada do confirm
    * @return {Boolean}
    */
   var confirmDelete = function(confirmation){
     return confirmation ? confirm('This action is irreversible. Do you want to delete this contact?') : true;
   };

   /**
    * Método chamado ao inicializar o nosso controller
    */
   $scope.init = function(){
     $scope.listContacts = $scope.filteredData = ContactsService.getListItems();
     $scope.reset();
     //  Calling routeParam method
     if ($route.current.method !== undefined) {
       $scope[$route.current.method]();
     }
   };

   $scope.init();

 });
{% endhighlight %}

Neste controller podemos destacar alguns métodos/parâmetros:

- init: Método chamado ao inicializar o nosso controller
- numberOfPages: Retorna a quantidade de contatos
- reset: Reinicia o valor dos formulários com os campos vazios
- create: Insere um contato da lista de contatos
- update: Update a item in _items
- save: Abstração dos métodos de inserir/alterar
- delete: Remove um contato da lista de contatos

Agora sim, podemos criar as nossas views/templates. Sem mais delongas vamos criar as views:

`list.html`

{% highlight html %}

<div class="row">
 <div class="col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1 main-content">
   <h1 class="text-center">Contact List</h1>
   <a class="btn btn-primary btn-outline btn-add-contact col-lg-12 col-md-12 col-sm-12  clearfix" href="#/contacts/new" >ADD NEW CONTACT</a>

   <form autocomplete="off" role="form">
     <div class="form-group">
       <fieldset>
         <input type="search" name="search" id="search" placeholder="Search..." data-ng-model="search" class="form-control" />
       </fieldset>
     </div>
   </form>

   <div class="alert alert-warning fade in" data-ng-repeat="alert in alerts track by $index">
     <button type="button" class="close" data-dismiss="alert" aria-hidden="true" data-ng-click="closeAlertMessage($index)">×</button>
     {{ alert.msg }}
   </div>

   <ul class="contact-list" data-ng-if="filteredData.length > 0">
     <li data-ng-repeat="item in filteredData = (listContacts | orderBy:predicate:reverse | filter:search) | startFrom:currentPage*pageSize | limitTo:pageSize track by $index">
       <div class="first-letter" >
         <span>{{item.name[0] | capitalize}}</span>
       </div>
       <img alt="{{item.name}}" src="http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png" />
       <div class="info">
         <h2 class="title">{{item.name}}</h2>
         <ul>
           <li><a href="#/contacts/{{item._id}}/edit">✔ EDIT</a></li>
           <li><a data-ng-click="delete(item._id);">✖ DELETE</a></li>
         </ul>
       </div>
     </li>
   </ul>
 </div>
</div>
{% endhighlight %}

`new.html`

{% highlight html %}
<div class="row">
 <div class="col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1 main-content">
   <h1 class="text-center">Contact List</h1>
   <div class="row">
     <div class="col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-4 col-md-3 col-md-offset-4 col-lg-3 col-lg-offset-4 clearfix">
         <img src="http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png" alt="Seth Frazier" class="img-responsive img-circle" />
     </div>
   </div>
   <form autocomplete="off" role="form" novalidate class="form-inline contact-actions clearfix" name="crudOperations" data-ng-submit="save(contact)" >
     <fieldset>
       <legend>Insert an item</legend>
       <input type="hidden" data-ng-model="contact._id" />
       <div class="form-group float-label-control col-lg-6 col-md-6 col-sm-6 no-padding-left" data-ng-class="{'has-error': crudOperations.name.$invalid && crudOperations.name.$dirty, 'has-success': crudOperations.name.$valid && crudOperations.name.$dirty}">
         <input type="text" name="name" data-ng-model="contact.name" class="form-control" data-ng-class="{empty: contact.name.length === 0 || contact.name.length === undefined}" placeholder="Your name" required qs-focus/>
         <div data-ng-if="crudOperations.name.$invalid && crudOperations.name.$dirty && !crudOperations.name.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group float-label-control col-lg-6 col-md-6 col-sm-6 no-padding-left" data-ng-class="{'has-error': crudOperations.phone.$invalid && crudOperations.phone.$dirty, 'has-success': crudOperations.phone.$valid && crudOperations.phone.$dirty}">
         <input type="text" name="phone" kp-mask='+99 (99) 9999-9999' kp-placeholder="+99 (99) 9999-9999" data-ng-model="contact.phone" class="form-control" data-ng-class="{empty: contact.phone.length === 0 || contact.phone.length === undefined}" required qs-focus/>
         <div data-ng-if="crudOperations.phone.$invalid && crudOperations.phone.$dirty && !crudOperations.phone.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group float-label-control col-lg-12 col-md-12 col-sm-12 no-padding-right clearfix" data-ng-class="{'has-error': crudOperations.data.$invalid && crudOperations.data.$dirty, 'has-success': crudOperations.data.$valid && crudOperations.data.$dirty}">
         <textarea name="address" ng-model="contact.address" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="10" required qs-focus></textarea>
         <div data-ng-if="crudOperations.address.$invalid && crudOperations.address.$dirty && !crudOperations.address.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group col-lg-12 col-md-12 col-sm-12 no-padding-right">
         <div class="col-lg-12" data-ng-if="crudOperations.$invalid && crudOperations.data.$dirty">
           <p>You shall not pass =/</p>
           <p>You only can finish the operation if all fields required was populated correctly</p>
         </div>
         <input type="submit" class="btn btn-primary btn-outline col-lg-12 col-md-12 col-sm-12  clearfix" value="CREATE" data-ng-disabled="crudOperations.$invalid && !crudOperations.data.$dirty" />
         <a class="btn btn-danger btn-outline col-lg-12 col-md-12 col-sm-12 " href="#/contacts" >CANCEL</a>
       </div>
     </fieldset>
   </form>
 </div>
</div>
{% endhighlight %}

`edit.html`

{% highlight html %}
<div class="row">
 <div class="col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1 main-content">
   <h1 class="text-center">Contact List</h1>
   <div class="row">
     <div class="col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-4 col-md-3 col-md-offset-4 col-lg-3 col-lg-offset-4 clearfix">
         <img src="http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png" alt="Seth Frazier" class="img-responsive img-circle" />
     </div>
   </div>
   <form autocomplete="off" role="form" novalidate class="form-inline contact-actions clearfix" name="crudOperations" data-ng-submit="save(contact)" >
     <fieldset>
       <legend>Edit an item</legend>
       <input type="hidden" data-ng-model="contact._id" />
       <div class="form-group float-label-control col-lg-6 col-md-6 col-sm-6 no-padding-left" data-ng-class="{'has-error': crudOperations.name.$invalid && crudOperations.name.$dirty, 'has-success': crudOperations.name.$valid && crudOperations.name.$dirty}">
         <input type="text" name="name" data-ng-model="contact.name" class="form-control" data-ng-class="{empty: contact.name.length === 0 || contact.name.length === undefined}" placeholder="Your name" required qs-focus/>
         <div data-ng-if="crudOperations.name.$invalid && crudOperations.name.$dirty && !crudOperations.name.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group float-label-control col-lg-6 col-md-6 col-sm-6 no-padding-left" data-ng-class="{'has-error': crudOperations.phone.$invalid && crudOperations.phone.$dirty, 'has-success': crudOperations.phone.$valid && crudOperations.phone.$dirty}">
         <input type="text" name="phone" kp-mask='+99 (99) 9999-9999' kp-placeholder="+99 (99) 9999-9999" data-ng-model="contact.phone" class="form-control" data-ng-class="{empty: contact.phone.length === 0 || contact.phone.length === undefined}" required qs-focus/>
         <div data-ng-if="crudOperations.phone.$invalid && crudOperations.phone.$dirty && !crudOperations.phone.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group float-label-control col-lg-12 col-md-12 col-sm-12 no-padding-right clearfix" data-ng-class="{'has-error': crudOperations.data.$invalid && crudOperations.data.$dirty, 'has-success': crudOperations.data.$valid && crudOperations.data.$dirty}">
         <textarea name="address" ng-model="contact.address" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="10" required qs-focus></textarea>
         <div data-ng-if="crudOperations.address.$invalid && crudOperations.address.$dirty && !crudOperations.address.$focused">
           <p class="help-block">
             This field is required
           </p>
         </div>
       </div>
       <div class="form-group col-lg-12 col-md-12 col-sm-12 no-padding-right">
         <div class="col-lg-12" data-ng-if="crudOperations.$invalid && crudOperations.data.$dirty">
           <p>You shall not pass =/</p>
           <p>You only can finish the operation if all fields required was populated correctly</p>
         </div>
         <input type="submit" class="btn btn-primary btn-outline col-lg-12 col-md-12 col-sm-12  clearfix" value="UPDATE" data-ng-disabled="crudOperations.$invalid && !crudOperations.data.$dirty" />
         <a class="btn btn-danger btn-outline col-lg-12 col-md-12 col-sm-12 " href="#/contacts" >CANCEL</a>
       </div>
     </fieldset>
   </form>
 </div>
</div>
{% endhighlight %}

Não criamos a nossa view para a exclusão, pois tratamos esta operação na própria view `list.html`.

### CONCLUSÃO

Neste exemplo, vimos como a lógica de seu Controller fica com toda a responsabilidade de métodos e atributos para ele. Pode-se usar este conceito em projetos maiores para que cada controller tenha a responsabilidade de seu módulo. Ou até mesmo modularizarmos ainda mais, pegando como base alguns conceitos de OOP e [a nova estrutura de projetos para o AngularJS][angularjs-docs-folders-structure].

Com as responsabilidades mais modularizadas entre os services, o service de Contato fica muito mais enxuto, já que fizemos a abstração para o acesso ao localStorage usando o OfflineModel. De uma maneira bem simples conseguimos resolver alguns problemas corriqueiros de uma aplicação utilizando o AngularJS.

Criei um Plunkr com este app para que possam ver seu funcionamento, caso queiram fazer download.

Link: [http://plnkr.co/edit/QHouFMvVNZIZErgAWYS9?p=info](http://plnkr.co/edit/QHouFMvVNZIZErgAWYS9?p=info)

Caso queiram saber mais sobre abstrações em aplicações AngularJS/Javascript, recomendo fortemente os blogs:

John Papa: [http://www.johnpapa.net/][john-papa]
Todd Motto: [http://toddmotto.com][todd-motto] (Em especial o artigo: "[Rethinking AngularJS Controllers][todd-motto-post]")

Obrigado e até mais.


Links:

* Angular phonecat: [https://github.com/angular/angular-phonecat][angular-phonecat]
* CryptoJS: [https://code.google.com/p/crypto-js/][cryptojs]
* HTML5 WebStorage: [http://www.w3.org/TR/webstorage/][webstorage-api]
* ValueObject: [http://en.wikipedia.org/wiki/Value_object][value-object]
* Composition Pattern: [http://www.vagrantup.com/2][composition-pattern]
* Blog de John Papa: [http://www.johnpapa.net/angular-app-structuring-guidelines/][john-papa]

[angularjs-docs-folders-structure]: https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub
[angular-phonecat]: https://github.com/angular/angular-phonecat
[cryptojs]: https://code.google.com/p/crypto-js/
[webstorage-api]: http://www.w3.org/TR/webstorage/
[value-object]: http://en.wikipedia.org/wiki/Value_object
[composition-pattern]: http://www.oodesign.com/composite-pattern.html
[john-papa]: http://www.johnpapa.net
[john-papa-post]: http://www.johnpapa.net/angular-growth-structure/
[todd-motto]:http://toddmotto.com
[todd-motto-post]: http://toddmotto.com/rethinking-angular-js-controllers/?=utm&utm_content=buffere9265&utm_medium=social&utm_source=linkedin.com&utm_campaign=buffer
