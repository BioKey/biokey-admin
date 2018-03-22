import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: Ember.inject.service(),
  spinner: Ember.inject.service('spinner'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  model() {
    return this.get('currentUser');
  },

  sessionAuthenticated() {
    this._super(...arguments);
    // Unlike the model hooks, this doesn't block! Will need to call again in index.js.
    return this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch((err) => {
      this.set('errorMessage', err);
    });
  }
});

