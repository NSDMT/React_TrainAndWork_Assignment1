import React from 'react';

function ContentCard({ content, handleContentClick }) {
  // Function to safely get a substring of the description
  const getDescriptionSnippet = (description) => {
    if (typeof description === 'string' && description.length > 100) {
      return description.substring(0, 100) + '...';
    }
    return description;
  };

  return (
    <div className=" mb-4">
      <div className="content-card h-100">
        <img src={content.img} alt={content.isim} className="content-image img-fluid" onClick={() => handleContentClick(content)} />
        <h3>{content.isim}</h3>
        <p>{getDescriptionSnippet(content.desc)}</p>
        <button className="more-info-btn btn btn-primary m-1">More Info</button>
      </div>
    </div>
  );
}

export default ContentCard;
