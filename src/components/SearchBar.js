import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

import { styles } from '../styles';
import { searchBarOptions } from '../actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  componentDidMount() {
    const { searchBarOptions, searchBarQueryStr } = this.props;
    searchBarOptions({
      filterStr: 'options',
      filterCurrectOption: '',
      queryStr: searchBarQueryStr || 'Input the text',
    });
  }
  handleQueryStrChange(e) {
    const { searchBarOptions, filterStr, filterCurrectOption } = this.props;
    searchBarOptions({
      filterStr,
      filterCurrectOption,
      queryStr: e.target.value,
    });
  }
  handleFilterChange(event) {
    const { searchBarOptions, queryStr, filters } = this.props;
    searchBarOptions({
      queryStr,
      filterStr: event,
      filterCurrectOption: filters[event],
    });
  }
  render() {
    const { filters, filterCurrectOption, queryStr, onChangeFunc } = this.props;
    const menus = [];
    _.map(filters, (value, key) => {
      menus.push(
        <MenuItem key={key} eventKey={key}>{value}</MenuItem>,
      );
    });
    return (
      <FormGroup>
        <InputGroup>
          <DropdownButton
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title={filterCurrectOption || 'options'}
            onSelect={this.handleFilterChange}
            style={styles.byItemStyle.dropDownCricleBorder}
          >
            {menus}
          </DropdownButton>
          <FormControl
            type="text"
            style={styles.byItemStyle.textInputCircleBorder}
            placeholder={queryStr}
            onChange={onChangeFunc || this.handleQueryStrChange}
          />
        </InputGroup>
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { searchBarOptions },
)(SearchBar);
