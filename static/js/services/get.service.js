App.service('getService', class GetService {
  static $inject = [
    'clientService'
  ];

  constructor(
    clientService
  ) {
    this.clientService = clientService;
  }

  checkSession(data) {
    return this.clientService.sendRequest('/users/check_session', 'GET', data, null);
  }

  signOut(data) {
    return this.clientService.sendRequest('/sign_out', 'GET', data, null);
  }
});
