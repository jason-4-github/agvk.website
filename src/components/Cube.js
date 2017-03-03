import React, { PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import numeral from 'numeral';

import { styles } from '../styles';

class Cube extends React.Component {
  render() {
    const { title, subtitle, value } = this.props;
    return (
      <Card style={styles.Cube.card}>
        <CardHeader
          title={title}
          subtitle={subtitle}
          style={styles.Cube.card.header}
          titleStyle={styles.Cube.card.titleStyle}
        />
        <CardText style={styles.Cube.card.value}>
          <Divider />
          {numeral(value).format('0,0')}
        </CardText>
      </Card>
    );
  }
}

Cube.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.number,
};

export default Cube;
