/* eslint ember/no-on-calls-in-components: 0 */

import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import { EKMixin as EmberKeyboard, keyUp } from 'ember-keyboard';
import layout from '../templates/components/x-slides';

export default Component.extend(EmberKeyboard, {
  layout,
  slidesService: inject(),
  role: 'screen',

  init() {
    this._super(...arguments);
    this.set('keyboardActivated', true);
  },

  currentComponentPath: computed('role', 'slidesService.current', function() {
    let role = this.get('role');
    let current = this.get('slidesService.current');

    if (role === 'screen') {
      return current.screenComponentPath;
    } else if (role === 'presenter') {
      return current.presenterComponentPath;
    } else if (role === 'audience') {
      return current.audienceComponentPath;
    }
  }),

  onLeft: on(keyUp('ArrowLeft'), function() {
    this.get('slidesService').previous();
  }),

  onRight: on(keyUp('ArrowRight'), keyUp('Space'), keyUp('Enter'), function() {
    this.get('slidesService').next();
  })
});
