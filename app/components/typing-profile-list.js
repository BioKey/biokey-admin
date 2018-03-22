import Ember from 'ember';

export default Ember.Component.extend({
	query: null,
	typingProfiles: null,
	isActivePeriod: 30000, // 30 seconds
	
	sortingKey: ['user.name', 'machine.mac'],
	filteredSortedProfiles: Ember.computed.sort('filteredTypingProfilesWithStatus', 'sortingKey'),

	init() {
		this._super(...arguments);
		this._poll(10000);
	},

	_poll(interval) {
		let self = this;
		if (!self.isDestroyed) {
		  if (this.get('refreshProfiles')) {
			this.get('refreshProfiles')().then(profiles => {
			  if (!self.isDestroyed) {
				self.set('typingProfiles', profiles);
			  }
			});
		  }
		}
		Ember.run.later(() => this._poll(interval), interval);
	},

  typingProfilesWithStatus: Ember.computed('typingProfiles.@each.lastHeartbeat', 'typingProfiles.@each.isLocked', function() {
    let self = this;
    return this.get('typingProfiles').map(function(profile, index) {
      profile.set('isActive', (new Date).getTime() - profile.get('lastHeartbeat') < self.get('isActivePeriod'));
      return profile;
    });
  }),

	filteredTypingProfilesWithStatus: Ember.computed('query', 'profiles', function() { 
        let _query = this.get('query');
        const records = this.get('typingProfilesWithStatus'); 
     
        if (Ember.isEmpty(_query)) { 
          return records;
        }
     
        _query = _query.toLowerCase();

		if (_query == 'locked') return this.filterByLockStatus(true, records);
		if (_query == 'unlocked') return this.filterByLockStatus(false, records);
		if (_query == 'online') return this.filterByOnlineStatus(true, records);
		if (_query == 'offline') return this.filterByOnlineStatus(false, records);
		else return this.filterByOther(_query, records);
	}),
	
	filterByOther: function(_query, records) {
		return records.filter(function(profile) { 
			if (profile.get('user') && profile.get('machine')) {
			  if (
				  profile.get('user').get('name').toLowerCase().match(_query) || 
				  profile.get('machine').get('mac').toLowerCase().match(_query)
			  ) { 
				  return true; 
			  } 
			}
			return false; 
		});
	},

	filterByLockStatus: function(query, records) {
		return records.filter(function(profile) {
			if (profile.get('user') && profile.get('machine')) {
				if (profile.get('isLocked') == query) return true;
			}
			return false;
		});
	},

	filterByOnlineStatus: function(query, records) {
		return records.filter(function(profile) {
			if (profile.get('user') && profile.get('machine')) {
				if (profile.get('isActive') == query) return true;
			}
			return false;
		});
	}
});