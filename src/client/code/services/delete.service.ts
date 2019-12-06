class DeleteService {
  static $inject = [
    'clientService'
  ];

  constructor(private clientService: any) {}
}

App.service('deleteService', DeleteService);
