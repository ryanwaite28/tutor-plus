class PutService {
  static $inject = [
    'clientService'
  ];

  constructor(private clientService: any) {}

  signIn(data: object | FormData) {
    return this.clientService.sendRequest('/users', 'PUT', data, null);
  }

  updateSettings(id: number | string, data: object | FormData) {
    return this.clientService.sendRequest(`/users/${id}/settings`, 'PUT', data, null);
  }

  toggleUserFollow(userA_id: number | string, userB_id: number | string) {
    return this.clientService.sendRequest(`/users/${userA_id}/follows/${userB_id}`, 'PUT', null, null);
  }
}

App.service('putService', PutService);
