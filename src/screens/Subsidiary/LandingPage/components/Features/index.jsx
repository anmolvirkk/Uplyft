import React, {useState} from 'react'
import { Book, Edit, Grid, Navigation, Sliders, Moon, CornerDownRight, Calendar, Folder, RefreshCw, Filter, List, Share2, Link, Image, Search, CreditCard, DollarSign, TrendingUp, BarChart2, Briefcase, PieChart, Coffee } from 'react-feather'
import styles from './_features.module.sass'
import company from '../../../../../company'

const features = {
    journals: [
        {
            title: 'Customizable Journals',
            description: '',
            icon: <Sliders />,
            img: 'customJournals.png'
        },
        {
            title: 'Multiple Journals',
            description: '',
            icon: <Book />,
            img: 'multipleJournals.png'
        },
        {
            title: 'Multiple Notes',
            description: '',
            icon: <Grid />,
            img: 'multipleNotes.png'
        },
        {
            title: 'Prompts to get you started',
            description: '',
            icon: <Navigation />,
            img: 'journalPrompts.png'
        },
        {
            title: 'Minimalistic Note Editor',
            description: '',
            icon: <Edit />,
            img: 'journalEditor.png'
        },
        {
            title: 'Dark Mode',
            description: '',
            icon: <Moon />,
            img: 'darkModeJournals.png'
        }
    ],
    schedule: [
        {
            title: 'Track habits',
            description: '',
            icon: <RefreshCw />,
            img: 'trackHabits.png'
        },
        {
            title: 'Track projects',
            description: '',
            icon: <Folder />,
            img: 'trackProjects.png'
        },
        {
            title: 'Track events',
            description: '',
            icon: <Calendar />,
            img: 'trackEvents.png'
        },
        {
            title: 'Multiple Subtasks',
            description: '',
            icon: <CornerDownRight />,
            img: 'multipleSubtasks.png'
        },
        {
            title: 'Filter Tasks',
            description: '',
            icon: <Filter />,
            img: 'filterTasks.png'
        },
        {
            title: 'Dark Mode',
            description: '',
            icon: <Moon />,
            img: 'darkModeSchedule.png'
        }
    ],
    notes: [
        {
            title: 'Efficiently structured notes',
            description: '',
            icon: <List />,
            img: 'notes.png'
        },
        {
            title: 'One tap to mind map',
            description: '',
            icon: <Share2 />,
            img: 'notes.png'
        },
        {
            title: 'Fluid note linking',
            description: '',
            icon: <Link />,
            img: 'notes.png'
        },
        {
            title: 'Mix media',
            description: '',
            icon: <Image />,
            img: 'notes.png'
        },
        {
            title: 'Folders to stay organized',
            description: '',
            icon: <Folder />,
            img: 'notes.png'
        },
        {
            title: 'Powerful Search',
            description: '',
            icon: <Search />,
            img: 'notes.png'
        }
    ],
    finances: [
        {
            title: 'Automate credit card payments',
            description: '',
            icon: <CreditCard />,
            img: 'finances.png'
        },
        {
            title: 'Build credit',
            description: '',
            icon: <DollarSign />,
            img: 'finances.png'
        },
        {
            title: 'Future Financial Planning',
            description: '',
            icon: <TrendingUp />,
            img: 'finances.png'
        },
        {
            title: 'Taxes on autopilot',
            description: '',
            icon: <RefreshCw />,
            img: 'finances.png'
        },
        {
            title: 'Expense Management',
            description: '',
            icon: <BarChart2 />,
            img: 'finances.png'
        },
        {
            title: 'Manage your portfolio',
            description: '',
            icon: <Briefcase />,
            img: 'finances.png'
        }
    ],
    fitness: [
        {
            title: 'Track calories',
            description: '',
            icon: <Coffee />,
            img: 'fitness.png'
        },
        {
            title: 'Create custom recipies',
            description: '',
            icon: <Book />,
            img: 'fitness.png'
        },
        {
            title: 'Create custom workout routines',
            description: '',
            icon: <RefreshCw />,
            img: 'fitness.png'
        },
        {
            title: 'Workout Log',
            description: '',
            icon: <Edit />,
            img: 'fitness.png'
        },
        {
            title: 'Fitness progress tracking',
            description: '',
            icon: <TrendingUp />,
            img: 'fitness.png'
        },
        {
            title: 'Micros & Macros tracking',
            description: '',
            icon: <PieChart />,
            img: 'fitness.png'
        }
    ]
}

const Features = () => {
    
    const [currentFeature, setCurrentFeature] = useState({icon: 'journals', feature: 0})

    return (
        <div className={styles.featureSection}>
            <h2>The Features</h2>
            <div className={styles.wrapper}>
                <div className={styles.icons}>
                    <div className={currentFeature.icon === 'journals'?styles.activeIcon:null}>
                        <img src='/logos/journals.png' alt={company.journals} onMouseDown={()=>setCurrentFeature({feature: 0, icon: 'journals'})} />
                    </div>
                    <div className={currentFeature.icon === 'schedule'?styles.activeIcon:null}>
                        <img src='/logos/schedule.png' alt={company.schedule} onMouseDown={()=>setCurrentFeature({feature: 0, icon: 'schedule'})} />
                    </div>
                    <div className={currentFeature.icon === 'notes'?styles.activeIcon:null}>
                        <img src='/logos/notes.png' alt={company.notes} onMouseDown={()=>setCurrentFeature({feature: 0, icon: 'notes'})} />
                    </div>
                    <div className={currentFeature.icon === 'finances'?styles.activeIcon:null}>
                        <img src='/logos/finances.png' alt={company.finances} onMouseDown={()=>setCurrentFeature({feature: 0, icon: 'finances'})} />
                    </div>
                    <div className={currentFeature.icon === 'fitness'?styles.activeIcon:null}>
                        <img src='/logos/fitness.png' alt={company.fitness} onMouseDown={()=>setCurrentFeature({feature: 0, icon: 'fitness'})} />
                    </div>
                </div>
                <div className={styles.features}>
                    {features[currentFeature.icon].map((item, i)=>{
                        return (
                            <div key={i} onMouseDown={()=>setCurrentFeature({...currentFeature, feature: i})} className={currentFeature.feature===i?`${styles.activeFeature} ${styles.feature}`:styles.feature}>
                                <div className={styles.title}>
                                    {item.icon}
                                    <h3>{item.title}</h3>
                                </div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.content}>
                    <img src={`/screens/${features[currentFeature.icon][currentFeature.feature].img}`} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Features