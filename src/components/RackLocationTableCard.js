import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';
import { connect } from 'react-redux';

import { doHighlightLocations } from '../actions';

class RackLocationTableCard extends React.Component {
  static showData(data) {
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <TableRow key={k} selected={false}>
          <TableRowColumn>{i.rackName}</TableRowColumn>
          <TableRowColumn>{i.rackLocation}</TableRowColumn>
        </TableRow>);
    });
    return (rootDom);
  }
  render() {
    const { data } = this.props;
    return (
      <Card>
        <CardText>
          <Table
            height="450px"
            fixedHeader
            selectable={false}
            multiSelectable={false}
            onRowHover={(i) => {
              const { doHighlightLocations } = this.props;
              doHighlightLocations({
                highlightLocations: [data[i].rackLocation.trim()],
                focusHighLightLocation: data[i].rackLocation.trim(),
              });
            }}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn tooltip="Rack No.">Rack No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="Rack Location">Location</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway
              showRowHover
              stripedRows={false}
            >
              { data
                  ? RackLocationTableCard.showData(data)
                  : ''
              }
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}

RackLocationTableCard.propTypes = {
  data: PropTypes.array,
  doHighlightLocations: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doHighlightLocations,
  },
)(RackLocationTableCard);
