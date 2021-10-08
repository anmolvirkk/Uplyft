import React, {useState, useEffect, useRef} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'

const TextEditor = ({value, onChange, setNote, id, name}) => {

  const editorBody = useRef(value)
  const textEditor = useRef()

  useEffect(()=>{
    textEditor.current.addEventListener('paste', function (event) {
      event.preventDefault();
      document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
    })
  })

  const handleInput = (val) => {
    onChange(val)
    let date = new Date()
    let formattedDate = date.toDateString()
    setNote(id, val, formattedDate, name)
  }

  return <div id='textEditor' ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} />

}

const NoteEditor = ({id, setNote, name, colors, ...props}) => {

  const [editorData, setEditorData] = useState(props.body)

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          <TextEditor value={editorData} onChange={setEditorData} setNote={setNote} id={id} name={name} />
        </div>
    )
}

export default NoteEditor