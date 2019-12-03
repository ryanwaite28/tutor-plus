App.component('userpageSettings', {
  templateUrl: `/html/templates/userpage-settings.component.html`,
  bindings: {
    you: '<',
    onUpdated: '&'
  },
  controller: class UserpageSettingsComponent {
    static $inject = [
      '$scope',
      'putService',
      'utilityService',
      'stateService',
    ];

    constructor($scope, putService, utilityService, stateService) {
      this.$scope = $scope;
      $scope.controllerClass = this;
      this.putService = putService;
      this.utilityService = utilityService;
      this.stateService = stateService;
      this.youCopy = {};
    }

    $onInit() {
      console.log(this);
      this.youCopy = { ...this.you };
    }

    clearFileInput(inputId) {
      window.document.getElementById(inputId).value = null;
    }

    updateSettings(form) {
      this.requestInProgress = true;
      const formData = this.utilityService.ngFormToFormData(form);
      this.putService.updateSettings(formData).then((response) => {
        this.requestInProgress = false;
        const className = response.error ? 'is-danger' : 'is-success';
        this.utilityService.flashMessage(response.message, className, 3);
        if (response.error) {
          return;
        }
        window.document.getElementById('icon-file-input').value = null;
        window.document.getElementById('wallpaper-file-input').value = null;
        
        this.onUpdated({ user: response.user });
      });
    }
  }
});