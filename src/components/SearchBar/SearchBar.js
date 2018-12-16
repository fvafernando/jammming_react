import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(event) {
    if (event.type === 'click' ||
      (event.type === 'keypress' && event.key === 'Enter')
    ) {
      this.props.onSearch(this.state.term);
    }
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  render() {
    console.log("Rendering SearchBar");
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onKeyPress={this.search} onChange={this.handleTermChange}/>
        <a href="#search" onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
