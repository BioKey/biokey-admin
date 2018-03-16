import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),

  beforeModel() {
    if (this.get('currentUser').get('user').get('isAdmin') == false) this.transitionTo('');
  }

});