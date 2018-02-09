import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  spinner: Ember.inject.service('spinner'),
  errors:  Ember.A([]),
  actions: {
    save() {
      this.get('spinner').show('page-spinner');
      this.get('user').save()
      .catch(err => {
        if(err.errors) {
          Ember.Logger.error(err)
          this.get('errors').pushObjects(err.errors);
        }
      })
      .then(user => {
        this.get('spinner').hide('page-spinner');
        let userId = this.get('user').id;
        if (userId && this.get('onSave')) this.get('onSave')(userId);
      });
    },
    undo() {
      let result = confirm("Are you sure you want to undo changes?");
      if (result) {
        if (!this.get('user.hasDirtyAttributes')) return;
        this.get('user').rollbackAttributes();
      }
    },
    delete() {
      let result = confirm("Are you sure you want to delete?");
      if (result) {
        this.get('user').destroyRecord()
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
