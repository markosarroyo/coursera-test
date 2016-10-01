(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController($scope) {
  $scope.dishesList = "";
  $scope.checkMessage = "";
  $scope.warningMessage = "";

  $scope.checkLunch = function () {
    //warning message is cleared every time we check
    $scope.warningMessage = "";

    //If there is not any dishes we have nothing to check
    if($scope.dishesList.length===0){
      $scope.checkMessage = "Please enter data first";
      return;
    }

    //convert de string list to an array
    var itemsArray = $scope.dishesList.split(',');

    //check the number of dishes
    $scope.checkMessage = checkMessage(itemsArray);

    //warning about empty dishes in the list
    $scope.warningMessage = checkEmptyItems (itemsArray);

  };

  function checkMessage (items){
    var message = "";

    //building the message depending on the number of dishes
    if(items.length <= 3){
      message = "Enjoy!";
    } else {
      message = "Too Much!";
    }

    return message;
  }

  function checkEmptyItems(items){
    var message = "";
    var counter = 0;

    //check all items
    //we store de position of the empty item in a separated by comma string
    for(var i=0 ; i < items.length ; i++){
      if(items[i].trim().length===0){
        //first one doesn't need comma separator
        if(counter!==0){
          message += ", ";
        }
        message += (i+1);
        //we need counter to beautify the message
        counter++;
      }
    }

    //making a friendly message
    if (counter > 0){
      if(counter===1){
        //singular message
        message = 'Item ' + message + " is empty";
      }
      else{
        //plural message
        message = 'Items ' + message + " are empty";
      }
      //only if it was empty items
      message = "But " + message;
    }
    return message;
  }
}

})();
