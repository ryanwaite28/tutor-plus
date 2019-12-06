class UserService {
  navigateToUserPage(user: { id: number }) {
    window.location.href = `/users/${user.id}`;
  }
}

App.service('userService', UserService);
