import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    retrieveActivities(page, recordsPerPage, sort) {
		return this.get('store').query('activity', {page: page, limit: recordsPerPage, sort: sort});
	}
  }
});
