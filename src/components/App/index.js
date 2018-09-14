import React, { Component } from 'react';
import * as api from '../../api';

import Search from '../Search';
import Table from '../Table';
import Button from '../Button';

import './style.css';

class App extends Component {
  state = {
    results: null,
    searchKey: '',
    searchTerm: api.DEFAULT_QUERY,
    error: null
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${api.PATH_BASE}${api.PATH_SEARCH}?${api.PARAM_SEARCH}${searchTerm}&${api.PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error: error }));
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onDismiss = (id) => () => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ searchTerm: value });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Поиск</Search>
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            Больше историй
          </Button>
        </div>
      </div>
    )
  }
}

export default App;
