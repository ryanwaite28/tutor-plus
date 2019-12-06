class StateService {
  setState(key: string, value: any) {
    (<any> this)[key] = value;
  }
}

App.service('stateService', StateService);
