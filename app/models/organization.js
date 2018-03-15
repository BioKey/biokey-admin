import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  maxUsers: DS.attr(),
  defaultChallengeStrategies: DS.attr(),
  defaultThreshold: DS.attr()
});
