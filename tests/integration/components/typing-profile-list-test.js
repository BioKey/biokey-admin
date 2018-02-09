import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('typing-profile-list', 'Integration | Component | typing profile list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{typing-profile-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#typing-profile-list}}
      template block text
    {{/typing-profile-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
