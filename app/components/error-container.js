import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dismiss(index) {
      this.get('errors').removeAt(index);
    }
  }
});
