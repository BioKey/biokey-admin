import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
    goToProfile(profileId) {
      this.transitionToRoute('profiles.profile', profileId);
    },
    cancel() {
      this.transitionToRoute('profiles');
    }
  }
});
