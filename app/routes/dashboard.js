import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service(),
    model() {
        return this.get('store').findAll('activity')
          .then(activities => activities.filter((activity) => {
            return activity.get('activityType') != 'INFO';
          }));
    },

    setupController(controller, model) {
      this._super(controller, model);
      controller.set('user', this.get('currentUser.user'));
    }
});
