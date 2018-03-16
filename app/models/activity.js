import DS from 'ember-data';

export default DS.Model.extend({
	timestamp: DS.attr('date'),
	typingProfile: DS.belongsTo('typing-profile'),
	activityType: DS.attr(),
	initiatedBy: DS.attr()
});
