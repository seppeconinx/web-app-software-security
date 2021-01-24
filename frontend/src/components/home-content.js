import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeContent = () => {
  const [comics, setComics] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetch(`${serverUrl}/api/getAllComics`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        setComics(result);
      },
        (error) => {
          console.log(error);
        }
      )
  }, [])

  return (
    <div className="container py-4">
      <div className="row">
        {comics.map(({ id, title, issue, published, writer }) =>
          <div className="col-md-3" key={id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{title} ({published}) #{issue}</h5>
                <p className="card-text">Writer: {writer}</p>
                <Link to={`/comic/${id}`}><button type="button" className="btn btn-primary">Info</button></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
