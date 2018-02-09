import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToUser(userId) {
      this.transitionToRoute('users.user', userId);
    },
    cancel() {
      this.transitionToRoute('users');
    }
  }
});
