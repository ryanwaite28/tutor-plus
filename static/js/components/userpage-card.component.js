App.component('userpageCard', {
  templateUrl: `/html/templates/userpage-card.component.html`,
  bindings: {
    you: '<',
    user: '<',
    setUserPageView: '&',
  },
  controller: class UserpageCardComponent {
    static $inject = [];

    constructor() {}

    $onInit() {
      console.log(this);
    }

    setPageView(view) {
      this.setUserPageView({ view });
    }
  }
});