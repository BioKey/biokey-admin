import Ember from 'ember';

export default Ember.Component.extend({
	url: '',
	init() {
		this._super(...arguments);
		this.set('url', window.location.href.substring(0,window.location.href.indexOf("dashboard")));
	}
});
