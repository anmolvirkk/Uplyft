import React, {useState, useRef, useEffect} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'
import Prompts from './components/Prompts'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../../../recoil-atoms/allRoutesAtom'
import allPromptsAtom from '../../../../recoil-atoms/allPromptsAtom'

const TextEditor = ({prompt, value, setEditorData, setNote, id, name, category, allPrompts, isMobile}) => {

  const editorBody = useRef(value)
  const textEditor = useRef()

  let timeout
  const handleInput = (val) => {
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      setEditorData(val)
      setNote(id, val, prompt, name)
    }, 300)
  }

  useEffect(()=>{
    if(document.getElementById('textEditor') && isMobile){

      document.getElementById('textEditor').style.height = (window.innerHeight - 80 - 60 - 50 - 12 - 24 - 3)+'px'
      document.getElementById('textEditor').style.opacity = 1

    }
  }, [isMobile])

  const scrollToView = (target) => {
    document.getElementById('textEditor').scroll({top: target.offsetTop-120, behavior: 'smooth'})
  }

  return <div id='textEditor' onMouseDown={(e)=>scrollToView(e.target)} ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} style={{paddingTop: allPrompts[category.replace(/ /g, "")]&&allPrompts[category.replace(/ /g, "")].length<=0 ? '2.5vh' : null}} />

}

const NoteEditor = ({id, setNote, colors, notes, isMobile, ...props}) => {

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
          {allPrompts[category.replace(/ /g, "")] ? <Prompts isMobile={isMobile} updatePrompt={updatePrompt} deletePrompt={deletePrompt} prompts={allPrompts[category.replace(/ /g, "")]} prompt={prompt} category={category} /> : null}
          <TextEditor isMobile={isMobile} allPrompts={allPrompts} value={editorData} setEditorData={setEditorData} setNote={setNote} id={id} category={category} prompt={prompt} setPrompt={setPrompt} />
        </div>
    )
}

export default NoteEditor