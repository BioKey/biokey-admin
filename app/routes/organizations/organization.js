import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('organization', params.org_id);
  },
  setupController(controller, model) {
    controller.set('org', model);
    this.store.query('user', {organization: model.id}).then(function(users) {
      controller.set('users', users);
    });
  }
});  