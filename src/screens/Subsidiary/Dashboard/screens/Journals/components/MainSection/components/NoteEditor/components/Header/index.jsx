import React, {useState, useEffect} from 'react'
import {Bold, Italic, Underline, List, ChevronDown, ChevronRight} from 'react-feather'
import styles from './_header.module.sass'

import { colors } from '../../../../../../../../variables/journalConfig'

import OutsideClickHandler from 'react-outside-click-handler-lite'

const Header = () => {

    const setTextTags = (e) => {
        let prompts = document.getElementById('prompts')
        if(prompts){
            if(!prompts.contains(e.target) && e.target !== prompts){
                setIsBold(document.queryCommandState("bold"))
                setIsItalic(document.queryCommandState("italic"))
                setIsUnderline(document.queryCommandState("underline"))
                setIsList(document.queryCommandState("insertUnorderedList"))
                switch (document.queryCommandValue('formatBlock')) {
                    case 'h1':
                        setCurrentTextSize('Heading')
                    break
                    case 'h3':
                        setCurrentTextSize('Sub Heading')
                    break
                    case 'div':
                        setCurrentTextSize('Normal')
                    break
                    case 'p':
                        setCurrentTextSize('Normal')
                    break
                    default:
                        setCurrentTextSize('Normal')
                    break
                }
            }
        }
    }

    useEffect(()=>{
        if(document.getElementById('textEditor')){
            document.getElementById('textEditor').onclick = (e) => {
                setTextTags(e)
            }
            document.getElementById('textEditor').onkeydown = (e) => {
                setTextTags(e)
            }
        }
    })

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [isList, setIsList] = useState(false)

    const setStyleState = {
        bold: ()=>{
            document.execCommand('bold')
            setIsBold(document.queryCommandState("bold"))
        },
        italic: ()=>{
            document.execCommand('italic')
            setIsItalic(document.queryCommandState("italic"))
        },
        underline: ()=>{
            document.execCommand('underline')
            setIsUnderline(document.queryCommandState("underline"))
        },
        insertUnorderedList: ()=>{
            document.execCommand('insertUnorderedList')
            setIsList(document.queryCommandState("insertUnorderedList"))
        }
    }

    const TextStyleOptions = () => (
        <ul className={styles.textStyleOptions}>
            <li onMouseDown={()=>setStyleState.bold()} className={isBold ?  styles.activeBtn : null}><Bold /></li>
            <li onMouseDown={()=>setStyleState.italic()} className={isItalic ?  styles.activeBtn : null}><Italic /></li>
            <li onMouseDown={()=>setStyleState.underline()} className={isUnderline ?  styles.activeBtn : null}><Underline /></li>
            <li onMouseDown={()=>setStyleState.insertUnorderedList()} className={isList ?  styles.activeBtn : null}><List /></li>
        </ul>
    )
    
    const Colors = ({colors}) => (
        <ul className={styles.colors}>
            {colors.map((color, index)=>{
                return <li key={index} style={{backgroundColor: color}} onMouseDown={()=>document.execCommand('foreColor', false, color)} />
            })}
        </ul>
    )

    const [textDropDown, setTextDropDown] = useState(false)

    const [currentTextSize, setCurrentTextSize] = useState('Normal')

    const heading = () => {
        setCurrentTextSize('Heading')
        document.execCommand('formatBlock', false, '<h1>')
    }

    const subheading = () => {
        setCurrentTextSize('Sub Heading')
        document.execCommand('formatBlock', false, '<h3>')
    }

    const normal = () => {
        setCurrentTextSize('Normal')
        document.execCommand('formatBlock', false, '<p>')
    }

    const TextSizeDropDown = () => (
        <OutsideClickHandler onOutsideClick={()=>setTextDropDown(false)}>
            <div className={styles.textSizeDropDown} onMouseDown={()=>setTextDropDown(!textDropDown)}> 
                <p id="currentTextSize"><span>{currentTextSize}</span><ChevronDown /></p>
                {
                    textDropDown ? 
                    <ul className={styles.textSizeDropDown}>
                        <li onMouseDown={heading}><h1>Heading</h1><ChevronRight /></li>
                        <li onMouseDown={subheading}><h3>Subtitle</h3><ChevronRight /></li>
                        <li onMouseDown={normal}><span>Normal</span><ChevronRight /></li>
                    </ul>
                    : null
                }
            </div>
        </OutsideClickHandler>
    )

    return <header className={styles.textEditorHeader} id='textEditorHeader' onMouseDown={(e)=>e.preventDefault()}>
                <div className={styles.textOptions}>
                    <TextSizeDropDown />
                    <TextStyleOptions />
                </div>
                <Colors colors={colors} />
            </header>
}

export default Header