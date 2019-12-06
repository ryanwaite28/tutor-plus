class UserpageController {
  userId: any = null;

  constructor(
    private $scope: any,
    private stateService: any,
    private getService: any,
    private putService: any,
    private utilityService: any,
    private userService: any,
    private socketService: any,
  ) {
    $scope.$ctrl = this;

    console.log(this);
    this.init();
  }

  init() {
    const userId = window.location.pathname.split('/')[2];
    this.userId = parseInt(userId, 10);

    const promiseList = [
      this.getService.checkSession(),
      this.getService.getUserProfileInfoById(userId),
    ];

    Promise.all(promiseList)
    .then((values) => {
      this.$scope.you = values[0].user;
      this.$scope.user = values[1].user;
      const isDifferentUser = (
        this.$scope.user && this.$scope.you &&
        this.$scope.user.id !== this.$scope.you.id
      );
      if (isDifferentUser) {
        return this.getService.checkUserFollows(
          this.$scope.you.id,
          this.$scope.user.id
        );
      }
    })
    .then((response) => {
      this.$scope.follows = response && response.follows;
    })
    .finally(() => {
      this.$scope.$apply();
      this.listen();
    });
  }

  listen() {
    const socket = this.socketService && this.socketService.socket;
    if (socket && this.$scope.you) {
      const eventName = this.socketService.getUserEventListenerName(this.$scope.you);
      this.$scope.eventName = eventName;

      this.socketService.socket.on(eventName, (event: any) => {
        this.handleSocketEvent(event);
      });

      console.log('Listening to socket events');
    }
  }

  handleSocketEvent(event: any) {
    switch (event.eventType) {
      case 'USER_PROFILE_UPDATED': {
        this.settingsUpdated(event.user);
      }
    }
  }

  setUserPageView(view: string) {
    this.$scope.currentView = view;
  }

  settingsUpdated(user: any) {
    Object.assign(this.stateService.session.user, user);
    this.$scope.you = this.stateService.session.user;
    this.$scope.user = this.stateService.session.user;
    this.setUserPageView('');
    this.$scope.$apply();
    this.utilityService.flashMessage('Settings Updated Successfully', 'is-success', 3);
  }

  onToggleFollow() {
    this.putService.toggleUserFollow(this.$scope.you.id, this.$scope.user.id)
    .then((response: any) => {
      this.$scope.follows = response && response.follows;
      this.$scope.$apply();
    });
  }
}

App.controller('userpageCtrl', [
  '$scope',
  'stateService',
  'getService',
  'putService',
  'utilityService',
  'userService',
  'socketService',
  UserpageController,
]);
