import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(searchTerm) { // TEST!
  // console.log(1)
  return function(item) {
    // условие, возвращающее true или false
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      isToggleOn: true,
      searchTerm: ''
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList });
  }

  handleClick() {
    console.log(this);
    this.setState({ isToggleOn: !this.state.isToggleOn })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // console.log(this);
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
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


// console.log(new App());

export default App;
