import React from "react";
import AddButton from "../AddButton/AddButton.jsx";
import "./NoteEditor.css";

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.addNote = this.addNote.bind(this);
    }
    handleInput(e){
        this.setState({
            text: e.target.value
        });
    }
    addNote(){
        if(this.state.text && this.state.text !== ' ') {
            let newNote={};
            newNote.text = this.state.text;
            newNote.id = Date.now();
            newNote.color = '#82e8a4';
            this.props.onNoteAdd(newNote);
            this.setState({
                text: ''
            });
        }
    }
    render(){
        return (
            <div className="note-editor">
                <div className="row my-2 px-0">
                    <div className="col-12 pl-0">
                        <textarea className="textarea" rows='4'
                                  placeholder='Enter your text here'
                                  value={this.state.text}
                                  onChange={(e) => this.handleInput(e)}/>
                    </div>
                </div>
                <AddButton onAddNote={this.addNote}/>
            </div>
        );
    }
}
export default NoteEditor;