class AlertsBoxComponent {
  static $inject = [
    'getService',
    'socketService',
    'utilityService',
    '$scope',
  ];

  you: any;
  listening: boolean = false;
  constructor(
    private getService: any,
    private socketService: any,
    private utilityService: any,
    private $scope: any,
  ) {}

  $onInit() {
    console.log(this);
  }
}

App.component('appAlertsBox', {
  templateUrl: `/html/templates/alerts-box.component.html`,
  bindings: {
  },
  controller: AlertsBoxComponent
});
