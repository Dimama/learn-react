import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  
  state = {
    text: ""
  };
  
  onChangeValue = (e) => {
    const text = e.target.value;
    this.setState({text})
    this.props.onSearchChangeValue(text);
  };
  
  render() {
    return (
        <input type="text"
               className="form-control search-input"
               placeholder="type to search"
               onChange={this.onChangeValue}
               value={this.state.text}
        />
    );
  }
}
