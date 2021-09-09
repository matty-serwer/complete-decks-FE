import React from 'react'
import { useQuery } from '../hooks'


function Items() {

  let query = useQuery();
  const category= query.get("category");

  return (
    <div>
      <h2>Items Page</h2>
      <h3>{category}</h3>
    </div>
  )
}

export default Items
