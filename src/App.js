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
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: new NoteData()
    };
  }

  onNoteSubmit = (form) => {
    let currentNote,
      notes = [];
    if (form.elements.id) {
      currentNote = this.state.notes.find(
        (note) => note.id === parseFloat(form.elements.id.value)
      );
      notes = this.state.notes;
    } else {
      currentNote = new NoteData();
      currentNote.id = Math.random();
      notes = [...this.state.notes, currentNote];
    }
    currentNote.modifiedOn = new Date().toLocaleTimeString();
    currentNote.subject = form.elements.subject.value;
    currentNote.content = form.elements.content.value;

    this.setState((state) => {
      return { notes };
    });
    this.setState({ currentNote: new NoteData() });
  };

  selectNote = (event) => {
    this.setState({
      currentNote: this.state.notes.find(
        (note) => note.id === parseFloat(event.currentTarget.id)
      )
    });
  };

  onNotePropertyChange = (propertyField) => {
    this.setState({
      currentNote: Object.assign({}, this.state.currentNote, {
        [propertyField.target.id]: propertyField.target.value
      })
    });
  };

  onNoteAddNew = () => {
    this.setState({
      currentNote: new NoteData()
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
