import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	currentUser: Ember.inject.service(),

  model() {
  	if (this.get('currentUser.user.isAdmin') == true) {
	    return this.get('store').findAll('user')
	  }
  }
});