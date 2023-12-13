// DetaylıBilgiModal.js

import React, { useState } from 'react';

const DetayliBilgiModal = ({ content, onClose, onYorumSubmit }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [yorum, setYorum] = useState({ isim: '', yorum: '', rating: 0 });

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYorum((prevYorum) => ({ ...prevYorum, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setYorum((prevYorum) => ({ ...prevYorum, rating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yorum submit işlemi
    onYorumSubmit(content.id, yorum);
    // Yorumu temizle
    setYorum({ isim: '', yorum: '', rating: 0 });
  };

  return (
    <div className={`detayli-bilgi-modal ${isFullscreen ? 'fullscreen' : ''}`}>
      <button onClick={onClose}>Kapat</button>
      <h2>{content.isim}</h2>
      <p>{content.desc}</p>

      {/* Detaylı Bilgi Butonu */}
      <button onClick={handleFullscreen}>Detaylı Bilgi</button>

      {/* Yorum Formu ve Yapılan Yorumlar */}
      {isFullscreen && (
        <div className="yorum-formu">
          <form onSubmit={handleSubmit}>
            <label>
              İsim:
              <input
                type="text"
                name="isim"
                value={yorum.isim}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Yorum:
              <textarea
                name="yorum"
                value={yorum.yorum}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={yorum.rating}
                onChange={(e) => handleRatingChange(e.target.value)}
              />
            </label>
            <button type="submit">Yorum Yap</button>
          </form>

          {/* Yapılan Yorumlar */}
          <div className="yorumlar">
            <h3>Yapılan Yorumlar</h3>
            {content.yorumlar &&
              content.yorumlar.map((yorum, index) => (
                <div key={index} className="yorum">
                  <p>{yorum.isim}</p>
                  <p>{yorum.yorum}</p>
                  <p>Rating: {yorum.rating}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetayliBilgiModal;
