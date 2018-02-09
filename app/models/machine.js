import DS from 'ember-data';

export default DS.Model.extend({
  mac: DS.attr(),
  organization: DS.belongsTo('organization')
});
