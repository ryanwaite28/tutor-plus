class UserpageCardComponent {
  static $inject = [
    '$scope',
    'putService',
  ];

  you: any;
  user: any;
  setUserPageView: any;
  isAvailable: boolean = false;

  constructor(
    private $scope: any,
    private putService: any,
  ) {}

  $onInit() {
    console.log(this);
    this.isAvailable = this.user.available;
  }

  setPageView(view: string) {
    this.setUserPageView({ view });
  }

  toggleAvailability() {
    console.log(this);
  }
}

App.component('userpageCard', {
  templateUrl: `/html/templates/userpage-card.component.html`,
  bindings: {
    you: '<',
    user: '<',
    follows: '<',
    setUserPageView: '&',
    toggleFollow: '&',
  },
  controller: UserpageCardComponent
});
