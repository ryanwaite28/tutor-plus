App.service('postService', class PostService {
  static $inject = [
    'clientService'
  ];

  constructor(
    clientService
  ) {
    this.clientService = clientService;
  }

  signUp(data) {
    return this.clientService.sendRequest('/users', 'POST', data, null);
  }
});
