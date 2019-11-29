App.service('deleteService', class DeleteService {
  static $inject = [
    'clientService'
  ];

  constructor(
    clientService
  ) {
    this.clientService = clientService;
  }
});
