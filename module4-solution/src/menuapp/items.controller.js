(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'data'];
function ItemsController(MenuDataService, data) {
  var itemsCtrl = this;
  itemsCtrl.items = data.menu_items;
  itemsCtrl.parentCategory = data.category;
}

})();
