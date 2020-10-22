import React from "react";
import { Notes } from "./notes/Notes";
import { Note } from "./notes/Note";
import "./styles.css";

function Header({ onClick }) {
  return <div className="header">Welcome to Notes</div>;
}

function Right({ showRight, onSubmit, note, onNotePropChange }) {
  return (
    <div className="right">
      {showRight ? (
        <Note onSubmit={onSubmit} note={note} onPropChange={onNotePropChange} />
      ) : (
        ""
      )}
    </div>
  );
}
function Left({ showLeft, notes, onNoteClick, onNewNoteAdd }) {
  return (
    <div className="left">
      <button type="button" className="btn btn-info" onClick={onNewNoteAdd}>
        New Note
      </button>
      {showLeft ? <Notes notes={notes} onNoteClick={onNoteClick} /> : ""}
    </div>
  );
}
class NoteData {
  subject;
  note;
  modifiedOn;
  id;
  constructor() {
    this.subject = "";
    this.content = "";
    this.id = Math.random();
    this.modifiedOn = new Date().toLocaleDateString();
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    const newNote = new NoteData();
    const notesToPut = JSON.parse(window.localStorage.getItem("notes")) || [];
    this.state = {
      currentNote: newNote,
      notes: [newNote, ...notesToPut]
    };
  }

  componentDidUpdate() {
    window.localStorage.setItem("notes", JSON.stringify(this.state.notes));
  }

  selectNote = (event) => {
    this.setState({
      currentNote: this.state.notes.find(
        (note) => note.id === parseFloat(event.currentTarget.id)
      )
    });
  };

  onNotePropertyChange = (propertyField) => {
    const notesExceptCurrent = this.state.notes.filter(
      (note) => note.id !== this.state.currentNote.id
    );
    const noteToUpdate = Object.assign({}, this.state.currentNote, {
      [propertyField.target.id]: propertyField.target.value
    });
    this.setState({
      currentNote: noteToUpdate,
      notes: [noteToUpdate, ...notesExceptCurrent]
    });
  };

  onNoteAddNew = () => {
    const newNote = new NoteData();
    this.setState({
      currentNote: newNote,
      notes: [newNote, ...this.state.notes]
    });
  };

  render() {
    return (
      <div className="main">
        <Left
          showLeft={this.props.showLeft}
          notes={this.state.notes}
          onNoteClick={this.selectNote}
          onNewNoteAdd={this.onNoteAddNew}
        />
        <Right
          showRight={this.props.showRight}
          note={this.state.currentNote}
          onSubmit={this.onNoteSubmit}
          onNotePropChange={this.onNotePropertyChange}
        />
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <Main showLeft={true} showRight={true} />
    </div>
  );
}
