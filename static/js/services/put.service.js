App.service('putService', class PutService {
  static $inject = [
    'clientService'
  ];

  constructor(
    clientService
  ) {
    this.clientService = clientService;
  }

  signIn(data) {
    return this.clientService.sendRequest('/users', 'PUT', data, null);
  }
});
