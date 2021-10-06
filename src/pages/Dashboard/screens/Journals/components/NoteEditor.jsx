import React, {useState, useRef, useEffect} from 'react'
import JoditEditor from "jodit-react";
import './textEditor.sass'

const NoteEditor = ({styles, id, setNote, name, ...props}) => {

    const editor = useRef(null)
    const [content, setContent] = useState(props.body ? props.body : '')

    const config = {
      readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    useEffect(()=>{
      let date = new Date()
      let formattedDate = date.toDateString()
      setNote(id, content, formattedDate, name)
    }, [content, id, name, setNote])
    
    let saveTimeout;

    const saveAfterInactivity = (newContent) => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(()=>setContent(newContent), 500)
    }

    return (
        <div className={styles.noteEditor}>
          <div id="textEditor">
          <JoditEditor
            	ref={editor}
                value={content}
                config={config}
		            tabIndex={1} // tabIndex of textarea
                onChange={(newContent)=>saveAfterInactivity(newContent)}
		            onBlur={newContent => setContent(newContent)}
            />
          </div>
        </div>
    )
}

export default NoteEditor