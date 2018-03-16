import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete() {
      this.transitionToRoute('users');
    },
    refreshProfiles() {
		return this.get('store').findAll('typing-profile');
	}
  }
});
