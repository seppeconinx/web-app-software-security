import React, { useEffect, useState } from 'react';

const ComicDetail = (props) => {
  const [comic, setComic] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.match.params.id })
  };
    fetch(`${serverUrl}/api/getComicById`, requestOptions)
      .then(res => res.json())
      .then(result => {
        console.log("Comic result: " + result);
        setComic(result);
      },
        (error) => {
          console.log(error);
        }
      )
  }, [])
  return(
      <div>
          <h1>{comic.title} ({comic.published}) #{comic.issue}</h1>
          <p><b>Writer: </b>{comic.writer}</p>
          <p><b>Description:</b> {comic.description}</p>
      </div>
  )
};

export default ComicDetail;
