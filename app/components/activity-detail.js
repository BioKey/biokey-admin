import Ember from 'ember';

export default Ember.Component.extend({
  activity: null,
  spinner: Ember.inject.service('spinner'),
  typingProfileName: Ember.computed('activity', function() {
  	let userName = this.get('activity.typingProfile.user.name');
  	let machineName = this.get('activity.typingProfile.machine.mac');

  	return `User: ${userName}; Machine: ${machineName}`;
  })
});