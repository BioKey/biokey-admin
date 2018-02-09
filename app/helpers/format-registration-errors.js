import Ember from 'ember';

export function formatRegistrationErrors(error) {
  return JSON.stringify(error);
}

export default Ember.Helper.helper(formatRegistrationErrors);