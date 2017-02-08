import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import _ from 'lodash';

import { styles } from '../styles';

class PageNavigator extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.wrapper}>
          {this.showDom()}
        </div>
        <Divider style={styles.Divider} />
      </div>
    );
  }
  showDom() {
    const { pages } = this.props;
    const rootDom = [];
    _.map(pages, function(p, k) {
      if (k === 0) {
        rootDom.push(
          <div key={k}>
            <Chip>{p}</Chip>
          </div>
        );
      } else {
        rootDom.push(
          <div key={k} style={styles.wrapper}>
            <FontIcon
              className="material-icons"
              style={styles.arrow}>
              navigate_next
            </FontIcon>
            <Chip>{p}</Chip>
          </div>
        );
      }
    });
    return rootDom;
  }
};

PageNavigator.propTypes = {
  pages: PropTypes.array
};

export default PageNavigator;
