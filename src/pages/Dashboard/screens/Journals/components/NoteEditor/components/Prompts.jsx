import React, {useState} from 'react' 
import styles from './_prompts.module.sass'
import {ChevronDown, ChevronRight, ChevronUp} from 'react-feather'

const Prompts = ({prompts, prompt, updatePrompt}) => {

    const [promptsOpen, setPromptsOpen] = useState(false)

    return <div className={promptsOpen ? `${styles.prompts} ${styles.promptsOpen}` : styles.prompts} id="prompts" onClick={()=>setPromptsOpen(!promptsOpen)}>
                <h3>{prompt === '' ? 'Choose a prompt (optional)' : prompt}{promptsOpen?<ChevronUp />:<ChevronDown />}</h3>
                <ul>
                    {prompts.map((item, index)=>{
                        return <li onClick={()=>updatePrompt(item)} key={index}><p>{item==='' ? 'None' : item}</p><ChevronRight /></li>
                    })}
                </ul>
            </div>
}

export default Prompts