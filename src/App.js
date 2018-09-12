import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = (searchTerm) => {
  return (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());
}

class App extends Component {
  state = {
    result: null,
    searchTerm: DEFAULT_QUERY,
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    console.log(result)
    this.setState({ result });
  }

  onDismiss = (id) => () => {
    const { result } = this.state;
    const updatedHits = result.hits.filter(item => item.objectID !== id);

    console.log(id)

    this.setState({ result: {...result, hits: updatedHits} });
  }

  onSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ searchTerm: value });
  }

  render() {
    const { result, searchTerm } = this.state;
    console.log(!!result)

    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
        { result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/> }
      </div>
    )
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button
              onClick={onDismiss(item.objectID)}
              type="button"
            >
              Отбросить
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

const Button = ({ onClick, className = '', children }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export default App;
