import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import AddContentForm from './components/AddContentForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetayliBilgiModal from './components/DetayliBilgiModal';
import { Navbar, Nav } from 'react-bootstrap'
import Navi from './components/Navi';
import { Routes, Route, Router } from 'react-router-dom'
import ContentList from './components/ContentList';
import { useNavigate } from 'react-router-dom';
import ContentDetails from './components/ContentDetails';
import StPierreKilisesi from './pages/StPierreKilisesi';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import ContentCard from './components/ContentCard';
import AsiNehri from './pages/AsiNehri';
import HarbiyeSelalesi from './pages/HarbiyeSelalesi';
import HatayArkeolojiMuzesi from './pages/HatayArkeolojiMuzesi';
import HabibiNeccarCamii from './pages/HabibiNeccarCamii';


function App() {
  const [kategoriler, setKategoriler] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedContentLocation, setSelectedContentLocation] = useState(null);
  const [favoriteCounts, setFavoriteCounts] = useState({});

  const handleFavoriteClick = (contentId) => {
    setFavoriteCounts((prevCounts) => ({
      ...prevCounts,
      [contentId]: (prevCounts[contentId] || 0) + 1
    }));
  };


  useEffect(() => {
    axios
      .get('http://localhost:3000/kategoriler')
      .then((res) => setKategoriler(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/content')
      .then((res) => setContents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "Anasayfa" ? null : category);
  };

  const filteredContents = selectedCategory
    ? contents.filter((content) => content.kategori === selectedCategory.ad)
    : contents;

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setSelectedContentLocation(content.location);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openLocationModal = () => {
    setShowLocationModal(true);
    setShowModal(false);  // Eğer önceki modal açıksa kapat
  };


  const closeLocationModal = () => {
    setShowLocationModal(false);
    setShowModal(true);  // Eğer önceki modal açıksa tekrar aç
  };

  // Yeni içerik eklemek için callback fonksiyonu
  const handleAddContent = (newContent) => {
    // Yeni içeriği mevcut içerik listesine ekleyerek state'i güncelle
    setContents((prevContents) => [...prevContents, newContent]);
  };

  const handleUpdateContent = (id, updatedContent) => {
    // Ana uygulama state'ini güncelle
    setContents((prevContents) => {
      return prevContents.map((content) => (content.id === id ? { ...content, ...updatedContent } : content));
    });

    // Modal'ı kapat
    setShowModal(false);
  };

  const handleDeleteContent = (id) => {
    // Ana uygulama state'ini güncelle
    setContents((prevContents) => prevContents.filter((content) => content.id !== id));

    // Modal'ı kapat
    setShowModal(false);
  };

  const navigate = useNavigate();
  var pathi = '';
  const navigateToDetails = () => {
    // Use the react-router-dom hook to navigate to the content details page
    pathi = selectedContent.isim.replace(/\s/g, "");
    navigate(pathi);
    setShowModal(false);
    console.log(pathi)
    console.log(selectedContent)
    // `${selectedContent.isim}`
  };



  return (


    <div className="App">
      <Navi kategoriler={kategoriler} handleCategoryClick={handleCategoryClick} />



      <Routes>


        <Route path='/' element={<CardGrid filteredContents={filteredContents} handleContentClick={handleContentClick} />} />

        <Route path='admin' element={<AddContentForm onAddContent={handleAddContent} selectedContent={selectedContent} onUpdateContent={handleUpdateContent}
          onDeleteContent={handleDeleteContent} contents={contents} />} />
        <Route
          path={'/AsiNehri'}
          element={<AsiNehri content={selectedContent} />}
        />
        <Route
          path={'/StPierreKilisesi'}
          element={<StPierreKilisesi content={selectedContent} />}
        />

        <Route
          path={'/HarbiyeSelalesi'}
          element={<HarbiyeSelalesi content={selectedContent} />}
        />
        <Route
          path={'/HatayArkeolojiMuzesi'}
          element={<HatayArkeolojiMuzesi content={selectedContent} />}
        />
        <Route
          path={'/HabibiNeccarCamii'}
          element={<HabibiNeccarCamii content={selectedContent} />}
        />
      </Routes>
      {/* Original Modal */}
      {selectedContent && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedContent.isim}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedContent.img} alt="" className="img-fluid" />
            <p>{selectedContent.desc}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={openLocationModal}>
              Lokasyonu Gör
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Close
            </Button>
            {/* Add the "Detaylı Bilgi" button */}
            <Button variant="info" onClick={navigateToDetails}>
              Detaylı Bilgi
            </Button>
            <Button variant="danger" onClick={() => handleFavoriteClick(selectedContent.id)}>
              Favorilere Ekle ♥ {favoriteCounts[selectedContent.id] || 0}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Location Modal */}
      {showLocationModal && selectedContentLocation && (
        <Modal show={showLocationModal} onHide={closeLocationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Lokasyonu Gör</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Google Maps Embed API */}
            <iframe
              src={selectedContentLocation}
              width="400"
              height="300"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeLocationModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>

  );
}

export default App;







