App.component('appNavbar', {
  templateUrl: `/html/templates/navbar.component.html`,
  bindings: {
    you: '<',
  },
  controller: class NavbarComponent {
    static $inject = [
      'getService',
    ];

    constructor(getService) {
      this.getService = getService;
    }

    $onInit() {
    }

    signOut() {
      this.getService.signOut().then((response) => {
        window.location.href = '/signin';
      });
    }
  }
});