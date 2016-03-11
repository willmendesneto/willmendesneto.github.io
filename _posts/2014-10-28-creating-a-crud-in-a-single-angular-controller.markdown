---
layout: post
title: Creating a single CRUD in a single AngularJS Controller
categories: angularjs javascript crud architecture tools
tags: javascript angularjs frameworks frontend
status: publish
lang: "us"
image: https://pbs.twimg.com/profile_images/2149314222/square.png
type: post
published: true
meta: {}
author:
---

<a class="page-link" href="{{ '/2014/07/27/criando-um-CRUD-em-um-unico-controller-com-angularjs' | prepend: site.baseurl | replace: '//', '/' }}">Read the Brazillian Portuguese version</a>

## INTRODUCTION

For those already working with some backend languages ​​and can direct the actions of your route based on methods of controllers app knows how this can be interesting in some apps
(I made a Pull Request for AngularJS for this feature was something standard in the Framework, if want to know more about or vote for it to be built, take a look at this link),
but for now, no framework frontend (I know, of course) is something to this level by default.

However most of the examples I see simple things many controllers are used for operations, since they are based on operations per page, as the [angular-phonecat, the official example
that can be found on the official website of AngularJS.

In this case mean that if I have three operations, I create three controllers, one for each page / view? No!
![Life is beautiful!](http://i.imgur.com/dAnMWxQ.gif "Life is beautiful!")

Our example is based on a simple contact list, as the list of contacts from your mobile phone, for example. A simple concept, but general knowledge. Too often we update the content of
our contacts for various reasons and are doing something simple, but functional.

Our contact will accept registration information:

- Id, only for our control;
- Name, and the name required
- Address, being optional
- Telephone, is obligatory;

And we have the four operations:

- Create: Area to create a new contact; `new.html` file;
- Retrieve: will our list of contacts, with a simple search and the link to the other options like Edit, Add and Delete;
- Update: Area we update our contact data; edit.html file
- Delete: Option to exclude our contact; How is relatively simple, let us bound to our `index.html` file;

For do our process more easy for our example, we use a database using LocalStorage, [one of HTML5 WebStorage][webstorage-api]. For this we will create a simple abstraction process.
We use encryption in our LocalStorage from [CryptoJS library][cryptojs].

## BEGINNING UOUR APP

Ok, let's first create our main file:

`index.html`, which will be linked to our external files and will serve as the primary template for our application.
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


`main.css`, which will be styling our app

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

Our application has some external dependencies:

- angular-route.js: Files for angularJS. From this module we can configure our routes, which views, controllers and pass parameters to the controller;
- crypto-js / tripledes.js: one of the encryption algorithms design crypto-js. Will be used to obfuscate our LocalStorage with information from our contacts;
- angular-keepr: A list of directives, filters and services / factories used in our app to facilitate the process;
Let's first create our routes in `app.js` file:

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


### CREATING THE SERVICES

With routes created for our app, we now create our first service. Call him OfflineModel. This service will have some parameters:

- `_key`: key parameter passed to the localStorage. Remember, the LocalStorage is a bank based on key-value;
- `_items`: list with the information contained in the service;
- `_fields`: fields to be scanned to create a [ValueObject][value-object] to our list of items;

This service uses Keepr `CryptoOffline` service, which deals directly with the Crypto and encrypts/decrypts informations into our app. For us it is not interesting to further understand this procedure for now, but if you want to know more about how this process is, [you can take a look at Keepr project on Github][angular-keepr].

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


In this service we can highlight some methods:

- init: OfflineModel Instantiates a new object, passing parameters to the others who have injected via [composition pattern][composition-pattern];
- createValueObject: Creates a [ValueObject][value-object], catching only the information that was entered into the field _Fields and discarding the other;
- create: Creates an item;
- update: Edits the item based on the new specifications;
- delete: Remove a specific item;

For our example has some initial information, we will create a `angular.value()` with some contacts.

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

Now we will create our service now Contact. See that your content is very simple, because it takes the information `OfflineModel` and then registers the fields for [ValueObject][value-object] creation.

### CREATING THE CONTROLLER AND VIEWS

Now we will create our controller with the necessary for our registration methods.

{% highlight javascript %}
/* globals confirm */
'use strict';

angular.module('plunkerApp')
 .controller('ContactsCtrl', function ($scope, $location, $routeParams, $route, $filter, AlertService, ContactsService) {

   /**
    * initial value of creation/alteration contact form
    *
    * @type {Array}
    */
   $scope.contact = [];

   /**
    * Reinitialize form values
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
    * Returns count of contacts
    * @return {Int}
    */
   $scope.numberOfPages = function(){
     return Math.ceil($scope.filteredData.length/$scope.pageSize);
   };

   /**
    * Add um contato
    */
   $scope.create = function(contact){
     $scope.listContacts = ContactsService.create(contact);
   };

   /**
    * Return a specific contact for edition
    */
   $scope.edit = function(){
     var id = $routeParams.id;
     $scope.contact = $filter('filter')($scope.listContacts, {_id: id})[0];
     window.scrollTo(0, 0);
   };

   /**
    * Update a contact
    * @param  {Object} item Contact informations
    */
   $scope.update = function( item ) {
     $scope.listContacts = ContactsService.update(item);
   };

   /**
    * Insert/update abstraction
    * @param  {Object} item Contact informations
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
    * Remove a contact of contact list
    * @param  {Integer} index        `_id` value's contact
    * @param  {Boolean} confirmation boolean verificator for call "confirm" method
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
    * Method for access "window.confirm()"
    * @param  {Boolean} confirmation boolean verificator for call "confirm" method
    * @return {Boolean}
    */
   var confirmDelete = function(confirmation){
     return confirmation ? confirm('This action is irreversible. Do you want to delete this contact?') : true;
   };

   /**
    * Method called for initialize our controller
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

In this contest we can highlight some methods / parameters:

- init: method called to initialize our controller;
- numberOfPages: Returns the number of contacts;
- reset: Resets the value of the forms with empty fields;
- create: Inserts a contact from the contacts list;
- update: Update the item in _items;
- save: Abstraction methods to insert / change;
- delete: Remove a contact from the contacts list;

Now we can create our views / templates. Without further ado lets create the views:

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


We don't need create our view to the exclusion, because this operation ocurring in `list.html` view file.

### CONCLUSION

In this example, we saw how the logic of your Controller is the full responsibility of methods and attributes to him. You can use this concept in larger projects so that each controller has a responsibility to its module. Modularizarmos or even further, taking as a base some concepts of OOP and [the new AngularJS project's structure][angularjs-docs-folders-structure].

With more modularized responsibilities between the services, the service Contact is much more streamlined, since we have the abstraction for access to localStorage using OfflineModel. In a very simple way we can solve some common problems in an application using AngularJS.

Created a Plunkr with this app so they can see their operation if they want to download.

- Plunker: [http://plnkr.co/edit/QHouFMvVNZIZErgAWYS9?p=info](http://plnkr.co/edit/QHouFMvVNZIZErgAWYS9?p=info)
- Github com o projeto completo e testado: [https://github.com/willmendesneto/angular-contact-list](https://github.com/willmendesneto/angular-contact-list)

If want to know more about abstractions AngularJS / Javascript applications strongly recommend blogs:

John Papa: [http://www.johnpapa.net/][john-papa]
Todd Motto: [http://toddmotto.com][todd-motto] (Em especial o artigo: "[Rethinking AngularJS Controllers][todd-motto-post]")

Thanks and see you soon.


Links:

* Angular phonecat: [https://github.com/angular/angular-phonecat][angular-phonecat]
* CryptoJS: [https://code.google.com/p/crypto-js/][cryptojs]
* HTML5 WebStorage: [http://www.w3.org/TR/webstorage/][webstorage-api]
* ValueObject: [http://en.wikipedia.org/wiki/Value_object][value-object]
* Composition Pattern: [http://www.vagrantup.com/2][composition-pattern]
* John Papa's Blog: [http://www.johnpapa.net/angular-app-structuring-guidelines/][john-papa]

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
