// ContentDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentDetail from "./ContentDetail"
const ContentDetails = ({ match }) => {
  const [content, setContent] = useState(null)
  const contentId = match.contentId;

  useEffect(() => {
    // Fetch content details based on contentId
    axios.get(`http://localhost:3000/content/${contentId}`)
      .then((res) => setContent(res.data))
      .catch((err) => console.log(err));

    // You can add cleanup logic if needed
    return () => {
      // Cleanup logic
    };
  }, [contentId]);

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ContentDetail content={content} />
      {content.map(c => {
        <p>{c.isim}</p>

      })}

    </div>
  );
};

export default ContentDetails;
