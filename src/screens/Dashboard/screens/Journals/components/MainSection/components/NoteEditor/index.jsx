import React, {useState, useRef, useEffect} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'
import Prompts from './components/Prompts'

import {useRecoilState} from 'recoil'
import { windowHeight } from '../../../../../../variables/mobileHeights'
import { allRoutesAtom, allPromptsAtom } from '../../../../../../allAtoms'

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

      document.getElementById('textEditor').style.height = (window.innerHeight - 80 - 60 - 72 - 12)+'px'
      document.getElementById('textEditor').style.opacity = 1

    }
  }, [isMobile])

  const scrollToView = (e) => {
    if(window.innerHeight < windowHeight){
      const top = e.target.scrollHeight-(e.target.scrollHeight-(e.target.scrollTop+e.clientY-160))
      document.getElementById('textEditor').scroll({top: top, behavior: 'smooth'})
    }else{
      setTimeout(()=>{
        scrollToView(e)
      }, 500)
    }
  }

  const scrollToViewOnSelect = (e) => {
    if(window.innerHeight < windowHeight){
      if(window.getSelection().getRangeAt(0).startOffset !== window.getSelection().getRangeAt(0).endOffset){
        const top = e.target.scrollHeight-(e.target.scrollHeight-(e.target.scrollTop+window.getSelection().getRangeAt(0).getBoundingClientRect().y-160))
        document.getElementById('textEditor').scroll({top: top, behavior: 'smooth'})
      }
    }else{
      setTimeout(()=>{
          scrollToViewOnSelect(e)
      }, 500)
    }
  }

  window.onscroll = () => {
    if(window.innerHeight === windowHeight){
      alert('isIphone')
    }
  }

  return <div id='textEditor' onSelect={isMobile?(e)=>scrollToViewOnSelect(e):null} onMouseDown={isMobile?(e)=>scrollToView(e):null} ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} style={{paddingTop: allPrompts[category.replace(/ /g, "")]&&allPrompts[category.replace(/ /g, "")].length<=0 ? '2.5vh' : null}} />

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
    let newPrompts = {...allPrompts, [name.replace(/\s/g, "")]: allPrompts[name.replace(/\s/g, "")].filter((val)=>val!==prompt)}
    setAllPrompts({...newPrompts})
  }

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          {allPrompts[category.replace(/ /g, "")] ? <Prompts isMobile={isMobile} updatePrompt={updatePrompt} deletePrompt={deletePrompt} prompts={allPrompts[category.replace(/ /g, "")]} prompt={prompt} category={category} /> : null}
          <TextEditor isMobile={isMobile} allPrompts={allPrompts} value={editorData} editorData={editorData} setEditorData={setEditorData} setNote={setNote} id={id} category={category} prompt={prompt} setPrompt={setPrompt} />
        </div>
    )
}

export default NoteEditor