import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [filter, setFilter] = useState('')
  const filterRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === filterRef.current.value) {
        const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`
        fetch('https://react-hooks-58945.firebaseio.com/ingredients.json' + query)
          .then(response => {
            return response.json()
          }).then(responseData => {
            const loadedIngredients = []
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              })
            }
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    } //runs when component is unmounted if empty useEffect dependency array
  }, [filter, onLoadIngredients, filterRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={filterRef} type="text" value={filter} onChange={(event) => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
