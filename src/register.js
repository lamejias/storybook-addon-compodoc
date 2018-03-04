import React from 'react';
import addons from '@storybook/addons';

import { ORG_KEY, ADDON_KEY, WITH_COMPODOC_KEY } from './constants';

const styles = {
  compodocFrame: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  }
};

class CompodocFrame extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { options: null, componentName: null }
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on(`${ORG_KEY}/${ADDON_KEY}/${WITH_COMPODOC_KEY}`, (options, componentName) => this.setState({ componentName, options }));
  }

  render() {
    const { componentName, options } = this.state;
    if (options && componentName) {
      return (
        <iframe
          style={styles.compodocFrame}
          src={`${options.compodocUrl}/components/${componentName}.html`}
          scrolling="no"
          frameBorder="0" />
      );
    } else {
      return (
        <div style={styles.compodocFrame}>
          <div>No Compodoc options provided!</div>
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }
}

addons.register(`${ORG_KEY}/${ADDON_KEY}`, (api) => {
  addons.addPanel(`${ORG_KEY}/${ADDON_KEY}panel`, {
    title: 'Compodoc',
    render: () => (
      <CompodocFrame channel={addons.getChannel()} api={api} />
    ),
  })
})
