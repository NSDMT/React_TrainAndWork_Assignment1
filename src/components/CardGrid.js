import React from 'react'
import ContentCard from './ContentCard'

function CardGrid({ filteredContents, handleContentClick }) {
  return (
    <div>
      <div className='content-grid'>
        <div className="row">
          {filteredContents.map((content) => (
            <div className="col-3">
              <ContentCard key={content.id} content={content} handleContentClick={handleContentClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardGrid
