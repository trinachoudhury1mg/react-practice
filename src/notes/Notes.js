import React from "react";
export function Notes({ notes, onNoteClick, onNoteDelete }) {
  return (
    <div>
      {notes
        ? notes.map((item) => {
            return (
              <div
                className="list-item"
                key={item.id}
                id={item.id}
                onClick={onNoteClick}
                style={{ marginTop: "10px" }}
              >
                <div className="flex" style={{ position: "relative" }}>
                  <div className="subject">
                    <b>{item.subject.length ? item.subject : "New Note"}</b>
                  </div>
                  <div style={{ position: "absolute", right: "7px" }}>
                    <button
                      type="button"
                      className="trash-btn"
                      onClick={onNoteDelete}
                      id={item.id}
                    >
                      <span className="glyphicon glyphicon-trash"></span>
                    </button>
                  </div>
                </div>
                <div className="flex info">
                  <span>{item.modifiedOn}</span>
                  <span className="content">
                    {item.content.length ? item.content : "No additional text"}
                  </span>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
