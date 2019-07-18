let Note = React.createClass({
     render(){
         const noteStyle ={
             backgroundColor: this.props.color
         };
        return (
            <div style={noteStyle} className="note">
                <div className="delete-btn">
                    <button onClick={this.props.onDelete}>X</button>
                </div>
                <div>{this.props.children} </div>
            </div>
        );
    }
});
let NoteEditor = React.createClass({
    getInitialState(){
      return {
          text: ''
      }
    },
    handleInput(e){
        this.setState({
            text: e.target.value
        })
    },
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
    },
    render(){
        return (
            <div className="note-editor">
                <div className="row my-2 px-0">
                    <div className="col-12 pl-0">
                         <textarea className="textarea" rows='4'
                          placeholder='Enter your text here'
                          value={this.state.text}
                          onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="row justify-content-end mb-3 px-0">
                    <div className="col-2">
                        <input className="add-button"
                               type="button"
                               value="ADD" onClick={this.addNote}/>
                    </div>
                </div>
            </div>
        );
    }
});
let NotesGrid = React.createClass({
    componentDidMount(){
        const grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: '.grid-size',
            gutter:7
        });
    },
    shouldComponentUpdate(nextProps){
        return nextProps.notes.length != this.props.notes.length
    },
    componentDidUpdate(){
        this.msnry.reloadItems();
        this.msnry.layout();
    },
    render(){
        this.props.onNoteDelete
        return (
            <div className="row justify-content-between notes-grid" ref="grid">
                <div className="col-12 px-0">
                <div className="grid-size"></div>
                {this.props.notes.map((note) => {
                    return(
                        <Note
                            key={note.id}
                            color={note.color}
                            onDelete={this.props.onNoteDelete.bind(null, note)}>
                            {note.text}
                        </Note>
                    )
                })}
                </div>
            </div>
        );
    }
});
let NotesApp = React.createClass({
    getInitialState() {
      return {
          notes: [{
              id: 1,
              text: 'This is a sample note. You can easily make your own ones: just type some text in the field and click "ADD". That is it! Quite easy, isn\'t it?',
              color: '#82e8a4'
          }]
      }
    },
    componentDidMount(){
        let localNotes = JSON.parse(localStorage.getItem('localNotes'));
        if(localNotes) {
            this.setState ({
                notes: localNotes
            })
        }
    },
    componentDidUpdate(){
        this.updateLocalStorage();
    },
    handleNoteAdd(newNote){
       let newNotes = [...this.state.notes];
       newNotes.unshift(newNote);
       this.setState({
           notes: newNotes
       })
    },
    handleNoteDelete(note){
      let id = note.id;
      let newNotes = this.state.notes.filter((note) => note.id !== id);
      this.setState({
          notes: newNotes
      })
    },
    updateLocalStorage(){
        localStorage.setItem('localNotes', JSON.stringify(this.state.notes));
    },
    render(){
        return (
            <div className="container notes-app">
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.querySelector('#mount-point'));