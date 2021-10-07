import React from 'react'
import {Bold, Italic, Underline, List, ChevronDown} from 'react-feather'
import styles from './_header.module.sass'

const TextSizeDropDown = () => (
    <div className={styles.textSizeDropDown}>
        <p><span>Normal</span><ChevronDown /></p>
        <ul className={styles.textSizeDropDown}>
            <li>Heading</li>
            <li>Sub Heading</li>
            <li>Quote</li>
        </ul>
    </div>
)

const TextStyleOptions = () => (
    <ul className={styles.textStyleOptions}>
        <li><Bold /></li>
        <li><Italic /></li>
        <li><Underline /></li>
    </ul>
)

const Colors = ({colors}) => {
    return <ul className={styles.colors}>
            {colors.map((color, index)=>{
                return <li key={index} style={{backgroundColor: color}} />
            })}
        </ul>
}

const Header = ({colors}) => {
    return <header className={styles.textEditorHeader}>
                <div className={styles.textOptions}>
                    <TextSizeDropDown />
                    <TextStyleOptions />
                    <List className={styles.list} />
                </div>
                <Colors colors={colors} />
            </header>
}

export default Header