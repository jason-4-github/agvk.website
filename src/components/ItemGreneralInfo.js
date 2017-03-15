import React, { PropTypes } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

import { styles } from '../styles';
const circleHeightwidth = document.documentElement.clientHeight * 0.3;
class ItemGreneralInfo extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
          <Row style={styles.ItemGreneralInfo.rowStyle}>
            <Col xs={6} sm={6} md={4}>
              <div
                style={{
                  backgroundColor: '#dddddd',
                  height: circleHeightwidth,
                  width: circleHeightwidth,
                  borderRadius: circleHeightwidth,
                }}
              />
            </Col>
            <Col xs={6} sm={6} md={8}>
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
