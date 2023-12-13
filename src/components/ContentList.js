import React from 'react'

function ContentList({ selectedCategory, contents, handleContentClick }) {
  return (


    <div className='row'>
      {contents
        .filter((content) => !selectedCategory || content.kategori === selectedCategory.ad)
        .map((content) => (
          <div className="col-4" key={content.id} >
            <h3>{content.isim}</h3>
            <img className='w-50' src={content.img} onClick={() => handleContentClick(content)} alt="" />
          </div>
        ))}
    </div>

  )
}

export default ContentList
