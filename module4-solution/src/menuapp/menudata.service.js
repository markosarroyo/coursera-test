(function(){
'use strict';

angular.module('data')
.service('MenuDataService',MenuDataService)
.constant('menuCatgoriesURL', "https://davids-restaurant.herokuapp.com/categories.json")
.constant('menuItemsByCategoryURL', "https://davids-restaurant.herokuapp.com/menu_items.json?category=");

MenuDataService.$inject = ['$q', '$http','menuCatgoriesURL','menuItemsByCategoryURL']
function MenuDataService($q, $http ,menuCatgoriesURL, menuItemsByCategoryURL){
  var service = this;

  service.getAllCategories = function(){
    var deferred = $q.defer();
    var categories = [];


    $http({method: "GET",url: (menuCatgoriesURL)}).then(
      function (result){
      //Order categories by name
      categories = result.data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
      deferred.resolve(categories);

    },
      function (httpError){
        var errorMsg = httpError.status + ':' + httpError.statusText + ' url: '+httpError.config.url;
        deferred.reject(errorMsg);
        throw errorMsg;
      }
    );

    return deferred.promise;

  };

  service.getItemsForCategory = function(categoryShortName) {
    var deferred = $q.defer();

    $http({method: "GET",url: (menuItemsByCategoryURL + categoryShortName)}).then(
      function (result){
      deferred.resolve(result.data);

    },
      function (httpError){
        var errorMsg = httpError.status + ':' + httpError.data;
        deferred.reject(errorMsg);
        throw errorMsg;
      }
    );

    return deferred.promise;

  }
}

})();
