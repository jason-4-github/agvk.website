import React, { PropTypes } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import { Card, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import { styles } from '../styles';

class ItemGreneralInfo extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
          <Row style={styles.ItemGreneralInfo.rowStyle}>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Avatar src="images/uxceo-128.jpg" size={window.innerWidth * 0.25} style={styles.ItemGreneralInfo.circlePosition} />
              <br />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Row>
                <Col xs={6} sm={6} md={6}>
                  <Checkbox label="Available for Issue" />
                  <Checkbox label="Shortage" />
                  <Checkbox label="CheckBox" />
                  <Checkbox label="CheckBox" />
                </Col>
                <Col xs={6} sm={6} md={6}>
                  <Checkbox label="CheckBox" />
                  <Checkbox label="CheckBox" />
                  <Checkbox label="CheckBox" />
                  <Checkbox label="CheckBox" />
                </Col>
              </Row>
              <Row>
                <hr width="100%" />
                <Table bordered>
                  <tbody>
                    <tr>
                      <td style={styles.ItemGreneralInfo.tableTd}>
                        <b>Product Type:</b>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td style={styles.ItemGreneralInfo.tableTd}>
                        <b>Barcode:</b>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td style={styles.ItemGreneralInfo.tableTd}>
                        <b>Unit Price: </b>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td style={styles.ItemGreneralInfo.tableTd}>
                        <b>Dimension:</b>
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
}
ItemGreneralInfo.propTypes = {
  Greneraldata: PropTypes.object,
};
export default ItemGreneralInfo;
