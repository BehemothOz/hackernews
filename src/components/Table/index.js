import React from 'react';
import Button from '../Button';

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div>
      {list.map(item =>
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
              Remove
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;