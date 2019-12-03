App.controller('signinCtrl', [
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
        if (response.user) {
          this.userService.navigateToUserPage(response.user);
        }
      });
    }

    signIn(form) {
      this.$scope.requestInProgress = true;
      const data = this.utilityService.getFormValue(form);
      this.putService.signIn(data).then((response) => {
        if (response.error) {
          this.utilityService.flashMessage(response.message, 'is-danger', 3);
          this.$scope.requestInProgress = false;
          this.$scope.$apply();
          return;
        }

        this.utilityService.flashMessage(response.message, 'is-success', 3);
        setTimeout(() => {
          this.userService.navigateToUserPage(response.user);
        }, 1500);
      });
    }
  }
]);