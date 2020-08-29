
import React from 'react'
import Item from './Item'

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <div>
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    </div>
  ));


export default List
