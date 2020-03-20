import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal'
import useFetch from '../../hooks/fetch'
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [filter, setFilter] = useState('')
  const filterRef = useRef()
  const { isLoading, data, error, sendRequest, clear } = useFetch()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === filterRef.current.value) {
        const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`
        sendRequest('https://react-hooks-58945.firebaseio.com/ingredients.json' + query)
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    } //runs when component is unmounted if empty useEffect dependency array
  }, [filter, filterRef, sendRequest])

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = []
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        })
      }
      onLoadIngredients(loadedIngredients)
    }
  }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={filterRef} type="text" value={filter} onChange={(event) => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
