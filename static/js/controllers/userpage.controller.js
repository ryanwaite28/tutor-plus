App.controller('userpageCtrl', [
  '$scope',
  'stateService',
  'getService',
  'putService',
  'utilityService',
  'userService',
  'socketService',
  class UserpageController {
    constructor(
      $scope,
      stateService,
      getService,
      putService,
      utilityService,
      userService,
      socketService,
    ) {
      $scope.$ctrl = this;
      this.$scope = $scope;

      this.stateService = stateService;
      this.getService = getService;
      this.putService = putService;
      this.utilityService = utilityService;
      this.userService = userService;
      this.socketService = socketService;

      console.log(this);
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
        this.$scope.you = values[0].user;
        this.$scope.user = values[1].user;
        this.$scope.$apply();
      });
    }

    setUserPageView(view) {
      this.$scope.currentView = view;
    }

    settingsUpdated(user) {
      Object.assign(this.stateService.session.user, user);
      this.$scope.you = this.stateService.session.user;
      this.$scope.user = this.stateService.session.user;
      this.$scope.$apply();
    }
  }
]);