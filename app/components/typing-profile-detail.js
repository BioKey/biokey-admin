import Ember from 'ember';

export default Ember.Component.extend({
  typingProfile: null,
  selectedUser: null,
  selectedMachine: null,
  spinner: Ember.inject.service('spinner'),
  currentUser: Ember.inject.service(),
  errors:  Ember.A([]),

  saveProfile() {
    this.get('spinner').show('page-spinner');
    this.get('typingProfile').save()
    .catch(err => {
      if(err.errors) {
        Ember.Logger.error(err)
        this.get('errors').pushObjects(err.errors);
      }
    })
    .then(typingProfile => {
      this.get('spinner').hide('page-spinner');
      let typingProfileId = this.get('typingProfile').id;
      if (typingProfileId && this.get('onSave')) this.get('onSave')(typingProfileId);
    });
  },

  actions: {
    save() {
      this.saveProfile();
    },
    undo() {
      let result = confirm("Are you sure you want to undo changes?");
      if (result) {
        if (!this.get('typingProfile.hasDirtyAttributes')) return;
        this.get('typingProfile').rollbackAttributes();
      }
    },
    delete() {
      let result = confirm("Are you sure you want to delete?");
      if (result) {
        this.get('typingProfile').destroyRecord()
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
    selectUser(user) {
      this.get('typingProfile').set('user', user);
      this.set('selectedUser', user);
    },
    selectMachine(machine) {
      this.get('typingProfile').set('machine', machine);
      this.set('selectedMachine', machine);
    }
  }
});
