App.controller('userpageCtrl', [
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
      const userId = window.location.pathname.split('/')[2];
      this.userId = parseInt(userId);

      const promiseList = [
        this.getService.checkSession(),
        this.getService.getUserById(userId),
      ];

      Promise.all(promiseList).then((values) => {
        this.you = values[0].user;
        this.user = values[1].user;
        this.$scope.$apply();
      });
    }
  }
]);