import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  render() {

    const {onAll, onFilterActive, onFilterDone} = this.props;

    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={onAll}>All</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={onFilterActive}>Active</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={onFilterDone}>Done</button>
      </div>
    );
  }
}
