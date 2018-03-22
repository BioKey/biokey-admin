import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service('session'),
  currentUser: service(),

  beforeModel() {
  	return this.get('currentUser').load();
  },

  model() {
  	if (this.get('session.isAuthenticated')) {
  		if (this.get('currentUser.user.isAdmin')) this.transitionTo('dashboard');
  		else this.transitionTo('users.user', this.get('currentUser.user.id')); 
    } else this.transitionTo('login');
  }
});
