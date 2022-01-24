import React, {useState} from 'react'
import { Book, Edit, Grid, Navigation, Sliders, Moon, CornerDownRight, Calendar, Folder, RefreshCw, Filter, List, Share2, Link, Image, Search, CreditCard, DollarSign, TrendingUp, BarChart2, Briefcase, PieChart, Coffee } from 'react-feather'
import styles from './_features.module.sass'
import company from '../../../../../company'
import { useRecoilState } from 'recoil'
import isMobileAtom from '../../../Dashboard/screens/Journals/recoil-atoms/isMobileAtom'

const features = {
    journals: [
        {
            title: 'Multiple Journals',
            description: '',
            icon: <Book />,
            img: 'multipleJournals'
        },
        {
            title: 'Customizable Journals',
            description: '',
            icon: <Sliders />,
            img: 'customJournals'
        },
        {
            title: 'Multiple Notes',
            description: '',
            icon: <Grid />,
            img: 'multipleNotes'
        },
        {
            title: 'Prompts to get you started',
            description: '',
            icon: <Navigation />,
            img: 'journalPrompts'
        },
        {
            title: 'Minimalistic Note Editor',
            description: '',
            icon: <Edit />,
            img: 'journalEditor'
        },
        {
            title: 'Dark Mode',
            description: '',
            icon: <Moon />,
            img: 'darkModeJournals'
        }
    ],
    schedule: [
        {
            title: 'Track habits',
            description: '',
            icon: <RefreshCw />,
            img: 'trackHabits'
        },
        {
            title: 'Track projects',
            description: '',
            icon: <Folder />,
            img: 'trackProjects'
        },
        {
            title: 'Track events',
            description: '',
            icon: <Calendar />,
            img: 'trackEvents'
        },
        {
            title: 'Multiple Subtasks',
            description: '',
            icon: <CornerDownRight />,
            img: 'multipleSubtasks'
        },
        {
            title: 'Filter Tasks',
            description: '',
            icon: <Filter />,
            img: 'filterTasks'
        },
        {
            title: 'Dark Mode',
            description: '',
            icon: <Moon />,
            img: 'darkModeSchedule'
        }
    ],
    notes: [
        {
            title: 'Efficiently structured notes',
            description: '',
            icon: <List />,
            img: 'notes'
        },
        {
            title: 'One tap to mind map',
            description: '',
            icon: <Share2 />,
            img: 'notes'
        },
        {
            title: 'Fluid note linking',
            description: '',
            icon: <Link />,
            img: 'notes'
        },
        {
            title: 'Mix media',
            description: '',
            icon: <Image />,
            img: 'notes'
        },
        {
            title: 'Folders to stay organized',
            description: '',
            icon: <Folder />,
            img: 'notes'
        },
        {
            title: 'Powerful Search',
            description: '',
            icon: <Search />,
            img: 'notes'
        }
    ],
    finances: [
        {
            title: 'Automate credit card payments',
            description: '',
            icon: <CreditCard />,
            img: 'finances'
        },
        {
            title: 'Build credit',
            description: '',
            icon: <DollarSign />,
            img: 'finances'
        },
        {
            title: 'Future Financial Planning',
            description: '',
            icon: <TrendingUp />,
            img: 'finances'
        },
        {
            title: 'Taxes on autopilot',
            description: '',
            icon: <RefreshCw />,
            img: 'finances'
        },
        {
            title: 'Expense Management',
            description: '',
            icon: <BarChart2 />,
            img: 'finances'
        },
        {
            title: 'Manage your portfolio',
            description: '',
            icon: <Briefcase />,
            img: 'finances'
        }
    ],
    fitness: [
        {
            title: 'Track calories',
            description: '',
            icon: <Coffee />,
            img: 'fitness'
        },
        {
            title: 'Create custom recipies',
            description: '',
            icon: <Book />,
            img: 'fitness'
        },
        {
            title: 'Create custom workout routines',
            description: '',
            icon: <RefreshCw />,
            img: 'fitness'
        },
        {
            title: 'Workout Log',
            description: '',
            icon: <Edit />,
            img: 'fitness'
        },
        {
            title: 'Fitness progress tracking',
            description: '',
            icon: <TrendingUp />,
            img: 'fitness'
        },
        {
            title: 'Micros & Macros tracking',
            description: '',
            icon: <PieChart />,
            img: 'fitness'
        }
    ]
}

const Features = () => {
    
    const [currentFeature, setCurrentFeature] = useState({icon: 'journals', feature: 0})
    const [isMobile] = useRecoilState(isMobileAtom)

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
                    <img src={`/screens/${features[currentFeature.icon][currentFeature.feature].img}${!isMobile?'.png':'Mobile.png'}`} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Features