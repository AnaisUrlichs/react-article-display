import React from 'react'
import InputWithLabel from './InputWithLabel'

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
  }) => (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong  className="search">Search:</strong>
      </InputWithLabel>
  
      <button type="submit" disabled={!searchTerm} className="submit">
        Submit
      </button>
    </form>
  )

  export default SearchForm
