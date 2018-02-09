import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),
  errors:  Ember.A([]),
  actions: {
    submit(){
      var credentials = this.getProperties('name', 'email', 'password');
      this.get('session').authenticate('authenticator:custom', {
        method: 'register',
        credentials
      }).catch((err) => {
        this.get('errors').pushObjects(err);
      });
    }
  }
});