import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import { styles } from '../styles';
import { doAllItemsDetailData } from '../actions';

class PageListItem extends React.Component {
  showData(data) {
    const { doAllItemsDetailData } = this.props;
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <Col style={styles.Col} key={k} xs={12} sm={6} md={6} lg={6} >
          <Card
            style={styles.PageListItem.rectangle}
            onClick={() => {
              return (
              browserHistory.push(`/admin/inventory/all-items/${i.ItemName}`),
              doAllItemsDetailData({ DetailData: data[k] }));
            }}
          >
            <CardText>
              <Col xs={6} sm={6} md={4}>
                <div style={styles.PageListItem.Circle} />
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
      <Row style={styles.PageListItem.RowPageSize}>
        {data ? this.showData(data) : '' };
      </Row>

    );
  }
}

PageListItem.propTypes = {
  data: PropTypes.array,
};
PageListItem.defaultProps = {
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
    doAllItemsDetailData,
  },
)(PageListItem);
