App.controller('welcomeCtrl', [
  '$scope',
  'getService',
  'putService',
  'utilityService',
  'userService',
  class SigninController {
    constructor($scope, getService, putService, utilityService, userService) {
      $scope.$ctrl = this;
      this.$scope = $scope;
      this.getService = getService;
      this.putService = putService;
      this.utilityService = utilityService;
      this.userService = userService;

      this.init();
    }

    init() {
      this.getService.checkSession().then((response) => {
        this.$scope.you = response.user;
        this.$scope.$apply();
      });
    }
  }
]);