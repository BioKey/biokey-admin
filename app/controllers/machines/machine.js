import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete() {
      this.transitionToRoute('machines');
    },
    refreshProfiles() {
		return this.get('store').findAll('typing-profile');
	}
  }
});
