class SocketService {
  socket: any;
  constructor() {
    this.socket = WindowObj.io(window.location.origin);
    this.socket.on('connect', (event: any) => {
      console.log('Socket Connected!', event);
    });

    // socket.on('event', function(data){
    //   console.log(data);
    // });

    this.socket.on('disconnect', (event: any) => {
      console.log(event);
    });
  }

  getUserEventListenerName(user: { uuid: string }) {
    const eventName = `for-user:${user.uuid}`;
    return eventName;
  }
}

App.service('socketService', SocketService);
