import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  spinner: Ember.inject.service('spinner'),
  errors:  Ember.A([]),

  saveUser() {
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
      this.set('user.password', undefined);
      let userId = this.get('user').id;
      if (userId && this.get('onSave')) this.get('onSave')(userId);
    });
  },

  actions: {
    save() {
      this.saveUser();
    },
    undo() {
      let result = confirm("Are you sure you want to undo changes?");
      if (result) {
        if (!this.get('user.hasDirtyAttributes')) return;
        this.get('user').rollbackAttributes();
      }
    },
    changePassword() {
      let newPassword = prompt("Please enter a new password", "");
      if(newPassword == null) return;
      if (newPassword.length < 7) {
        this.get('errors').pushObject({
          name: 'Invalid Password',
          message: 'Please enter a password longer than 7 characters'
        });
      }
      else {
        this.set('user.password', newPassword);
        this.saveUser();
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
