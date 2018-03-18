import Ember from 'ember';

export default Ember.Controller.extend({
    sortingKey: ['name'],
    sortedModel: Ember.computed.sort('model', 'sortingKey')
});
