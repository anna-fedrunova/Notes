import React from "react";
import NoteEditor from "../NoteEditor/NoteEditor.jsx";
import NotesGrid from "../NotesGrid/NotesGrid.jsx";
import "./NotesApp.css";

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {id: 1,
                text: 'This is a sample note. You can easily make your own ones: just type some text in the field and click "ADD". That is it! Quite easy, isn\'t it?',
                color: '#82e8a4'}
                ]
        };
        this.handleNoteAdd= this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
    }
    componentDidMount(){
        let localNotes = JSON.parse(localStorage.getItem('localNotes'));
        if(localNotes) {
            this.setState ({
                notes: localNotes
            })
        }
    }
    componentDidUpdate(){
        this.updateLocalStorage();
    }
    handleNoteAdd(newNote){
        let newNotes = [...this.state.notes];
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes
        })
    }
    handleNoteDelete(note){
        let id = note.id;
        let newNotes = this.state.notes.filter((note) => note.id !== id);
        this.setState({
            notes: newNotes
        })
    }
    updateLocalStorage(){
        localStorage.setItem('localNotes', JSON.stringify(this.state.notes));
    }
    render(){
        return (
            <div className="container notes-app">
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }
}
export default NotesApp;