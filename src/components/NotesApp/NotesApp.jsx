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
        this.handleNoteSearch = this.handleNoteSearch.bind(this);
    }
    componentDidMount(){
        this.localNotes = JSON.parse(localStorage.getItem('localNotes'));
        if(this.localNotes) {
            this.setState ({
                notes: this.localNotes,
            })
        }
    }
    handleNoteAdd(newNote){
        let newNotes = [...this.localNotes];
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes
        }, this.updateLocalStorage);
    }
    handleNoteDelete(note){
        let id = note.id;
        let newNotes = this.localNotes.filter((note) => note.id !== id);
        this.setState({
            notes: newNotes
        }, this.updateLocalStorage);

    }
    handleNoteSearch(searchString){
        let searchedNotes = this.localNotes.filter((note) => ~note.text.toLowerCase().indexOf(searchString));
        this.setState({
            notes: searchedNotes
        })
    }
    updateLocalStorage(){
        localStorage.setItem('localNotes', JSON.stringify(this.state.notes));
        this.localNotes = JSON.parse(localStorage.getItem('localNotes'));
    }
    render(){
        return (
            <div className="container notes-app">
                <NoteEditor onNoteAdd={this.handleNoteAdd}
                            onNoteSearch={this.handleNoteSearch}
                />
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }
}
export default NotesApp;