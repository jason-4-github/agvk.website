import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import { styles } from '../styles';
import { doTransferItemDetailData } from '../actions';

class ItemCube extends React.Component {
  showData(data) {
    const { doTransferItemDetailData } = this.props;
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <Col style={styles.Col} key={k} xs={12} sm={6} md={6} lg={6} >
          <Card
            style={styles.ItemCube.rectangle}
            onClick={() => {
              return (
              browserHistory.push(`/admin/inventory/all-items/${i.ItemName}`),
              doTransferItemDetailData({ detailData: data[k] }));
            }}
          >
            <CardText>
              <Col xs={6} sm={6} md={4}>
                <div style={styles.ItemCube.Circle} />
              </Col>
              <Col xs={6} sm={6} md={8}>
                <b>Item Name:</b><u>{i.ItemName}</u>
                <br />
                <b>Part_No:</b><u>&emsp;&nbsp;{i.ItemName}</u>
                <br />
                <b>Qty:</b><u>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;{i.ItemCount}</u>
                <br />
                <b>Status:</b>
                <br />
              </Col>
            </CardText>
          </Card>
        </Col>,
      );
    });
    return (rootDom);
  }
  render() {
    const { data } = this.props;
    if (document.readyState !== 'complete') {
      return (
        <Row style={styles.Row}>
          <font size="5"><center>Loading of the site, please later....</center></font>
          <LinearProgress
            mode="indeterminate"
            style={{ width: '90%', marginLeft: '5%' }}
          />
        </Row>
      );
    }
    return (
      <Row style={styles.ItemCube.RowPageSize}>
        {data ? this.showData(data) : '' };
      </Row>
    );
  }
}

ItemCube.propTypes = {
  data: PropTypes.array,
};
ItemCube.defaultProps = {
  data: [],
};
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
export default connect(
  mapStateToProps,
  {
    doTransferItemDetailData,
  },
)(ItemCube);
