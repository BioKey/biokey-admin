import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  maxUsers: DS.attr(),
  challengeStrategies: DS.attr(),
  defaultThreshold: DS.attr()
});
