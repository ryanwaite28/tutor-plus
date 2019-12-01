App.service('getService', class GetService {
  static $inject = [
    'clientService'
  ];

  constructor(
    clientService
  ) {
    this.clientService = clientService;
  }

  checkSession() {
    return this.clientService.sendRequest('/users/check_session', 'GET', null, null);
  }

  signOut() {
    return this.clientService.sendRequest('/sign_out', 'GET', null, null);
  }

  getUserById(id) {
    return this.clientService.sendRequest(`/users/${id}`, 'GET', null, null);
  }
});
