import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete() {
      this.transitionToRoute('organizations');
    }
  }
});
