import React, {useState} from 'react'
import {Bold, Italic, Underline, List, ChevronDown, ChevronRight, CornerUpLeft, CornerUpRight} from 'react-feather'
import styles from './_header.module.sass'

const Header = ({colors, bold}) => {

    document.addEventListener('mouseup', function() {
        if(document.queryCommandState("bold")){
            setIsBold(true)
        }else{
            setIsBold(false)
        }
        if(document.queryCommandState("italic")){
            setIsItalic(true)
        }else{
            setIsItalic(false)
        }
        if(document.queryCommandState("underline")){
            setIsUnderline(true)
        }else{
            setIsUnderline(false)
        }
        if(document.queryCommandState("insertUnorderedList")){
            setIsList(true)
        }else{
            setIsList(false)
        }
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
                break;
        }
    }, false)

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [isList, setIsList] = useState(false)


    const TextStyleOptions = () => (
        <ul className={styles.textStyleOptions}>
            <li onMouseDown={()=>document.execCommand('bold')} className={isBold ?  styles.activeBtn : null}><Bold /></li>
            <li onMouseDown={()=>document.execCommand('italic')} className={isItalic ?  styles.activeBtn : null}><Italic /></li>
            <li onMouseDown={()=>document.execCommand('underline')} className={isUnderline ?  styles.activeBtn : null}><Underline /></li>
        </ul>
    )
    
    const Colors = ({colors}) => (
        <ul className={styles.colors}>
            {colors.map((color, index)=>{
                return <li key={index} style={{backgroundColor: color}} onMouseDown={()=>document.execCommand('foreColor', false, color)} />
            })}
        </ul>
    )
    
    let undoInterval
    
    const undoStart = () => {
        undoInterval = setInterval(()=>{document.execCommand('undo')}, 10)
    }
    
    let redoInterval
    
    const redoStart = () => {
        redoInterval = setInterval(()=>{document.execCommand('redo')}, 10)
    }
    
    const TimeControl = () => (
        <ul className={styles.textStyleOptions}>
            <li onMouseDown={undoStart} onMouseUp={()=>clearInterval(undoInterval)}><CornerUpLeft /></li>
            <li onMouseDown={redoStart} onMouseUp={()=>clearInterval(redoInterval)}><CornerUpRight /></li>
        </ul>
    )
    
    const [textDropDown, setTextDropDown] = useState(false)

    document.addEventListener('mouseup', function(e) {
        const currentTextSize = document.getElementById('currentTextSize');
        if(currentTextSize){
            if (!currentTextSize.contains(e.target)) {
                setTextDropDown(false)
            }
        }
    })

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
        <div className={styles.textSizeDropDown} onMouseDown={()=>setTextDropDown(!textDropDown)}> 
            <p id="currentTextSize"><span>{currentTextSize}</span><ChevronDown /></p>
            {
                textDropDown ? 
                <ul className={styles.textSizeDropDown}>
                    <li onMouseDown={heading}><h1>Heading</h1><ChevronRight /></li>
                    <li onMouseDown={subheading}><h3>Sub Heading</h3><ChevronRight /></li>
                    <li onMouseDown={normal}><span>Normal</span><ChevronRight /></li>
                </ul>
                : null
            }
        </div>
    )

    return <header className={styles.textEditorHeader}>
                <div className={styles.textOptions}>
                    <TextSizeDropDown />
                    <TextStyleOptions bold={bold} />
                    <List onMouseDown={()=>document.execCommand('insertUnorderedList')}  className={isList ?  `${styles.activeBtn} ${styles.list}` : styles.list} />
                    <TimeControl />
                </div>
                <Colors colors={colors} />
            </header>
}

export default Header