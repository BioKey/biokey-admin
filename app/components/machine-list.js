import Ember from 'ember';

export default Ember.Component.extend({
    query: null,
    sortingKey: ['organization', 'mac'],
    sortedFiltered: Ember.computed.sort('filtered', 'sortingKey'),
    filtered: Ember.computed('query', 'machines', function() { 
        let _query = this.get('query');
        const records = this.get('machines'); 
     
        if (Ember.isEmpty(_query)) { 
          return records;
        }
     
        _query = _query.toLowerCase();

        return records.filter(function(machine) { 
          if (machine.get('mac') && machine.get('organization')) {
            if (machine.get('mac').toLowerCase().match(_query) || 
            machine.get('organization').get('name').toLowerCase().match(_query)) { 
                return true; 
            } 
          }
          return false; 
        });
    })
});
