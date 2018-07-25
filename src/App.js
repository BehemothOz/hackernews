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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      isToggleOn: true
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    // console.log(this);
    return (
      <div className="App">
        {this.state.list.map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button onClick={this.onDismiss.bind(this, item.objectID)} type="button">
                  Отбросить
                </button>
              </span>
              <span>
                <button onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
              </span>
            </div>
          )
        })}
      </div>
    );
  }
}

// console.log(new App());

export default App;
