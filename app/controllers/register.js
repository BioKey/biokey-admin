// app/controllers/login.js
import Ember from 'ember';

export default Ember.Controller.extend({  
  session: Ember.inject.service(),
  queryParams: ['orgId', 'orgName'],
  organization: null,
  actions: {
    register: function() {
      var credentials = this.getProperties
        ('name', 'email', 'password'),
        authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).catch((reason)=>{
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});