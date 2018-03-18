import Ember from 'ember';

export default Ember.Component.extend({
    query: null,
    filtered: Ember.computed('query', 'activities', function() { 
        let _query = this.get('query');
        const records = this.get('activities'); 
     
        if (Ember.isEmpty(_query)) { 
          return records;
        }
     
        _query = _query.toLowerCase();

        return records.filter(function(activity) { 
          if (activity.get('typingProfile') && activity.get('activityType') && activity.get('timestamp')) {
            if (
                activity.get('typingProfile').get('user').get('name').toLowerCase().match(_query) || 
                activity.get('typingProfile').get('machine').get('mac').toLowerCase().match(_query) ||
                activity.get('activityType').toLowerCase().match(_query)
            ) { 
                return true; 
            } 
          }
          return false; 
        });
    })
});
