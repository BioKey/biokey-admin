import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('activity', params.activity_id);
  },
  setupController(controller, model) {
    controller.set('activity', model);
  }
});  