import React, { useState } from 'react';
import axios from 'axios';

const AddContentForm = ({ onAddContent, onUpdateContent, onDeleteContent, selectedContent, contents, selectedCategory, handleContentClick }) => {
  const [isim, setIsim] = useState(selectedContent ? selectedContent.isim : '');
  const [kategori, setKategori] = useState(selectedContent ? selectedContent.kategori : '');
  const [img, setImg] = useState(selectedContent ? selectedContent.img : '');
  const [desc, setDesc] = useState(selectedContent ? selectedContent.desc : '');
  const [location, setLocation] = useState(selectedContent ? selectedContent.location : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContent = { isim, kategori, img, desc, location };

    try {
      // Eğer seçili bir içerik varsa, güncelleme isteği gönder
      if (selectedContent) {
        await axios.put(`http://localhost:3000/content/${selectedContent.id}`, newContent);
        onUpdateContent(selectedContent.id, newContent);
      } else {
        // Eğer seçili bir içerik yoksa, POST isteği gönder
        const response = await axios.post('http://localhost:3000/content', newContent);
        onAddContent(response.data);
      }

      // Formu sıfırla
      setIsim('');
      setKategori('');
      setImg('');
      setDesc('');
      setLocation('');
    } catch (error) {
      console.error('Error adding/updating content:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Seçili içeriği silme isteği gönder
      await axios.delete(`http://localhost:3000/content/${selectedContent.id}`);
      onDeleteContent(selectedContent.id);

      // Formu sıfırla
      setIsim('');
      setKategori('');
      setImg('');
      setDesc('');
      setLocation('');
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <label>
          İsim:
          <input type="text" value={isim} onChange={(e) => setIsim(e.target.value)} required />
        </label>
        <br />
        <label>
          Kategori:
          <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} required />
        </label>
        <br />
        <label>
          Resim URL:
          <input type="url" value={img} onChange={(e) => setImg(e.target.value)} required />
        </label>
        <br />
        <label>
          Açıklama:
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </label>
        <br />
        <label>
          Lokasyon:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <br />
        <button type="submit">{selectedContent ? 'Güncelle' : 'Ekle'}</button>
        {selectedContent && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Sil
          </button>
        )}
      </form>
    </div>
  );
};

export default AddContentForm;
