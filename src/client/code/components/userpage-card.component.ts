class UserpageCardComponent {
  static $inject = [
    '$scope',
    'putService',
  ];

  you: any;
  user: any;
  setUserPageView: any;

  constructor(
    private $scope: any,
    private putService: any,
  ) {}

  $onInit() {
    console.log(this);
  }

  setPageView(view: string) {
    this.setUserPageView({ view });
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
