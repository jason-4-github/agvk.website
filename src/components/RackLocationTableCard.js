import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';
import { connect } from 'react-redux';

import { doHighlightLocations, tableProperty } from '../actions';

class RackLocationTableCard extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    const { tableProperty } = this.props;
    tableProperty({
      columnCount: 2,
      sizeModel: 'ModelB',
    });
  }
  render() {
    const { data,
            tableHeightSize,
            tableWidthSize,
            tableColumnSize } = this.props;
    return (
      <div>
        {data
            ? <Table
              rowHeight={50}
              rowsCount={data.length}
              width={tableWidthSize}
              height={tableHeightSize}
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
                header={<Cell>Rack No.</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { data[rowIndex].rackName }
                  </Cell>
                    )}
                width={tableColumnSize}
                align="center"
              />
              <Column
                header={<Cell>Location</Cell>}
                cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  { data[rowIndex].rackLocation }
                </Cell>
                )}
                width={tableColumnSize}
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
    tableProperty,
  },
)(RackLocationTableCard);
