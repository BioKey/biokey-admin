import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToOrg(orgId) {
      this.transitionToRoute('organizations.organization', orgId);
    },
    cancel() {
      this.transitionToRoute('organizations');
    }
  }
});
