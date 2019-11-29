App.service('clientService', class ClientService {
  constructor() {}

  sendRequest(route, method, data, content_type) {
    const obj = {
      method: method || "GET",
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }

    if(data) {
      if(data.constructor === Object) {
        obj.body = JSON.stringify(data);
        obj.headers["Content-Type"] = content_type || "application/json";
      }
      if(data.constructor === FormData) {
        obj.body = data;
      }
    }

    return fetch(route, obj).then((resp) => resp.json());
  }
});