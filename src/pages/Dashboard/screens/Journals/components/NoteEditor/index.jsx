import React, {useState, useRef} from 'react'
import styles from './_textEditor.module.sass'
import Header from './components/Header'
import Prompts from './components/Prompts'

const TextEditor = ({prompt, value, onChange, setNote, id, name}) => {

  const editorBody = useRef(value)
  const textEditor = useRef()

  const handleInput = (val) => {
    onChange(val)
    setNote(id, val, prompt, name)
  }

  return <div id='textEditor' ref={textEditor} contentEditable data-placeholder="Start Writing..." onInput={(e)=>handleInput(e.target.innerHTML)} dangerouslySetInnerHTML={{__html: editorBody.current}} className={styles.textEditor} />

}

const NoteEditor = ({id, setNote, name, colors, ...props}) => {

  const gratitudePrompts = [
    'What’s a simple pleasure that you’re grateful for?',
    `What's something that you're grateful to have today that you didn't have a year ago?`,
    `Write about someplace you’ve been that you're grateful for.`,
    `What's something about your body or health that you're grateful for?`,
    `Open the door or window and look outside. What’s something you're grateful for outside?`,
    `What's an accomplishment you’re proud of?`,
    `What's a possession that makes your life easier?`,
    `Open your phone or photo album and find a photo that you like. Why are you grateful for this photo? What are you grateful for in the photo?`,
    `What have you been given that you’re grateful for?`,
    `What's something or someone that makes you feel safe?`,
    `Write about a friend that you’re grateful for.`,
    `Write about a teacher or mentor that you’re grateful for.`,
    `Write about a family member that you’re grateful for.`,
    `What did you accomplish today?`,
    `What's one of your personality traits that you’re grateful for?`,
    `What mistake or failure are you grateful for?`,
    `What skill(s) do you have that you’re grateful for?`,
    `What's something that you made recently that you’re grateful for?`,
    `Look around the room and write about everything you see that you’re grateful for.`,
    `Write down one good thing that happened to you today.`,
    `What about your upbringing are you most grateful for?`,
    `Name 5 things you are doing well currently.`,
    `Who or what in your life are you happy to have let go?`,
    `Think about the worst period you went through your life and list 10 ways life is better now than it was then.`,
    `List something good that has recently caught your attention to make you realize how fortunate you are.`,
    `Think about the qualities of the people you admire. List these qualities and how you can incorporate them in your life.`,
    `List 3 people and/or things you feel that you take for granted. How can you express more appreciation for these things or people?`,
    `What friends are you most grateful for having? List what makes each friend special.`,
    `Name 3 things that always put a smile on your face.`,
    `What is the most beautiful place you have been to? Relive being in this place now and write about your experience.`,
    `What has been the highlight of your day today?`,
    `What things do you own that make life easier?`,
    `Name 3 things that have happened to you that have strengthened your character and who you are today (positive or negative events).`,
    `List 2 struggles you experienced in life that you have overcome. What or who have helped you to overcome these trials?`,
    `List 5 things you love about your home.`,
    ``
  ]

  const [editorData, setEditorData] = useState(props.body)
  const [prompt, setPrompt] = useState(props.prompt)

  const updatePrompt = (val) => {
    setPrompt(val)
    setNote(id, editorData, val, name)
  }

    return (
        <div className={styles.noteEditor}>
          <Header colors={colors} />
          <Prompts updatePrompt={updatePrompt} prompts={gratitudePrompts} prompt={prompt} />
          <TextEditor value={editorData} onChange={setEditorData} setNote={setNote} id={id} name={name} prompt={prompt} setPrompt={setPrompt} />
        </div>
    )
}

export default NoteEditor