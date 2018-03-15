import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  machine: DS.belongsTo('machine'),
  isLocked: DS.attr(),
  lastHeartbeat: DS.attr('date'),
  challengeStrategies: DS.attr()
});
