import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		refreshProfiles() {
			return this.get('store').findAll('typing-profile');
		}
	}
});
