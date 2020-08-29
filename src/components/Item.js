import React from 'react';

const Item = ({ item, onRemoveItem }) => (
    <div className="list">
      <span className="url">
        <a href={item.url}>{item.title}</a>
      </span>
      <span className="author">{item.author}</span>
      <span className="date">{item.created_at}</span>
      <span className="comments">{item.num_comments}</span>
      <span className="points">{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)} className="delete">
          Dismiss
        </button>
      </span>
    </div>
  );

export default Item;
