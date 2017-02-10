import React, { PropTypes } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Checkbox from 'material-ui/Checkbox';

import { styles } from '../styles';

class ItemGreneralInfo extends React.Component {
  render() {
    return (
      <Grid>
        <Row style={styles.Row}>
          <Col xs={6} sm={6} md={4}>
            <div style={styles.ItemGreneralInfo.circle} />
          </Col>
          <Col xs={6} sm={6} md={8}>
            <Checkbox label="Available for Issue" />
            <Checkbox label="Shortage" />
            <Checkbox label="" />
            <Checkbox label="" />
          </Col>
        </Row>
        <Row style={styles.Row}>
          <Col>
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
                </tr>
                <tr>
                  <td style={styles.ItemGreneralInfo.tableTd}>
                    <b>Dimension:</b>
                  </td>
                  <td />
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}
ItemGreneralInfo.propTypes = {
  Greneraldata: PropTypes.object,
};
export default ItemGreneralInfo;
