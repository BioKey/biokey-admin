import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  email: DS.attr(),
  isAdmin: DS.attr(),
  phoneNumber: DS.attr(),
  organization: DS.belongsTo('organization'),
  password: DS.attr()
});
