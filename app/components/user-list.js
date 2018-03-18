import Ember from 'ember';

export default Ember.Component.extend({
    query: null,
    filtered: Ember.computed('query', 'users', function() { 
        let _query = this.get('query');
        const records = this.get('users'); 
     
        if (Ember.isEmpty(_query)) { 
          return records;
        }
     
        _query = _query.toLowerCase();
        
        return records.filter(function(user) { 
          if(user.get('name') && user.get('organization') && user.get('email') && user.get('phoneNumber')) {
            if (user.get('name').toLowerCase().match(_query) || user.get('organization').get('name').toLowerCase().match(_query) || 
                user.get('email').toLowerCase().match(_query) || user.get('phoneNumber').toLowerCase().match(_query)) { 
                return true; 
            }
          }
          return false; 
        });
    })
});
