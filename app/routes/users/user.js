import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('user', params.user_id);
  },
  setupController(controller, model) {
    controller.set('user', model);
    this.store.query('typing-profile', {user: model.id}).then(function(profiles) {
      controller.set('profiles', profiles);
    });
  }
});  