import React, { Component } from 'react';
import * as api from '../../api';

import Search from '../Search';
import Table from '../Table';
import Button from '../Button';

import './style.css';

class App extends Component {
  state = {
    result: null,
    searchTerm: api.DEFAULT_QUERY,
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  onSearchSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${api.PATH_BASE}${api.PATH_SEARCH}?${api.PARAM_SEARCH}${searchTerm}&${api.PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss = (id) => () => {
    const { result } = this.state;
    const updatedHits = result.hits.filter(item => item.objectID !== id);

    this.setState({ result: {...result, hits: updatedHits} });
  }

  onSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ searchTerm: value });
  }

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Поиск</Search>
        { result && <Table list={result.hits} onDismiss={this.onDismiss}/> }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            Больше историй
          </Button>
        </div>
      </div>
    )
  }
}

export default App;
