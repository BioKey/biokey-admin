import Ember from 'ember';

export default Ember.Component.extend({
  machine: null,
  spinner: Ember.inject.service('spinner'),
  errors:  Ember.A([]),

  saveMachine() {
    this.get('spinner').show('page-spinner');
    this.get('machine').save()
    .catch(err => {
      if(err.errors) {
        Ember.Logger.error(err);
        this.get('errors').pushObjects(err.errors);
      }
    })
    .then(user => {
      this.get('spinner').hide('page-spinner');
      let machineId = this.get('machine').id;
      if (machineId && this.get('onSave')) this.get('onSave')(machineId);
    });
  },

  actions: {
    save() {
      this.saveMachine();
    },
    undo() {
      let result = confirm("Are you sure you want to undo changes?");
      if (result) {
        if (!this.get('machine.hasDirtyAttributes')) return;
        this.get('machine').rollbackAttributes();
      }
    },
    delete() {
      let result = confirm("Are you sure you want to delete?");
      if (result) {
        this.get('machine').destroyRecord()
        .catch(err => {
          if(err.errors) {
            Ember.Logger.error(err)
            this.get('errors').pushObjects(err.errors);
          }
        })
        .then(user => {
          this.get('spinner').hide('page-spinner');
          if (this.get('onDelete')) this.get('onDelete')();
        });
      }
    },
    cancel() {
      this.get('onCancel')();
    }
  }
});
