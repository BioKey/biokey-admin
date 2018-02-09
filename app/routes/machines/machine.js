import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('machine', params.machine_id);
  },
  setupController(controller, model) {
    controller.set('machine', model);
    this.store.query('typing-profile', {machine: model.id}).then(function(profiles) {
      controller.set('profiles', profiles);
    });
  }
});  