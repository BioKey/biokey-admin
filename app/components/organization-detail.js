import Ember from 'ember';

export default Ember.Component.extend({
  org: null,
  spinner: Ember.inject.service('spinner'),
  errors:  Ember.A([]),

  saveOrg() {
    this.get('spinner').show('page-spinner');
    this.get('org').save()
    .catch(err => {
      if(err.errors) {
        Ember.Logger.error(err)
        this.get('errors').pushObjects(err.errors);
      }
    })
    .then(user => {
      this.get('spinner').hide('page-spinner');
      let orgId = this.get('org').id;
      if (orgId && this.get('onSave')) this.get('onSave')(orgId);
    });
  },

  actions: {
    save() {
      this.saveOrg();
    },
    undo() {
      let result = confirm("Are you sure you want to undo changes?");
      if (result) {
        if (!this.get('org.hasDirtyAttributes')) return;
        this.get('org').rollbackAttributes();
      }
    },
    delete() {
      let result = confirm("Are you sure you want to delete?");
      if (result) {
        this.get('org').destroyRecord()
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
