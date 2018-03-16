import Ember from 'ember';

export default Ember.Route.extend({
	currentUser: Ember.inject.service(),

	beforeModel() {
    if (this.get('currentUser.user.isAdmin') == false) this.transitionTo('');
  },
  model() {
    return this.get('store').createRecord('user', {});
  }
});
