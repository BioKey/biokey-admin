import Ember from 'ember';

export default Ember.Controller.extend({
    url: window.location.href.substring(0,window.location.href.indexOf("dashboard"))
});
