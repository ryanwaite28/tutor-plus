App.service('stateService', class StateService {
  constructor() {}

  setState(key, value) {
    this[key] = value;
  }
});