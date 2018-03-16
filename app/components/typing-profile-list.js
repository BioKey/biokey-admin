import Ember from 'ember';

export default Ember.Component.extend({
	typingProfiles: null,
	isActivePeriod: 30000, // 30 seconds
	
	typingProfilesWithStatus: Ember.computed('typingProfiles.@each.lastHeartbeat', 'typingProfiles.@each.isLocked', function() {
		let self = this;
		return this.get('typingProfiles').map(function(profile, index) {
			profile.set('isActive', (new Date).getTime() - profile.get('lastHeartbeat') < self.get('isActivePeriod'));
			return profile;
		});
	}),

	init() {
		this._super(...arguments);
		this._poll(10000);
	},

	_poll(interval) {
		let self = this;
		if (this.get('refreshProfiles')) {
			this.get('refreshProfiles')().then(profiles => {
				if (!self.isDestroyed) {
					self.set('typingProfiles', profiles);
				}
			});
		}
		Ember.run.later(() => this._poll(interval), interval);
	}
});