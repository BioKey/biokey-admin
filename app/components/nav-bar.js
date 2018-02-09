import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service('session'),
  currentUser: service(),
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});