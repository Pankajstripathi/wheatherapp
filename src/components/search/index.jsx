import React from 'react'

export default function Search({search, setSearch , handleSearch}) {


  return (
    <div className='search-engine'>
      <input
       type='text'
       className='city-search'
       placeholder='Enter the city'
       name='search'
       value={search}
       onChange={(e)=> setSearch(e.target.value)}
      />
      <div className="search-btn" onClick={handleSearch}>Search Weather</div>
    </div>
  )
}
