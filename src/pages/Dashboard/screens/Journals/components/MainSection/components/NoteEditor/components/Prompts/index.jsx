import React, {useState} from 'react' 
import styles from './_prompts.module.sass'
import {ChevronDown, ChevronRight, ChevronUp, Plus} from 'react-feather'
import MoreMenu from '../../../../../../../../components/MoreMenu'

import openModal from '../../../../../../functions/openModal'
import modalConfigAtom from '../../../../../../recoil-atoms/modalConfigAtom'
import {useSetRecoilState} from 'recoil' 

const Prompts = ({prompts, prompt, updatePrompt, category, deletePrompt}) => {

    const [promptsOpen, setPromptsOpen] = useState(false)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

     
    document.addEventListener('mouseup', function(e) {
        const currentPrompt = document.getElementById('currentPrompt')
        if(currentPrompt){
            if(!currentPrompt.contains(e.target)){
                setPromptsOpen(false)
            }
        }
    })

    document.addEventListener('mouseover', function(e) {
        if(e.target.classList.contains('allPrompts')){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                 e.target.classList.add(styles.overflownPrompt)
            }
        }
    })

    const editPrompt = () => {
        openModal({type: 'editprompt', updatePrompt: updatePrompt, category: category, current: prompt, setModalConfig: setModalConfig})
    }

    return (
        <div className={styles.promptContainer} id="prompts">
        <div data-item={prompt} onClick={()=>setPromptsOpen(!promptsOpen)} id="currentPrompt" className={`${styles.currentPrompt} allPrompts`}><p>{prompt === '' ? 'Choose a prompt (optional)' : prompt}</p>{promptsOpen?<ChevronUp />:<ChevronDown />}</div>
                
        <div className={promptsOpen ? `${styles.prompts} ${styles.promptsOpen}` : styles.prompts}>
                <ul>
                    <li onClick={()=>updatePrompt('')}><p>None</p><ChevronRight /></li>
                    {prompts.map((item, index)=>{
                        return <li className='allPrompts' data-item={item} onClick={()=>updatePrompt(item)} key={index}><p>{item==='' ? 'None' : item}</p>
                        <div onClick={()=>setPromptsOpen(true)}><MoreMenu items={[{name: "edit", function: editPrompt}, {name: "delete", function: ()=>deletePrompt(category, prompt)}]} id={`promptMoreMenu${index}`} pos={{right: '2.5vh', top: '1vh'}} /></div>
                        </li>
                    })}
                    <li className={styles.addBtn} onClick={()=>openModal({type: 'prompt', updatePrompt: updatePrompt, category: category, setModalConfig: setModalConfig})}><p>Add</p><Plus /></li>
                </ul>
        </div>
        </div>
        )
}

export default Prompts