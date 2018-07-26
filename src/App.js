import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

function isSearched(searchTerm) { // TEST!
  return function(item) {
    // условие, возвращающее true или false
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // list,
      searchTerm: '',

      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);

    // this.setState({ result: Object.assign({}, this.state.result, { hits: updatedHits }) }); // 1 способ
    this.setState({ result: { ...this.state.result, hits: updatedHits } }); // 2 способ
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state; // ПОтестить
    console.log(result)

    // if (!result) { return null; }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
        </div>
        {result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>}
        {/* {result ? <Table/> : null} - 2 вариант условной отрисовки*/}
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  // const { value, onChange, children } = props; - переносим деструкт в параметры функции
  <form>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={children}
    />
  </form>;

const Table = ({ list, pattern, onDismiss }) => {
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span>
            <a href={item.url} style={largeColumn}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style={smallColumn}>
            {/* <button
              onClick={() => onDismiss(item.objectID)}
              type="button"
            >
              Отбросить
            </button> */}
            <Button onClick={() => onDismiss(item.objectID)} className="button-inline">Отбросить</Button>
          </span>
        </div>
      )}
    </div>
  );
}

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


export default App;
