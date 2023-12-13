import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'


function Navi({ kategoriler, handleCategoryClick }) {
  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant='dark' expand="lg" className='mb-2 '>
        <Navbar.Brand href="/">Antakya Gezi Rehberi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Home button */}
            <Nav.Link onClick={() => handleCategoryClick("Anasayfa")}>Anasayfa</Nav.Link>

            {/* Category links */}
            {kategoriler.map((kategori) => (
              <Nav.Link key={kategori.id} onClick={() => handleCategoryClick(kategori)}>
                {kategori.ad}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navi
