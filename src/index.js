import React from 'react';
import addons from '@storybook/addons';

import { ORG_KEY, ADDON_KEY, WITH_COMPODOC_KEY } from './constants';

export const withCompodoc = (storyFn, opts = {}) =>
  ((context) => {
    const channel = addons.getChannel();
    const story = storyFn(context);

    channel.emit(`${ORG_KEY}/${ADDON_KEY}/${WITH_COMPODOC_KEY}`, opts, story.component.name);

    return story
  })


