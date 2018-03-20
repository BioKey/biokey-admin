import DS from 'ember-data';

export default DS.Model.extend({
	probability: DS.attr(),
	timestamp: DS.attr(),
	typingProfile: DS.belongsTo('typing-profile'),
});
