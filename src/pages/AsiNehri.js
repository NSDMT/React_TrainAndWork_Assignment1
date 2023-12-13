import React, { useState } from 'react';


const AsiNehri = ({ content }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (newComment && newUser) {
      setComments([...comments, newComment]);
      setNewComment(""); // Reset input field after submission
      setUsers([...users, newUser]);
      setNewUser("");
    }
  };


  return (
    <div style={{ margin: '20px' }}>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="row">
              <div className="col-5">
                <div className="card-img">
                  <img className='w-100' src={content.img} alt="" />
                </div>
              </div>
              <div className="col-7">
                <h2>{content.isim}</h2>
                <p>{content.desc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">

          <div style={{ marginTop: '20px' }}>
            <h3>Yorum Yaz</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label htmlFor="">User</label>
              <input type="text" className='form-control my-2' value={newUser}
                onChange={(e) => setNewUser(e.target.value)}

              />
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Yorumunuzu buraya yazın"
                style={{ width: '100%', minHeight: '100px', marginBottom: '10px' }}
              />
              <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Yorum Ekle</button>
            </form>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Yorumlar</h3>
        {comments.map((comment, index) => (
          <p key={index} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>{comment},{users[index]}</p>
        ))}
      </div>
    </div>
  );
}

export default AsiNehri;

