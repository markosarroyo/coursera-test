(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.itemsToBuy;

  toBuy.buy=function(index){
    ShoppingListCheckOffService.buy(index);
  }

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.itemsBought;

}

function ShoppingListCheckOffService() {
  var service = this;

  //to keep info updated inside the service
  service.itemsToBuy=[];
  service.itemsBought=[];

  //Initial list of items to buy
  addToList(service.itemsToBuy, 'Cookies','2 bags');
  addToList(service.itemsToBuy, 'Beer','3 packs');
  addToList(service.itemsToBuy, 'Frites','a lot');
  addToList(service.itemsToBuy, 'Alka seltzer','a big box');
  addToList(service.itemsToBuy, 'Eggs','not to much');
  addToList(service.itemsToBuy, 'Tomatoes','1 dozen ');


  service.buy = function(index){
    //item to buy
    var item=service.itemsToBuy[index];

    //remove item from toBuy list
    service.itemsToBuy.splice(index,1);

    //add item to alreadyBought list
    addToList(service.itemsBought,item.name,item.quantity);

  }

  //to add items to lists
  function addToList (list, itemName, itemQuantity){
    var item = {
      name : itemName,
      quantity : itemQuantity
    };
    list.push(item);
  };

}





})();
