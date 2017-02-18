import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';
import { connect } from 'react-redux';

import { doHighlightLocations } from '../actions';

const fixDataTableHeight = document.documentElement.clientHeight * 0.7;
const fixDataTableWidth = document.documentElement.clientWidth * 0.4;
const fixDataTableColumnWidth = (fixDataTableWidth / 2);
class RackLocationTableCard extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data
            ? <Table
              rowHeight={50}
              rowsCount={data.length}
              width={fixDataTableWidth}
              height={fixDataTableHeight}
              headerHeight={50}
              onRowMouseEnter={(i, j) => {
                const { doHighlightLocations } = this.props;
                doHighlightLocations({
                  highlightLocations: [data[j].rackLocation.trim()],
                  focusHighLightLocation: data[j].rackLocation.trim(),
                });
              }}
            >
              <Column
                header={<Cell>rackName</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { data[rowIndex].rackName }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>rackLocation</Cell>}
                cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  { data[rowIndex].rackLocation }
                </Cell>
                )}
                width={fixDataTableColumnWidth}
                align="center"
              />
            </Table>
        : '' }
      </div>
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
