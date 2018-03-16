import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  spinner: Ember.inject.service('spinner'),
  errors:  Ember.A([]),
  currentUser: Ember.inject.service(),
  changingPassword: false,
  confirmPassword: '',

  saveUser() {
    this.get('spinner').show('page-spinner');

    if (this.get('user.password').length < 8) {
      this.get('errors').pushObject({
        name: 'Invalid Password',
        message: 'Please enter a password 8 characters or longer'
      });
      //this.get('spinner').hide('page-spinner');
      return;
    }

    if (this.get('user.password') != this.get('confirmPassword')) {
      this.get('errors').pushObject({
        name: 'Passwords Do Not Match',
        message: 'Please double check and try again'
      });
      this.get('spinner').hide('page-spinner');
      return;
    }

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
      this.set('changingPassword', false);
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
      this.set('changingPassword', true);
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
    },
    toggleAdmin() {
      let result = confirm("Are you sure you want to change administrative privileges? Your organization will be orphaned without at least one administrator.");
      if (result) {
        this.toggleProperty('user.isAdmin');
        this.saveUser();
      }
    }
  }
});
