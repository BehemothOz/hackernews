import React, { Component } from 'react';
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
    title: 'Repeat React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
  }
];

class App extends Component {
  state = {
    list
  }

  onDismiss = (id) => () => {
    const { list } = this.state;
    const updatedList = list.filter(item => item.objectID !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={this.onDismiss(item.objectID)}
                type="button"
              >
                Отбросить
              </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default App;
