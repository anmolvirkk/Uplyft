import React, {useState, useRef} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'
import Prompts from './components/Prompts'

const TextEditor = ({prompt, value, onChange, setNote, id, name, prompts}) => {

  const editorBody = useRef(value)
  const textEditor = useRef()

  const handleInput = (val) => {
    onChange(val)
    setNote(id, val, prompt, name)
  }

  return <div id='textEditor' ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} style={{paddingTop: prompts.length<=0 ? '2.5vh' : null}} />

}

const NoteEditor = ({id, setNote, name, colors, allPrompts, ...props}) => {

  const [editorData, setEditorData] = useState(props.body)
  const [prompt, setPrompt] = useState(props.prompt)

  const updatePrompt = (val) => {
    setPrompt(val)
    setNote(id, editorData, val, name)
  }

  let prompts

  for(let key in allPrompts){
    if(key === name.replace(/\s/g, "")){
      prompts = allPrompts[key]
    }
  }

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          {prompts.length<=0 ? null : <Prompts updatePrompt={updatePrompt} prompts={prompts} prompt={prompt} />}
          <TextEditor prompts={prompts} value={editorData} onChange={setEditorData} setNote={setNote} id={id} name={name} prompt={prompt} setPrompt={setPrompt} />
        </div>
    )
}

export default NoteEditor