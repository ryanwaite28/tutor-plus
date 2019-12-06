class SignupController {
  constructor(
    private $scope: any,
    private getService: any,
    private postService: any,
    private utilityService: any,
    private userService: any
  ) {
    $scope.$ctrl = this;

    this.init();
  }

  init() {
    this.getService.checkSession().then((response: any) => {
      if (response.user) {
        this.userService.navigateToUserPage(response.user);
      }
    });
  }

  signUp(form: any) {
    this.$scope.requestInProgress = true;
    const data = this.utilityService.getFormValue(form);
    this.postService.signUp(data).then((response: any) => {
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

App.controller('signupCtrl', [
  '$scope',
  'getService',
  'postService',
  'utilityService',
  'userService',
  SignupController
]);
