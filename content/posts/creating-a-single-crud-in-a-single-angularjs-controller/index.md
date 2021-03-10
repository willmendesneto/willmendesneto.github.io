---
status: "active"
title: Creating a single CRUD in a single AngularJS Controller
description: >-
  For those already working with some backend languages ​​and can direct the
  actions of your route based on methods of controllers app knows…
date: '2014-10-28T00:00:00.000Z'
path: >-
  /blog/creating-a-single-crud-in-a-single-angularjs-controller
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['wordpress', 'jekyll']
---

For those already working with some backend languages ​​and can direct the actions of your route based on methods of controllers app knows how this can be interesting in some apps (I made a Pull Request for AngularJS for this feature was something standard in the Framework, if want to know more about or vote for it to be built, take a look at this link), but for now, no framework front-end (I know, of course) is something to this level by default.

However most of the examples I see simple things many controllers are used for operations, since they are based on operations per page, as the angular-phonecat, the official example that can be found on the official website of AngularJS.

In this case mean that if I have three operations, I create three controllers, one for each page/view? No!

![](https://cdn-images-1.medium.com/max/800/0*ZN86bHc3LeehxEsI.gif)
undefined

Our example is based on a simple contact list, as the list of contacts from your mobile phone, for example. A simple concept, but general knowledge. Too often we update the content of our contacts for various reasons and are doing something simple, but functional.

Our contact will accept registration information:

*   Id, only for our control;
*   Name, and the name required
*   Address, being optional
*   Telephone, is obligatory;

And we have the four operations:

*   Create: Area to create a new contact; new.html file;
*   Retrieve: will our list of contacts, with a simple search and the link to the other options like Edit, Add and Delete;
*   Update: Area we update our contact data; edit.html file
*   Delete: Option to exclude our contact; How is relatively simple, let us bound to our index.html file;

For do our process more easy for our example, we use a database using LocalStorage, [one of HTML5 WebStorage](http://www.w3.org/TR/webstorage/). For this we will create a simple abstraction process. We use encryption in our LocalStorage from [CryptoJS library](https://code.google.com/p/crypto-js/).

### Starting our app

Ok, let’s first create our main file:

index.html, which will be linked to our external files and will serve as the primary template for our application.

```html
<!DOCTYPE html>
 <html class="no-js">
 <head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title></title>
   <meta name="description" content="">
   <script>document.write('<base href="' + document.location + '" />');</script>
   <meta name="viewport" content="width=device-width">

   <!-- our application styles -->
   <link rel="stylesheet" href="main.css">
   <!-- -->

</head>
 <body ng-app="plunkerApp">

   <!-- Add your site or application content here -->
   <div class="container" ng-view=""></div>

   <script src="[http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js](http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js)">  </script>
   <script src="[https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js)"></script>

   <script src="angular-route.js"></script>
   <script src="[https://rawgit.com/willmendesneto/keepr/master/dist/keepr.js](https://rawgit.com/willmendesneto/keepr/master/dist/keepr.js)"></script>

   <!-- Our app routes -->
   <script src="app.js"></script>
   <!-- -->

   <!-- Our app controllers -->
   <script src="controllers.js"></script>
   <!-- -->

   <!-- Our app directives -->
   <script src="directives.js"></script>
   <!-- -->

   <!-- Our app services -->
   <script src="services.js"></script>
   <!-- -->

</body>
</html>
```

Our application has some external dependencies:

*   angular-route.js: Files for angularJS. From this module we can configure our routes, which views, controllers and pass parameters to the controller;
*   crypto-js/tripledes.js: one of the encryption algorithms design crypto-js. Will be used to obfuscate our LocalStorage with information from our contacts;
*   angular-keepr: A list of directives, filters and services / factories used in our app to facilitate the process; Let’s first create our routes in app.js file:

```js
'use strict';

angular.module('plunkerApp', [
 'ngRoute', // Adding `angular-route.js`
 'keepr' // Adding `angular-keepr.js`
])
 .config(function ($routeProvider) {
   $routeProvider
     // Default route
     .when('/', {
       templateUrl: 'list.html',
       controller: 'ContactsCtrl'
     })
     // Contact list
     .when('/contacts', {
       templateUrl: 'list.html',
       controller: 'ContactsCtrl'
     })
     // add a new contact
     .when('/contacts/new', {
       templateUrl: 'new.html',
       controller: 'ContactsCtrl'
     })
     // Update a contact
     .when('/contacts/:id/edit', {
       templateUrl: 'edit.html',
       controller: 'ContactsCtrl',
       method: 'edit'
     })
     // Redirect to main route
     .otherwise({
       redirectTo: '/'
     });
 });
```

### Creating the services

With routes created for our app, we now create our first service. Call him OfflineModel. This service will have some parameters:

*   `_key`: key parameter passed to the localStorage. Remember, the LocalStorage is a bank based on key-value;
*   `_items`: list with the information contained in the service;
*   `_fields`: fields to be scanned to create a [ValueObject](http://en.wikipedia.org/wiki/Value_object) to our list of items;

This service uses Keepr CryptoOffline service, which deals directly with the Crypto and encrypts/decrypts informations into our app. For us it is not interesting to further understand this procedure for now, but if you want to know more about how this process is, [you can take a look at Keepr project on Github](https://github.com/willmendesneto/keepr).

```js
angular.module('plunkerApp')
 .factory('OfflineModel', function OfflineModel($filter, CryptoOfflineStorageService) {

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
```

In this service we can highlight some methods:

*   init: OfflineModel Instantiates a new object, passing parameters to the others who have injected via [composition pattern](http://www.oodesign.com/composite-pattern.html);
*   createValueObject: Creates a [ValueObject](http://en.wikipedia.org/wiki/Value_object), catching only the information that was entered into the field _Fields and discarding the other;
*   create: Creates an item;
*   update: Edits the item based on the new specifications;
*   delete: Remove a specific item;

For our example has some initial information, we will create a angular.value() with some contacts.

```js
angular.module('plunkerApp')
 .value('listContacts', [
   {_id: 1, name: 'Allan Benjamin', address: 'St. Claire Avenue, Nº 101', phone: '557188339933'},
   {_id: 2, name: 'Georgia Smith', address: 'St. Claire Avenue, Nº 102', phone: '557188339933'},
   {_id: 3, name: 'Gregory Levinsky', address: 'St. Claire Avenue, Nº 103', phone: '557188339933'},
   {_id: 4, name: 'Jackeline Macfly', address: 'St. Claire Avenue, Nº 104', phone: '557188339933'},
   {_id: 5, name: 'Joseph Climber', address: 'St. Claire Avenue, Nº 105', phone: '557188339933'},
   {_id: 6, name: 'Joshua Jackson', address: 'St. Claire Avenue, Nº 106', phone: '557188339933'}
 ]);
```

Now we will create our service now Contact. See that your content is very simple, because it takes the information OfflineModel and then registers the fields for [ValueObject](http://en.wikipedia.org/wiki/Value_object) creation.

### Creating the Controller and views

Now we will create our controller with the necessary for our registration methods.

```js
angular.module('plunkerApp')
 .controller('ContactsCtrl', function ($scope, $location, $routeParams, $route, $filter, AlertService, ContactsService) {

   /**
    * initial value of creation/alteration contact form
    *
    * [@type](http://twitter.com/type "Twitter profile for @type") {Array}
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
    * [@return](http://twitter.com/return "Twitter profile for @return") {Int}
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
    * [@param](http://twitter.com/param "Twitter profile for @param")  {Object} item Contact informations
    */
   $scope.update = function( item ) {
     $scope.listContacts = ContactsService.update(item);
   };

   /**
    * Insert/update abstraction
    * [@param](http://twitter.com/param "Twitter profile for @param")  {Object} item Contact informations
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
    * [@param](http://twitter.com/param "Twitter profile for @param")  {Integer} index        `_id` value's contact
    * [@param](http://twitter.com/param "Twitter profile for @param")  {Boolean} confirmation boolean verificator for call "confirm" method
    * [@return](http://twitter.com/return "Twitter profile for @return") {Boolean}
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
    * [@param](http://twitter.com/param "Twitter profile for @param")  {Boolean} confirmation boolean verificator for call "confirm" method
    * [@return](http://twitter.com/return "Twitter profile for @return") {Boolean}
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
```

In this contest we can highlight some methods / parameters:

*   init: method called to initialize our controller;
*   numberOfPages: Returns the number of contacts;
*   reset: Resets the value of the forms with empty fields;
*   create: Inserts a contact from the contacts list;
*   update: Update the item in _items;
*   save: Abstraction methods to insert / change;
*   delete: Remove a contact from the contacts list;

Now we can create our views / templates. Without further ado lets create the views:


list.html

```html
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
       <img alt="{{item.name}}" src="[http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png](http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png)" />
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
```

new.html

```html
<div class="row">
 <div class="col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1 main-content">
   <h1 class="text-center">Contact List</h1>
   <div class="row">
     <div class="col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-4 col-md-3 col-md-offset-4 col-lg-3 col-lg-offset-4 clearfix">
         <img src="[http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png](http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png)" alt="Seth Frazier" class="img-responsive img-circle" />
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
```

edit.html

```html
<div class="row">
 <div class="col-lg-6 col-lg-offset-3 col-xs-10 col-xs-offset-1 main-content">
   <h1 class="text-center">Contact List</h1>
   <div class="row">
     <div class="col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-4 col-md-3 col-md-offset-4 col-lg-3 col-lg-offset-4 clearfix">
         <img src="[http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png](http://www.corporalmente.com.br/wp-content/uploads/2013/10/profile_avatar_default.png)" alt="Seth Frazier" class="img-responsive img-circle" />
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
```

We don’t need create our view to the exclusion, because this operation ocurring in list.html view file.

<hr/>

### Conclusion

In this example, we saw how the logic of your Controller is the full responsibility of methods and attributes to him. You can use this concept in larger projects so that each controller has a responsibility to its module. Modularizarmos or even further, taking as a base some concepts of OOP and [the new AngularJS project’s structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

With more modularized responsibilities between the services, the service Contact is much more streamlined, since we have the abstraction for access to localStorage using OfflineModel. In a very simple way we can solve some common problems in an application using AngularJS.

Created a Plunkr with this app so they can see their operation if they want to download.

If want to know more about abstractions AngularJS / Javascript applications strongly recommend blogs:

John Papa: [http://www.johnpapa.net/](http://www.johnpapa.net) Todd Motto: [http://toddmotto.com](http://toddmotto.com) (Em especial o artigo: “[Rethinking AngularJS Controllers](http://toddmotto.com/rethinking-angular-js-controllers/?=utm&utm_content=buffere9265&utm_medium=social&utm_source=linkedin.com&utm_campaign=buffer)”)

Thanks and see you soon.

Links:

*   Angular phonecat: [https://github.com/angular/angular-phonecat](https://github.com/angular/angular-phonecat)
*   CryptoJS: [https://code.google.com/p/crypto-js/](https://code.google.com/p/crypto-js/)
*   HTML5 WebStorage: [http://www.w3.org/TR/webstorage/](http://www.w3.org/TR/webstorage/)
*   ValueObject: [http://en.wikipedia.org/wiki/Value_object](http://en.wikipedia.org/wiki/Value_object)
*   Composition Pattern: [http://www.vagrantup.com/2](http://www.vagrantup.com/2)
*   John Papa’s Blog: [http://www.johnpapa.net/angular-app-structuring-guidelines/](http://www.johnpapa.net/angular-app-structuring-guidelines/)
