import React, { useState } from 'react'
import styles from './_hero.module.sass'
import company from '../../../../../company'

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
            subheading: 'Your private, 100% customizable online journal.',
            colors: {
                primary: '#FFE500',
                secondary: '#42D104'
            }
        }
    }
    return (
        <div className={styles.hero}>
            <img className={styles.mainLogo} src="/logos/subsidiaryText.png" alt={company.subsidiary} />
            <h1>The ultimate toolkit to manage your life</h1>
            <div className={styles.slider} style={{background: `linear-gradient(200deg, ${sliderContent.colors.secondary}, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, ${sliderContent.colors.primary} 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, ${sliderContent.colors.secondary}, ${sliderContent.colors.primary})`}}>
                <img src = {`/screens/${sliderContent.type}.png`} alt={company[sliderContent.type]} />
            </div>
            <div className={styles.tools}>
                <img onMouseDown={()=>setSliderContent(toolContents.journals)} src = '/logos/journals.png' alt={company.journals} className={sliderContent.name===company.journals?styles.activeTool:null} />
                <img onMouseDown={()=>setSliderContent(toolContents.schedule)} src = '/logos/schedule.png' alt={company.schedule} className={sliderContent.name===company.schedule?styles.activeTool:null} />
                <img onMouseDown={()=>setSliderContent(toolContents.notes)} src = '/logos/notes.png' alt={company.notes} className={sliderContent.name===company.notes?styles.activeTool:null} />
                <img onMouseDown={()=>setSliderContent(toolContents.finances)} src = '/logos/finances.png' alt={company.finances} className={sliderContent.name===company.finances?styles.activeTool:null} />
                <img onMouseDown={()=>setSliderContent(toolContents.fitness)} src = '/logos/fitness.png' alt={company.fitness} className={sliderContent.name===company.fitness?styles.activeTool:null} />
            </div>
            <img className={styles.subLogo} src = {`/logos/${sliderContent.type}Text.png`} alt={sliderContent.name} />
            <h3>{sliderContent.subheading}</h3>
            <button className={styles.cta} style={{background: `linear-gradient(200deg, ${sliderContent.colors.secondary}, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, ${sliderContent.colors.primary} 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, ${sliderContent.colors.secondary}, ${sliderContent.colors.primary})`}}>Try for free</button>
        </div>
    )
}

export default Hero
