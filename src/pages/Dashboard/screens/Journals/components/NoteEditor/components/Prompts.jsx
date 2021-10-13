import React, {useState} from 'react' 
import styles from './_prompts.module.sass'
import {ChevronDown, ChevronRight, ChevronUp} from 'react-feather'

const Prompts = ({prompts, prompt, updatePrompt}) => {

    const [promptsOpen, setPromptsOpen] = useState(false)

     
    document.addEventListener('mouseup', function(e) {
        const prompts = document.getElementById('prompts');
        if(prompts){
            if (!prompts.contains(e.target)) {
                setPromptsOpen(false)
            }
        }
    });

    document.addEventListener('mouseover', function(e) {
        if(e.target.classList.contains('allPrompts')){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                 e.target.classList.add(styles.overflownPrompt)
            }
        }
    });

    return (
        <div className={styles.promptContainer} id="prompts">
        <div data-item={prompt} onClick={()=>setPromptsOpen(!promptsOpen)} className={`${styles.currentPrompt} allPrompts`}><p>{prompt === '' ? 'Choose a prompt (optional)' : prompt}</p>{promptsOpen?<ChevronUp />:<ChevronDown />}</div>
                
        <div className={promptsOpen ? `${styles.prompts} ${styles.promptsOpen}` : styles.prompts} onClick={()=>setPromptsOpen(false)}>
                <ul>
                    {prompts.map((item, index)=>{
                        return <li className='allPrompts' data-item={item} onClick={()=>updatePrompt(item)} key={index}><p>{item==='' ? 'None' : item}</p><ChevronRight /></li>
                    })}
                </ul>
        </div>
        </div>
        )
}

export default Prompts