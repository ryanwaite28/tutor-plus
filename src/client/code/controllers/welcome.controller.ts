class WelcomeController {
  constructor(
    private $scope: any,
    private getService: any,
    private putService: any,
    private utilityService: any,
    private userService: any
  ) {
    $scope.$ctrl = this;

    this.init();
  }

  init() {
    this.getService.checkSession().then((response: any) => {
      this.$scope.you = response.user;
      this.$scope.$apply();
    });
  }
}

App.controller('welcomeCtrl', [
  '$scope',
  'getService',
  'putService',
  'utilityService',
  'userService',
  WelcomeController,
]);
