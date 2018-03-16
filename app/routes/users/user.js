import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	currentUser: Ember.inject.service(),
  
  model(params) {
  	if (this.get('currentUser.user.isAdmin') == false && this.get('currentUser.user.id') != params.user_id) this.transitionTo('');
    return this.get('store').findRecord('user', params.user_id);
  },
  
  setupController(controller, model) {
    controller.set('user', model);
    if (this.get('currentUser.user.isAdmin') == true) {
      this.store.query('typing-profile', {user: model.id}).then(function(profiles) {
        controller.set('profiles', profiles);
      });
    }
  }
});  