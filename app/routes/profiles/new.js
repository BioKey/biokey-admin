import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').createRecord('typing-profile', {});
	},
	setupController(controller, model) {
		controller.set('model', model);
		this.get('store').findAll('user').then(function(users) {
			controller.set('users', users);
		});
		this.get('store').findAll('machine').then(function(machines) {
			controller.set('machines', machines);
		});
	}
});