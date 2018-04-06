import Ember from 'ember';

export default Ember.Component.extend({
    query: null,
    activities: null,
    paginatedActivities: null,
    serverPaginated: true,
    page: 1,
    totalPages: Ember.computed.alias('activities.meta.pages'),
    recordsPerPage: 50,

    sortingKey: ['timestamp:desc'],
    sortingKeyServer: "{'timestamp' : -1}",
    filteredSortedActivities: Ember.computed.sort('filteredActivities', 'sortingKey'),

    didReceiveAttrs() {
        this._super(...arguments);
        this.pageChanged();
    },

    pageChanged: function() {
        if (this.get('serverPaginated')) {
            this.set('activities', this.get('retrieveActivities')(this.get('page'), this.get('recordsPerPage'), this.get('sortingKeyServer')));
            this.set('paginatedActivities', this.get('activities'));
        } else {
            this.set('activities.meta', {pages: Math.ceil(this.get('activities').length / 1.0 / this.get('recordsPerPage'))});
            this.set('paginatedActivities', this.get('activities').slice(
                (this.get('page') - 1) * this.get('recordsPerPage'), this.get('page') * this.get('recordsPerPage')));
        }
    },

    filteredActivities: Ember.computed('query', 'paginatedActivities', function() {
        let _query = this.get('query');
        const records = this.get('paginatedActivities'); 

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
    }),

    actions: {
        onPageChange() {
            this.pageChanged();
        }
    }
});
