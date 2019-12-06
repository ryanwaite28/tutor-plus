class UserpageSettingsComponent {
  static $inject = [
    '$scope',
    'putService',
    'utilityService',
    'stateService',
  ];

  you: any;
  youCopy: any;
  constructor(
    private $scope: any,
    private putService: any,
    private utilityService: any,
    private stateService: any,
  ) {
    this.youCopy = {};
  }

  $onInit() {
    console.log(this);
    this.youCopy = { ...this.you };
  }

  clearFileInput(inputId: string) {
    WindowObj.document.getElementById(inputId).value = null;
  }

  updateSettings(form: any) {
    const formData = this.utilityService.ngFormToFormData(form);
    this.putService.updateSettings(this.youCopy.id, formData).then((response: any) => {
      if (response.error) {
        this.utilityService.flashMessage(response.message, 'is-danger', 3);
        return;
      }
    });
  }
}

App.component('userpageSettings', {
  templateUrl: `/html/templates/userpage-settings.component.html`,
  bindings: {
    you: '<',
    onUpdated: '&'
  },
  controller: UserpageSettingsComponent
});
