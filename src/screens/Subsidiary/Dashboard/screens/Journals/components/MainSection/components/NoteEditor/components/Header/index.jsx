import React, {useState, useEffect} from 'react'
import {Bold, Italic, Underline, List, ChevronDown, ChevronRight, ChevronUp} from 'react-feather'
import styles from './_header.module.sass'

import { colors } from '../../../../../../../../variables/journalConfig'

import OutsideClickHandler from 'react-outside-click-handler-lite'
import { isMobile } from '../../../../../../../../variables/mobileHeights'
import { useRecoilState } from 'recoil'
import darkModeAtom from '../../../../../../../../components/SideBar/components/DarkMode/darkModeAtom'

let textcolors = ['#000000', ...colors]

const Header = () => {

    const [darkMode] = useRecoilState(darkModeAtom)

    if(darkMode){
        textcolors = ['#FFFFFF', ...colors]
    }else{
        textcolors = ['#969696', ...colors]
    }

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
    const [color, setColor] = useState(0)

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
            const el = document.getElementById('textEditor')
            const selection = window.getSelection()
            const range = document.createRange()
            selection.removeAllRanges()
            range.selectNodeContents(el); 
            range.collapse(false)
            selection.addRange(range)
            el.focus()
        }
    }

    const setColorMobile = (index) => {
        setColor(index)
        document.execCommand('foreColor', false, textcolors[color])
    }

    const toggleColors = () => {
        if(document.getElementById('mobileToolbarColors').style.transform === 'translateY(0px)'){
            document.getElementById('mobileToolbarColors').style.transform = 'translateY(calc( 100% + 40px ))'
        }else{
            document.getElementById('mobileToolbarColors').style.transform = 'translateY(0px)'
        }
    }

    const hideColors = () => {
        document.getElementById('mobileToolbarColors').style.transform = 'translateY(calc( 100% + 40px ))'
    }

    const TextStyleOptions = () => (
        <ul className={styles.textStyleOptions}>
            <li onMouseDown={()=>setStyleState.bold()} className={isBold ?  styles.activeBtn : null}><Bold /></li>
            <li onMouseDown={()=>setStyleState.italic()} className={isItalic ?  styles.activeBtn : null}><Italic /></li>
            <li onMouseDown={()=>setStyleState.underline()} className={isUnderline ?  styles.activeBtn : null}><Underline /></li>
            <li onMouseDown={()=>setStyleState.insertUnorderedList()} className={isList ?  styles.activeBtn : null}><List /></li>
            {isMobile?<li>
            <OutsideClickHandler onOutsideClick={hideColors}>
                <div className={styles.currentColor} onMouseDown={toggleColors}>
                    <div className={styles.circleWrapper}>
                        <div className={styles.circle} style={{backgroundColor: textcolors[color]}} />
                    </div>
                </div>
                <ul className={styles.allColors} id='mobileToolbarColors'>
                        {textcolors.map((item, index)=>{
                            if(item !== textcolors[color]){
                                return <li key={index} style={{backgroundColor: item}} onMouseDown={()=>setColorMobile(index)} />
                            }else{
                                return null
                            }
                        })}
                </ul>
            </OutsideClickHandler>
            </li>:null}
        </ul>
    )
    
    const Colors = () => (
        <ul className={styles.colors}>
            {textcolors.map((color, index)=>{
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
        setCurrentTextSize('Subtitle')
        document.execCommand('formatBlock', false, '<h3>')
    }

    const normal = () => {
        setCurrentTextSize('Normal')
        document.execCommand('formatBlock', false, '<div>')
    }

    const TextSizeDropDown = () => (
        <OutsideClickHandler onOutsideClick={()=>setTextDropDown(false)}>
            <div className={styles.textSizeDropDown} onMouseDown={()=>setTextDropDown(!textDropDown)}> 
                <p id="currentTextSize"><span>{currentTextSize}</span>{textDropDown?<ChevronUp />:<ChevronDown />}</p>
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
                <Colors />
            </header>
}

export default Header