import React, {useState} from 'react'
import {Bold, Italic, Underline, List, ChevronDown, ChevronRight} from 'react-feather'
import styles from './_header.module.sass'

const TextStyleOptions = () => (
    <ul className={styles.textStyleOptions}>
        <li onMouseDown={()=>document.execCommand('bold')}><Bold /></li>
        <li onMouseDown={()=>document.execCommand('italic')}><Italic /></li>
        <li onMouseDown={()=>document.execCommand('underline')}><Underline /></li>
    </ul>
)

const Colors = ({colors}) => {
    return <ul className={styles.colors}>
            {colors.map((color, index)=>{
                return <li key={index} style={{backgroundColor: color}} onMouseDown={()=>document.execCommand('foreColor', false, color)} />
            })}
        </ul>
}

const Header = ({colors, bold}) => {

    
    const [textDropDown, setTextDropDown] = useState(false)

    document.addEventListener('mouseup', function(e) {
        const currentTextSize = document.getElementById('currentTextSize');
        if(currentTextSize){
            if (!currentTextSize.contains(e.target)) {
                setTextDropDown(false)
            }
        }
    });

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
                    <List className={styles.list}  onMouseDown={()=>document.execCommand('insertUnorderedList')} />
                </div>
                <Colors colors={colors} />
            </header>
}

export default Header