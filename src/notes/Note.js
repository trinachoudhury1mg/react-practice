import React from "react";

export function Note(props) {
  const noteForm = React.useRef();
  function onFormSubmit(event) {
    event.preventDefault();
    props.onSubmit(noteForm.current);
  }
  return (
    <form ref={noteForm} onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          className="form-control"
          value={props.note.subject}
          onChange={props.onPropChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="form-control"
          value={props.note.content}
          onChange={props.onPropChange}
        />
      </div>
      {props.note.id ? (
        <input id="id" type="hidden" value={props.note.id} />
      ) : (
        ""
      )}
      <button type="submit" className="btn btn-success">
        {props.note.id ? "Update Note" : "Save Note"}{" "}
      </button>
    </form>
  );
}
