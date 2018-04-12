import React from 'react';
import addons from '@storybook/addons';

import { ORG_KEY, ADDON_KEY, WITH_COMPODOC_KEY } from './constants';

export const withCompodoc = (storyFn, opts = {}) =>
  ((context) => {
    const channel = addons.getChannel();
    const story = storyFn(context);
    const componentName = story.component ? story.component.name : story.componentName;

    channel.emit(`${ORG_KEY}/${ADDON_KEY}/${WITH_COMPODOC_KEY}`, opts, componentName);

    return story
  })


