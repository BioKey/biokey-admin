// app/authenticators/custom.js
import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
  authEndpoint: `${config.host}/api/auth/`,
  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: this.authEndpoint + options.method,
        type: 'POST',
        data: JSON.stringify(options.credentials),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then(function(response) {
        Ember.run(function() {
          const { token } = response;
          resolve({
            token
          });
        });
      }, function(xhr, status, error) {
        var response = xhr.responseText;
        Ember.run(function() {
          reject(response);
        });
      });
    });
  },

  invalidate() {
    return Ember.RSVP.resolve();
  }
});