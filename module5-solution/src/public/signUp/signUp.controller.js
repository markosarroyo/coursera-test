(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject=['MenuService'];
function SignUpController(MenuService) {
  var signUpCtrl = this;
  signUpCtrl.user={};
  signUpCtrl.user.firstName = "";
  signUpCtrl.user.lastName = "";
  signUpCtrl.user.email = "";
  signUpCtrl.user.phoneNumber = "";
  signUpCtrl.user.favoriteDishCode = "";
  signUpCtrl.unexistingDish = false;
  signUpCtrl.savedOK = false;

  signUpCtrl.submit = function() {
    signUpCtrl.user.favoriteDishCode=signUpCtrl.user.favoriteDishCode.toUpperCase();

    MenuService.getFavoriteDish(signUpCtrl.user.favoriteDishCode).then(function (response) {
      //farovite dish exists!!
      signUpCtrl.user.favoriteDish=response.data;
      signUpCtrl.unexistingDish = false;

      //save info in service
      MenuService.saveSignUpInfo(signUpCtrl.user);

      signUpCtrl.savedOK = true;

    }, function (response) {
      //error retrieving info from the server
      //I assume that the dish doesn't exist
      signUpCtrl.unexistingDish = true;
      signUpCtrl.savedOK = false;
    });
  }
}

})();
