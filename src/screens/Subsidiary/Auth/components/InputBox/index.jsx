import React from 'react'
import styles from './_inputBox.module.sass'
import { windowHeight } from '../../../Dashboard/variables/mobileHeights'
import { useRecoilState } from 'recoil'
import isMobileAtom from '../../../Dashboard/screens/Journals/recoil-atoms/isMobileAtom'

const scrollToView = (e, wrapper, isMobile) => {
    let elem = document.getElementById(wrapper)
    const checkParent = (elem) => {
        let parent = elem.parentNode
        if(parent.id){
            return parent
        }else if(parent){
            return checkParent(parent)
        }
    }
    if(elem){
        const top = elem.scrollHeight-(elem.scrollHeight-(elem.scrollTop+e.clientY-(checkParent(e.target).clientHeight)))
        if(window.innerHeight < windowHeight){
            elem.scroll({top: top, behavior: 'smooth'})
        }else if(isMobile){
            setTimeout(()=>{
                if(window.innerHeight < windowHeight){
                    elem.scroll({top: top, behavior: 'smooth'})
                }
            }, 500)
        }
    }
}

const InputBox = ({wrapper, name, type, marginBottom, value, onChange, onBlur, icon, autoFocus, onFocus, id, autoComplete, onTouchEnd}) => {
    const [isMobile] = useRecoilState(isMobileAtom)
    return (
    <div onMouseDown={(e)=>scrollToView(e, wrapper, isMobile)} className={`${styles.group} ${icon?styles.icon:null}`} style={marginBottom?{marginBottom: marginBottom+'px'}:null}>
        {icon?icon:null}
        <input onTouchEnd={onTouchEnd?(e)=>onTouchEnd(e):null} autoComplete={autoComplete?autoComplete:null} id={id?id:null} onFocus={onFocus?(e)=>onFocus(e):null} autoFocus={autoFocus?autoFocus:null} onBlurCapture={onBlur?(e)=>onBlur(e):null} onChange={onChange?e=>onChange(e):null} defaultValue={value?value:null} type={type} required="required"/><span className={styles.highlight}></span><span className={styles.bar}></span>
        <label>{name}</label>
    </div>
    )
}

export default InputBox;
