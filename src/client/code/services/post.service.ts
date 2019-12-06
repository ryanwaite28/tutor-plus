class PostService {
  static $inject = [
    'clientService'
  ];

  constructor(private clientService: any) {}

  signUp(data: object | FormData) {
    return this.clientService.sendRequest('/users', 'POST', data, null);
  }
}

App.service('postService', PostService);
