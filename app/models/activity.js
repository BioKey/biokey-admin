import DS from 'ember-data';

export default DS.Model.extend({
	timestamp: DS.attr(),
	typingProfile: DS.belongsTo('typing-profile'),
	activityType: DS.attr(),
	initiatedBy: DS.attr()
});
