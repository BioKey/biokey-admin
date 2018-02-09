import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('users', function() {
    this.route('user', {path: ':user_id'});
    this.route('list', {path: ''});
    this.route('new');
  });
  this.route('machines', function() {
    this.route('list', {path: ''});
    this.route('machine', {path: ':machine_id'});
    this.route('new');
  });
  this.route('organizations', function() {
    this.route('organization', {path: ':org_id'});
    this.route('list', {path: ''});
    this.route('new');
  });
  this.route('me');
  this.route('profiles', function() {
    this.route('list', {path: ''});
    this.route('profile', {path: ':profile_id'});
  });
});

export default Router;
