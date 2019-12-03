App.service('getService', class GetService {
  static $inject = [
    'clientService',
    'stateService'
  ];

  constructor(clientService, stateService) {
    this.clientService = clientService;
    this.stateService = stateService;
  }

  checkSession() {
    return this.stateService.session || this.clientService.sendRequest('/users/check_session', 'GET', null, null).then((response) => {
      this.stateService.session = response;
      return response;
    });
  }

  signOut() {
    return this.clientService.sendRequest('/users/sign_out', 'GET', null, null);
  }

  getUserById(id) {
    return this.clientService.sendRequest(`/users/${id}`, 'GET', null, null);
  }
});
