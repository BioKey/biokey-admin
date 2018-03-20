import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		delete() {
			this.transitionToRoute('profiles');
		},
		onRefresh(start, end, typingProfile) {
			return this.get('store').query('analysis-result', {start: start, end: end, typingProfile: typingProfile.id});
		}
	}
});