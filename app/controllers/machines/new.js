import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToMachine(machineId) {
      this.transitionToRoute('machines.machine', machineId);
    },
    cancel() {
      this.transitionToRoute('users');
    }
  }
});
