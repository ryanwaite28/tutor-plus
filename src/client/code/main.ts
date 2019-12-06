const WindowObj = (<any> window);
const App = WindowObj.angular.module('tutorPlusApp', []);

App.config(['$interpolateProvider', ($interpolateProvider: any) => {
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))');
}]);

WindowObj.$(document).ready(() => {
  // Check for click events on the navbar burger icon
  WindowObj.$('.navbar-burger').click(() => {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      WindowObj.$('.navbar-burger').toggleClass('is-active');
      WindowObj.$('.navbar-menu').toggleClass('is-active');

  });
});
