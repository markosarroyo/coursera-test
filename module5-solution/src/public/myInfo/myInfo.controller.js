(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject=['signUpInfo','ApiPath','MenuService'];
function MyInfoController(signUpInfo,ApiPath,MenuService) {
  var myInfoCtrl = this;
  myInfoCtrl.user=signUpInfo;
  myInfoCtrl.path=ApiPath;
}

})();
