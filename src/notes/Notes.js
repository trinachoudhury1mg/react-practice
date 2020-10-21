import React from "react";
export function Notes({ notes, onNoteClick }) {
  return (
    <div>
      {notes
        ? notes.reverse().map((item) => {
            return (
              <div
                className="list-item"
                key={item.id}
                id={item.id}
                onClick={onNoteClick}
              >
                <div className="subject">
                  <b>{item.subject}</b>
                </div>
                <div className="flex info">
                  <span>{item.modifiedOn}</span>
                  <span>{item.content}</span>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
