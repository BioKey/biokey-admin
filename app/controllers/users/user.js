import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete() {
      this.transitionToRoute('users');
    },
    refreshProfiles(userId) {
		  return this.get('store').query('typing-profile', {user: userId});
	  }
  }
});
