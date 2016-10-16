(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('menuItemsURL', "https://davids-restaurant.herokuapp.com/menu_items.json");;

function FoundItemsDirective(){
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope:{
      items: '<foundItems',
      onRemove: '&'
    },
    controller: FoundIemsDirectiveController,
    controllerAs: 'foundItemsCtrl',
    bindToController: true
  }
  return ddo;
}

function FoundIemsDirectiveController(){
  var foundItemsCtrl = this;

  foundItemsCtrl.noItems = function (){

    if(foundItemsCtrl.items){
      return foundItemsCtrl.items.length===0;
    }

    return true;
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {

  var menu = this;
  menu.searchTerm = '';


  menu.getMatchedMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    if(searchTerm===''){
      menu.found=[];
      return;
    }

    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log('Something really bad happened!');
    })
  };

  menu.removeItem = function(indexItem){
    menu.found.splice(indexItem,1);
  }
}

MenuSearchService.$inject = ['$http', 'menuItemsURL','$q']
function MenuSearchService($http, menuItemsURL,$q) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    searchTerm=searchTerm.toLowerCase();


    return $http({method: "GET",url: (menuItemsURL)}).then(function (result){
      //process result and only keep items that match
      var foundItems=[];
      var numberOfItems = result.data.menu_items.length;
      var item;

      for(var i=0; i < numberOfItems; i++){
        item=result.data.menu_items[i];
        if(item.description.toLowerCase().indexOf(searchTerm)!==-1){
          foundItems.push(item);
        }
      }

    return foundItems;

    })
  };
}


})();
