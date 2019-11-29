App.service('userService', class UserService {
  static $inject = [];

  constructor() {}

  navigateToUserPage(user) {
    window.location.href = `/users/${user.id}`;
  }
});
