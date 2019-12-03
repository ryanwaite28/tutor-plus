App.service('socketService', class SocketService {
  constructor() {
    this.socket = window.io(window.location.origin);
    this.socket.on('connect', function(event){
      console.log('Socket Connected!', event);
    });

    // socket.on('event', function(data){
    //   console.log(data);
    // });

    this.socket.on('disconnect', function(event){
      console.log(event);
    });
  }
});