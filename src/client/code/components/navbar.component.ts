class NavbarComponent {
  static $inject = [
    'getService',
    'socketService',
    'utilityService',
  ];

  you: any;
  listening: boolean = false;
  constructor(
    private getService: any,
    private socketService: any,
    private utilityService: any,
  ) {}

  $onChanges() {
    const socket = this.socketService && this.socketService.socket;
    if (socket && this.you && !this.listening) {
      this.listening = true;
      const eventName = this.socketService.getUserEventListenerName(this.you);

      this.socketService.socket.on(eventName, (event: any) => {
        this.handleSocketEvent(event);
      });

      console.log('Listening to notification events');
    }
  }

  handleSocketEvent(event: any) {
    switch (event.eventType) {
      case 'NEW_NOTIFICATION': {
        console.log('new notification', event);
        this.utilityService.flashMessage(event.message || 'New notification', 'is-info', 3);
      }
    }
  }

  signOut() {
    this.getService.signOut().then((response: any) => {
      window.location.href = '/signin';
    });
  }
}

App.component('appNavbar', {
  templateUrl: `/html/templates/navbar.component.html`,
  bindings: {
    you: '<',
  },
  controller: NavbarComponent
});
