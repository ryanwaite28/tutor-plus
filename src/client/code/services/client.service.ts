class ClientService {
  sendRequest(route: string, method: string, data: object | FormData, content_type: string) {
    const obj: any = {
      method: method || 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    };

    if (data) {
      if (data.constructor === Object) {
        obj.body = JSON.stringify(data);
        obj.headers['Content-Type'] = content_type || 'application/json';
      }
      if (data.constructor === FormData) {
        obj.body = data;
      }
    }

    const api = `/api` + route;
    return fetch(api, obj).then((resp: any) => resp.json());
  }
}

App.service('clientService', ClientService);
