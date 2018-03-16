import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),

  beforeModel() {
    if (this.get('currentUser.user.isAdmin') == false) this.transitionTo('');
  }

});