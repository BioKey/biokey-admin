import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('typing-profile', params.profile_id);
  },
  setupController(controller, model) {
    controller.set('profile', model);
    this.get('store').findAll('machine').then(function(machines) {
			controller.set('machines', machines);
    });
    this.get('store').findAll('activity').then(function(activities) {
      controller.set('activities', activities);
    });
  }
});