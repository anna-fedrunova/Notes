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
                ],
            searchQuery:''
        };
        this.handleNoteAdd= this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.handleNoteSearch = this.handleNoteSearch.bind(this);
        this._getVisibleNotes =this._getVisibleNotes.bind(this);
    }
    componentDidMount(){
        let localNotes = JSON.parse(localStorage.getItem('localNotes'));
        if(localNotes) {
            this.setState ({
                notes: localNotes,
            })
        }
    }
    componentDidUpdate() {
        this.updateLocalStorage();
    }
    handleNoteAdd(newNote){
        let newNotes = [...this.state.notes];
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes,
        });
    }
    handleNoteDelete(note){
        let handleNoteSearch = this.handleNoteSearch.bind(null, this.state.searchQuery);
        let id = note.id;
        let newNotes = this.state.notes.filter((note) => note.id !== id);
        this.setState({
            notes: newNotes,
        }, handleNoteSearch);
    }
    handleNoteSearch(searchString){
        let searchedNotes = this._getVisibleNotes(this.state.notes, searchString.toLowerCase());
        if(searchedNotes.length) {
            this.setState({
                searchQuery: searchString,
                message:''
            })
        } else {
            this.setState({
                searchQuery: searchString,
                message:'Nothing matches you search query'
            })
        }

    }
    updateLocalStorage(){
        localStorage.setItem('localNotes', JSON.stringify(this.state.notes));
    }
    _getVisibleNotes(notes, searchQuery){
        return notes.filter((note) => ~note.text.toLowerCase().indexOf(searchQuery))
    }
    render(){
        return (
            <div className="container notes-app">
                <h1> The Notes </h1>
                <NoteEditor onNoteAdd={this.handleNoteAdd}
                            onNoteSearch={this.handleNoteSearch}
                            searchFieldValue={this.state.searchQuery}
                />
                <NotesGrid notes={this._getVisibleNotes(this.state.notes, this.state.searchQuery)}
                           message={this.state.message}
                           onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }
}
export default NotesApp;