import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


const CreateComic = () => {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(1900);
  const [issue, setIssue] = useState(1);
  const [writer, setWriter] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const createHandler = async (event) => {
    const token = await getAccessTokenSilently();
    event.preventDefault();
    await fetch(`${serverUrl}/api/createComic`, {
      method: 'POST',
      headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, published, issue, writer, description })
    })
      .then(res => res.json())
      .then(result => {
        setSuccess('Succesfully created a comic');
      },
        (error) => {
          console.log(error);
          setError('Error creating comic');
        }
      )
  }

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "title") {
      setTitle(value);
    } else if (name === "published") {
      setPublished(value);
    } else if (name === "issue") {
      setIssue(value);
    } else if (name === "writer") {
      setWriter(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  return (
    <div>
      <h1>Add a new comic</h1>
      {error !== null && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success !== null && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form>
        <div className="form-group">
          <label htmlFor="title" className="block">
            Comic title:
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            placeholder="Insert a title here"
            id="title"
            required
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="published" className="block">
            Published (1900-2021):
          </label>
          <input
            type="number"
            className="form-control"
            name="published"
            value={published}
            min="1900"
            max="2021"
            id="published"
            required
            placeholder="Insert a publish date between 1900 and 2021 here"
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue" className="block">
            Issue:
          </label>
          <input
            type="number"
            className="form-control"
            name="issue"
            value={issue}
            min="1"
            max="1000"
            id="issue"
            required
            placeholder="Insert the issue number here"
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="writer" className="block">
            Writer:
          </label>
          <input
            type="text"
            className="form-control"
            name="writer"
            value={writer}
            placeholder="Insert a writer here"
            id="writer"
            required
            onChange={event => onChangeHandler(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block">
            Description:
          </label>
          <textarea className="form-control" placeholder="Insert a description here" id="description" rows="3" name="description" onChange={event => onChangeHandler(event)}></textarea>
        </div>
        <button
          className="btn btn-primary"
          onClick={event => {
            createHandler(event);
          }}
        >
          Add comic
          </button>
      </form>
    </div>
  )
};

export default CreateComic;
