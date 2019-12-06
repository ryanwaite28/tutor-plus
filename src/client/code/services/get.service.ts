class GetService {
  static $inject = [
    'clientService',
    'stateService'
  ];


  constructor(private clientService: any, private stateService: any) {}

  checkSession() {
    return this.stateService.session || this.clientService.sendRequest('/users/check_session', 'GET', null, null).then((response: any) => {
      this.stateService.session = response;
      return response;
    });
  }

  signOut() {
    return this.clientService.sendRequest('/users/sign_out', 'GET', null, null);
  }

  getUserById(id: number | string) {
    return this.clientService.sendRequest(`/users/${id}`, 'GET', null, null);
  }

  getUserProfileInfoById(id: number | string) {
    return this.clientService.sendRequest(`/users/${id}/profile-info`, 'GET', null, null);
  }

  checkUserFollows(userA_id: number | string, userB_id: number | string) {
    return this.clientService.sendRequest(`/users/${userA_id}/follows/${userB_id}`, 'GET', null, null);
  }
}

App.service('getService', GetService);
