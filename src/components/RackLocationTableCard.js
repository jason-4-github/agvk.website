import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';
import { connect } from 'react-redux';

import { doHighlightLocations } from '../actions';
import { TableResizefunc } from '../utils/tableSize';

class RackLocationTableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixDataTableHeight: 0,
      fixDataTableWidth: 0,
      fixDataTableColumnWidth: 0,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    const sizeArrs = TableResizefunc({
      columnCount: 2,
      sizeModel: 'ModelB',
    });
    this.setState({
      fixDataTableHeight: sizeArrs[0],
      fixDataTableWidth: sizeArrs[1],
      fixDataTableColumnWidth: sizeArrs[2],
    });
  }
  render() {
    const { data } = this.props;
    const { fixDataTableHeight,
            fixDataTableWidth,
            fixDataTableColumnWidth } = this.state;
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
                header={<Cell>Rack No.</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { data[rowIndex].rackName }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Location</Cell>}
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
