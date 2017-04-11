import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';
import { connect } from 'react-redux';

import { doHighlightLocations } from '../actions';

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
    if (window.innerWidth < 412) {
      this.setState({
        fixDataTableHeight: window.innerHeight - 200,
        fixDataTableWidth: window.innerWidth * 0.9,
        fixDataTableColumnWidth: (window.innerWidth * 0.9) / 2,
      });
    } else if (window.innerWidth >= 412 && window.innerWidth < 768) {
      this.setState({
        fixDataTableHeight: window.innerHeight - 200,
        fixDataTableWidth: window.innerWidth * 0.93,
        fixDataTableColumnWidth: (window.innerWidth * 0.93) / 2,
      });
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.setState({
        fixDataTableHeight: window.innerHeight - 200,
        fixDataTableWidth: (window.innerWidth - 251) * 0.8,
        fixDataTableColumnWidth: ((window.innerWidth - 251) * 0.8) / 2,
      });
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      this.setState({
        fixDataTableHeight: window.innerHeight - 200,
        fixDataTableWidth: (window.innerWidth - 507) * 0.8,
        fixDataTableColumnWidth: ((window.innerWidth - 507) * 0.8) / 2,
      });
    } else {
      this.setState({
        fixDataTableHeight: window.innerHeight - 200,
        fixDataTableWidth: (window.innerWidth - 507) * 0.7,
        fixDataTableColumnWidth: (((window.innerWidth - 507) * 0.7) / 2),
      });
    }
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
