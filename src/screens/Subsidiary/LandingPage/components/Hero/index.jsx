import React, { useState, useEffect } from 'react'
import styles from './_hero.module.sass'
import company from '../../../../../company'

let timers = []

const Hero = () => {
    const [sliderContent, setSliderContent] = useState({
        name: company.journals,
        type: 'journals',
        subheading: 'Your private, 100% customizable online journal.',
        colors: {
            primary: '#FF00A1',
            secondary: '#FF66C4'
        }
    })
    const toolContents = {
        journals: {
            name: company.journals,
            type: 'journals',
            subheading: 'Your private, 100% customizable online journal.',
            colors: {
                primary: '#FF00A1',
                secondary: '#FF66C4'
            }
        },
        schedule: {
            name: company.schedule,
            type: 'schedule',
            subheading: 'Safely backed up schedule helping you track your habits, tasks and events.',
            colors: {
                primary: '#0065FE',
                secondary: '#38B6FF'
            }
        },
        notes: {
            name: company.notes,
            type: 'notes',
            subheading: 'Capture and arrange your ideas to remember everything.',
            colors: {
                primary: '#3A1582',
                secondary: '#A400FE'
            }
        },
        finances: {
            name: company.finances,
            type: 'finances',
            subheading: 'Budget tracking, Smart Investing, Future Planning, Tax Saving, and much more',
            colors: {
                primary: '#FE3200',
                secondary: '#FF914D'
            }
        },
        fitness: {
            name: company.fitness,
            type: 'fitness',
            subheading: 'Track calories, log workouts, create custom routines and diet plans.',
            colors: {
                primary: '#FFE500',
                secondary: '#42D104'
            }
        }
    }
    useEffect(()=>{
        let timer
        let progress = 0
        const setTimer = (nextTool) => {
            document.getElementById('heroProgress').children[0].style.width = 0
            timers.forEach((item)=>{
                clearInterval(item)
                timers = timers.filter(i=>i!==item)
            })
            timer = setInterval(() => {
                progress++
                if(progress<100){
                    document.getElementById('heroProgress').children[0].style.width =progress+'%'
                }else{
                    clearInterval(timer)
                    setSliderContent(nextTool)
                }
            }, 50)
            timers.push(timer)
        }
        for(let i=0; i<document.getElementsByClassName(styles.tools)[0].children.length; i++){
            if(document.getElementsByClassName(styles.tools)[0].children[i].classList.contains(styles.activeTool)){
                document.getElementById('heroProgress').style.left = 175*i+'px'
                document.getElementById('heroProgress').children[0].style.background = `linear-gradient(200deg, ${Object.values(toolContents)[i].colors.secondary}, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, ${Object.values(toolContents)[i].colors.primary} 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, ${Object.values(toolContents)[i].colors.secondary}, ${Object.values(toolContents)[i].colors.primary})`
                if(i===document.getElementsByClassName(styles.tools)[0].children.length-2){
                    setTimer(Object.values(toolContents)[0])
                }else{
                    setTimer(Object.values(toolContents)[i+1])
                }
            }
        }
    })
    const Tool = ({type}) => {
        return <img loading='lazy' decoding='async' onMouseDown={()=>setSliderContent(toolContents[type])} src = {`/logos/${type}.png`} alt={company[type]} className={sliderContent.name===company[type]?styles.activeTool:null} />
    }
    return (
        <div className={styles.hero}>
            <img loading='lazy' decoding='async' className={styles.mainLogo} src="/logos/subsidiaryText.png" alt={company.subsidiary} />
            <h1>The ultimate toolkit to manage your life</h1>
            <button className={styles.cta}>Try for free</button>
            <div className={styles.slider} style={{background: `linear-gradient(200deg, ${sliderContent.colors.secondary}, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, ${sliderContent.colors.primary} 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, ${sliderContent.colors.secondary}, ${sliderContent.colors.primary})`}}>
                <img loading='lazy' decoding='async' src = {`/screens/${sliderContent.type}.png`} alt={company[sliderContent.type]} />
            </div>
            <div className={styles.tools}>
                <Tool type="journals" />
                <Tool type="schedule" />
                <Tool type="notes" />
                <Tool type="finances" />
                <Tool type="fitness" />
                <div id="heroProgress" className={styles.progress}>
                    <hr />
                </div>
            </div>
            <img loading='lazy' decoding='async' className={styles.subLogo} src = {`/logos/${sliderContent.type}Text.png`} alt={sliderContent.name} />
            <h3>{sliderContent.subheading}</h3>
            <button className={styles.cta} style={{background: `linear-gradient(200deg, ${sliderContent.colors.secondary}, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, ${sliderContent.colors.primary} 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, ${sliderContent.colors.secondary}, ${sliderContent.colors.primary})`}}>Try for free</button>
        </div>
    )
}

export default Hero
