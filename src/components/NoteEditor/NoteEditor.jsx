import React from "react";
import AddButton from "../AddButton/AddButton.jsx";
import ColorPicker from "../ColorPicker/ColorPicker.jsx";
import NotesSearch from "../NotesSearch/NotesSearch.jsx"
import FavColors from "../ColorPicker/FavColors.jsx"
import "./NoteEditor.css";

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            color: 'rgb(130,232,164)'
        };
        this.addNote = this.addNote.bind(this);
        this.setColor = this.setColor.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleInput(e){
        this.setState({
            text: e.target.value
        });
    }
    setColor(color) {
        this.setState({
            color: color
        })
    }
    addNote(){
        if(this.state.text && this.state.text !== ' ') {
            let newNote={};
            newNote.text = this.state.text;
            newNote.id = Date.now();
            newNote.color = this.state.color;
            this.props.onNoteAdd(newNote);
            this.setState({
                text: ''
            });
        }
    }
    handleSearch(searchString){
        this.props.onNoteSearch(searchString);
    }
    render(){
        return (
            <div className="note-editor">
                <div className="row my-2 px-0">
                    <div className="col-12 pl-0">
                        <div className="textarea">
                            <textarea rows='4'
                                  placeholder='Enter your text here'
                                  value={this.state.text}
                                  onChange={(e) => this.handleInput(e)}
                             />
                        </div>
                        <FavColors onColorChoose={this.setColor}
                                   currentColor={this.state.color}/>
                    </div>
                </div>
                <div className="row justify-content-end mb-3 px-0">
                    <NotesSearch onSearch={this.handleSearch}
                                 searchFieldValue={this.props.searchFieldValue}/>
                    <ColorPicker onColorChoose={this.setColor}
                                 displayedColor={this.state.color}
                                 color={this.state.color}/>
                    <AddButton onAddNote={this.addNote}/>
                </div>
            </div>
        );
    }
}
export default NoteEditor;