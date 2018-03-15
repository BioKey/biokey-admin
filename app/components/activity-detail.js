import Ember from 'ember';

export default Ember.Component.extend({
  activity: null,
  spinner: Ember.inject.service('spinner'),
  typingProfileName: Ember.computed('activity', function() {
  	let userName = this.get('activity').get('typingProfile').get('user').get('name');
  	let machineName = this.get('activity').get('typingProfile').get('machine').get('mac');

  	return `User: ${userName}; Machine: ${machineName}`;
  })
});