App.component('userpageCard', {
  templateUrl: `/html/templates/userpage-card.component.html`,
  bindings: {
    you: '<',
    user: '<',
  },
  controller: class PersonComponent {
    static $inject = [];

    constructor() {}

    $onInit() {
      console.log(this);
    }
  }
});