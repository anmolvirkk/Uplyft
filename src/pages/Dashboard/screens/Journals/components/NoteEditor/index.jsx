import React, {useState, useEffect, useRef} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'

const NoteEditor = ({id, setNote, name, colors, ...props}) => {

  const [editorData, setEditorData] = useState(props.body)

  let editorSaveTimeout = null
  const saveAfterDelay = (data) => {
    clearTimeout(editorSaveTimeout)
    editorSaveTimeout = setTimeout(()=>{setEditorData(data)}, 500)
  }

  const textEditor = useRef()

  useEffect(()=>{
    textEditor.current.focus()
    let date = new Date()
    let formattedDate = date.toDateString()
    setNote(id, editorData, formattedDate, name)
  }, [editorData, id, name, setNote])

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          <div ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>saveAfterDelay(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorData}} className={styles.textEditor} />
        </div>
    )
}

export default NoteEditor