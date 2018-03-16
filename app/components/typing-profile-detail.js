import Ember from 'ember';

export default Ember.Component.extend({
  typingProfile: null,
  selectedUser: null,
  selectedMachine: null,
  selectedStrategies: null,
  spinner: Ember.inject.service('spinner'),
  currentUser: Ember.inject.service(),
  errors: Ember.A([]),

  init() {
    this._super(...arguments);
    this.set('selectedStrategies', this.get('typingProfile.challengeStrategies'));
  },

  saveProfile() {
    this.get('spinner').show('page-spinner');
    this.set('typingProfile.challengeStrategies', this.get('selectedStrategies'));
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
    },
    createStrategy(strategy) {
      if (!this.get('selectedStrategies').includes(strategy)) {
        this.get('selectedStrategies').pushObject(strategy);
      }
    },
    toggleLocked() {
      let result = confirm("Are you sure you want to remotely change the status?");
      if (result) {
        this.toggleProperty('typingProfile.isLocked');
        this.saveProfile();
      }
    }
  }
});
