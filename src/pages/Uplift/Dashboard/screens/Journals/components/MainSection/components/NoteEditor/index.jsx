import React, {useState, useRef} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'
import Prompts from './components/Prompts'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../../../recoil-atoms/allRoutesAtom'
import allPromptsAtom from '../../../../recoil-atoms/allPromptsAtom'

const TextEditor = ({prompt, value, setEditorData, setNote, id, name, category, allPrompts}) => {

  const editorBody = useRef(value)
  const textEditor = useRef()

  const handleInput = (val) => {
    setEditorData(val)
    setNote(id, val, prompt, name)
  }
  return <div id='textEditor' ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} style={{paddingTop: allPrompts[category.replace(/ /g, "")]&&allPrompts[category.replace(/ /g, "")].length<=0 ? '2.5vh' : null}} />

}

const NoteEditor = ({id, setNote, colors, notes, ...props}) => {

  const [allRoutes] = useRecoilState(allRoutesAtom)
  const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)

  const [editorData, setEditorData] = useState(props.body)
  const [prompt, setPrompt] = useState(props.prompt)

  let category

  notes[allRoutes[allRoutes['book']][allRoutes['date']]].forEach((item)=>{
    if(item.id === id){
      category = item.category
    }
  })
  
  const updatePrompt = (val) => {
    setPrompt(val)
    setNote(id, editorData, val, category)
  }

  const deletePrompt = (name, prompt) => {
    for(let key in allPrompts){
        if(key === name.replace(/\s/g, "")){
            allPrompts[key].forEach((item, index)=>{
                if(item === prompt){
                    let newPrompts = allPrompts[key].filter((val, i)=>i!==index)
                    allPrompts[key] = [...newPrompts]
                }
            })
        }
    }
    
    setAllPrompts({...allPrompts})
}

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          {allPrompts[category.replace(/ /g, "")] ? <Prompts updatePrompt={updatePrompt} deletePrompt={deletePrompt} prompts={allPrompts[category.replace(/ /g, "")]} prompt={prompt} category={category} /> : null}
          <TextEditor allPrompts={allPrompts} value={editorData} setEditorData={setEditorData} setNote={setNote} id={id} category={category} prompt={prompt} setPrompt={setPrompt} />
        </div>
    )
}

export default NoteEditor