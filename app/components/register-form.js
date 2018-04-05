import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),
  orgId: null,
  errors:  Ember.A([]),
  actions: {
    submit(){
      var credentials = this.getProperties('name', 'email', 'password');
      if (this.orgId)
        credentials.organization = this.orgId;
      this.get('session').authenticate('authenticator:custom', {
        method: 'register',
        credentials
      }).catch((err) => {
        if (typeof err == 'string') {
          let objectErr = {name: "Error", message: err};
          this.get('errors').pushObject(objectErr);
        } else this.get('errors').pushObjects(err);
      });
    }
  }
});