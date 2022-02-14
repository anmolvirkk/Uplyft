import React, {useRef, useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil'

import { colors } from '../../variables/journalConfig'

import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import { openBookAtom, booksAtom, allPromptsAtom, slotsAtom, allRoutesAtom, planAtom } from '../../allAtoms'

import AddHabit from './components/AddHabit'
import AddTask from './components/AddTask'
import AddProject from './components/AddProject'
import AddEvent from './components/AddEvent'

import { iconsSvg } from '../../variables/journalConfig'
import InputBox from '../../../Auth/components/InputBox'
import { windowHeight } from '../../variables/mobileHeights'

import confetti from 'canvas-confetti'
import { useEffect } from 'react'

import Lottie from 'react-lottie-player'
import checkData from './check.json'
import down from './down.json'

import { stripeSecret } from '../../../Pricing/components/Plan'
import { plans } from '../../../Pricing'
import company from '../../../../../company'

import loadData from '../../../loading.json'
import authAtom from '../../../Auth/authAtom'

const Modal = () => {

    const setAllRoutes = useSetRecoilState(allRoutesAtom)
    const setOpenBook = useSetRecoilState(openBookAtom)

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    const [books, setBooks] = useRecoilState(booksAtom)
    const setPlan = useSetRecoilState(planAtom)
    const [auth, setAuth] = useRecoilState(authAtom)

    const closeModal = (e) => {
        const modalForm = document.getElementById('modalForm');
        if(modalForm){
            if (!modalForm.contains(e.target)) {
                setModalConfig({type: ''})
            }
        }
    }

    let currentSlotTitle
    if(slots&&slots[allRoutes['book']]&&slots[allRoutes['book']][allRoutes['date']]){

        slots[allRoutes['book']][allRoutes['date']].forEach((item)=>{
            if(item.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                currentSlotTitle = item.title
            }
        })

    }

    const renameText = useRef(currentSlotTitle)
    const setRenameText = (val) => {
        renameText.current = val
    }

    const renameEntry = () => {
        let newSlots = slots[allRoutes['book']][allRoutes['date']].map((data)=>{
            let newData = {...data}
            if(data.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                newData.title = renameText.current
            }
            return newData
        })
        setSlots({...slots, [allRoutes['book']]: {[allRoutes['date']]: [...newSlots]}})
        setModalConfig({type: ''})
    }

    const RenameEntry = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Rename Entry</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <InputBox wrapper='modalContainer' value={renameText.current} name="Entry Name" type="text" onChange={e=>setRenameText(e.target.value)} />
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={renameEntry}>Continue</button>
                </div>
        </div>
    )

    const journalDetail = useRef({color: 0, icon: 0})

    const updateJournalDetails =  {
        color: (num) => {
            journalDetail.current.color = num
            for(let i=0; i<document.getElementById('journalColors').children.length; i++){
                if(i === num){
                    document.getElementById('journalColors').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('journalColors').children[i].children[0].classList.remove(styles.activeButton)
                }
            }
        },
        icon: (num) => {
            journalDetail.current.icon = num
            for(let i=0; i<document.getElementById('journalIcons').children.length; i++){
                if(i === num){
                    document.getElementById('journalIcons').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('journalIcons').children[i].children[0].classList.remove(styles.activeButton)
                }
            }

        }
    }

    const editJournal = () => {
        let newBooks = books.map((data)=>{
            let newData = {...data}
                if(data.id === allRoutes['book']) {
                    newData.icon = journalDetail.current.icon
                    newData.color = colors[journalDetail.current.color]
                }
            return newData
        })
        setBooks([...newBooks])
        setModalConfig({type: ''})
    }

    const EditJournal = ({color, icon}) => {
        journalDetail.current.color = colors.findIndex(i=>i===color)
        journalDetail.current.icon = icon
        return (
            <div className={`${styles.form} ${styles.addHabit} ${styles.habitCustomize}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors} id='journalColors'>
                                {colors.map((color, i)=><li className="colorButtons" onMouseDown={()=>updateJournalDetails.color(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalDetail.current.color ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol id='journalIcons'>
                                {iconsSvg.map((icon, i)=>{
                                    return <li className="iconButtons" onMouseDown={()=>updateJournalDetails.icon(i)} key={i}><div className={i===journalDetail.current.icon ? styles.activeButton : null} />{icon}</li>
                                })}
                            </ol>
                        </li>   
                    </ul>
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={editJournal}>Continue</button>
                </div>
            </div>
        )
    }


    const addJournal = () => {
        let date = new Date()

        let newBook = {
            id: date.valueOf(),
            icon: journalDetail.current.icon,
            color: colors[journalDetail.current.color]
        }

        setBooks([...books, newBook])

        let bookObj = {}
        const bookObjSet = async () => {
            bookObj[newBook.id] = {}
            bookObj[newBook.id][allRoutes['date']] = null
        }
        bookObjSet().then(()=>{
            setAllRoutes({...allRoutes, book: newBook.id ,...bookObj})
            setOpenBook(newBook.id)
            setModalConfig({type: ''})
        })

    }

    const AddJournal = () => (
        <div className={`${styles.form} ${styles.addHabit} ${styles.habitCustomize} ${styles.addJournal}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Add Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors} id='journalColors'>
                                {colors.map((color, i)=><li className="colorButtons" onMouseDown={()=>updateJournalDetails.color(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalDetail.current.color ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol id='journalIcons'>
                                {iconsSvg.map((icon, i)=>{
                                    return <li className="iconButtons" onMouseDown={()=>updateJournalDetails.icon(i)} key={i}><div className={i===journalDetail.current.icon ? styles.activeButton : null} />{icon}</li>
                                })}
                            </ol>
                        </li>   
                    </ul>
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={addJournal}>Continue</button>
                </div>
            </div>
    )


    const newPrompt = useRef('')
    const setNewPrompt = (val) => {
        newPrompt.current = val
    }

    const addPrompt = () => {
        
        for(let key in allPrompts){
            if(key === modalConfig.category.replace(/\s/g, "")){
                let prompts = allPrompts[key]
                setAllPrompts({...allPrompts, [key]: [...prompts, newPrompt.current]})
            }
        }
        modalConfig.updatePrompt(newPrompt.current)
        setModalConfig({type: ''})

    }

    const AddPrompt = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
            <div className={styles.header}>
                <p>Add Prompt</p>
                <X onClick={()=>setModalConfig({type: ''})} />
            </div>
            <InputBox wrapper='modalContainer' name="Enter Prompt" type="text" onChange={e=>setNewPrompt(e.target.value)} />
            <div className={styles.footer}>
                <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                <button className={styles.continueBtn} onClick={addPrompt}>Continue</button>
            </div>
        </div>
    )

    const [editPromptPlaceholder, setEditPromptPlaceholder] = useState('Enter Prompt')

    const editedPrompt = useRef(modalConfig.current)
    const setEditedPrompt = (val) => {
        editedPrompt.current = val
    }

    const editPrompt = () => {
        if(editedPrompt.current.replace(/\s/g, "") !== ''){

            let newPrompts = allPrompts[modalConfig.category.replace(/\s/g, "")].map((data)=>{
                let newData = data
                if(modalConfig.current === data){
                    newData = editedPrompt.current
                }
                return newData
            })

            
            setAllPrompts({...allPrompts, [modalConfig.category.replace(/\s/g, "")]: [...newPrompts]})
            modalConfig.updatePrompt(editedPrompt.current)
            setModalConfig({type: ''})
            setEditPromptPlaceholder('Enter Prompt')

        }else{
            setEditPromptPlaceholder('Prompt Cannot Be Empty')
        }
    }

    const EditPrompt = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Prompt</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <InputBox wrapper='modalContainer' value={editedPrompt.current} name={editPromptPlaceholder} type="text" onChange={e=>setEditedPrompt(e.target.value)} />
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={editPrompt}>Continue</button>
                </div>
            </div>
    )

    const Upgrade = ({title}) => {

        useEffect(()=>{
            let elem = document.getElementById('modalForm')
            confetti({
                particleCount: 300,
                spread: 145,
                origin: {
                    x: (elem.offsetLeft+(elem.clientWidth/2))/window.innerWidth,
                    y: (elem.offsetTop+(elem.clientHeight/2))/window.innerHeight
                }
            })
        }, [])

        return (
            <div className={`${styles.form} ${styles.upgrade}`} id='modalForm'>
                <div className={styles.header}>
                    <p>{title==='Pro'?'Upgraded':'Switched'} to {title} plan</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.checkWrapper}>
                    <Lottie
                        play
                        loop={false}
                        animationData={checkData}
                        style={{ width: 250, height: 250 }}
                    />
                </div>
                <div className={styles.footer}>
                    <button className={styles.continueBtn} onClick={()=>setModalConfig({type: ''})}>Continue</button>
                </div>
            </div>
        )
    }

    const Feedback = () => {
        return (
            <div className={styles.feedback}>
                <h3>Please send us your feedback to improve our service</h3>
                <textarea />
            </div>
        )
    }

    const [loading, setLoading] = useState(false)

    const Subscription = ({amount}) => {
        const Loading = () => {
            return (
                <div className={styles.loading}>
                    <Lottie
                          play
                          loop
                          animationData={loadData}
                          style={{ width: 250, height: 250 }}
                      />
                </div>
            )
        }
        const Cancelled = () => {
            return (
                <div className={`${styles.form} ${styles.upgrade}`} id='modalForm'>
                    <div className={styles.header}>
                        <p>Subscription cancelled</p>
                        <X onClick={()=>setModalConfig({type: ''})} />
                    </div>
                    <div className={styles.checkWrapper}>
                        <Lottie
                            play
                            loop={false}
                            animationData={checkData}
                            style={{ width: 250, height: 250 }}
                        />
                    </div>
                    <div className={styles.footer}>
                        <button className={styles.continueBtn} onClick={()=>setModalConfig({type: ''})}>Continue</button>
                    </div>
                </div>
            )
        }
        const CancelSubscripton = () => {
            let plan = 'Pro'
            let price = amount/100
            if(price === 25 || price === 275){
                plan = 'Pro'
            }else if(price === 20 || price === 220){
                plan = 'Plus'
            }
            let features = plans.filter(i=>i.title===plan)[0].features
            let starter = plans[0].features
            const cancel = () => {
                let xr = new XMLHttpRequest()
                xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
                xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xr.send(null)
                setLoading(true)
                xr.onload = (sub) => {
                  JSON.parse(sub.currentTarget.response).data.forEach((item, i)=>{
                    let xr = new XMLHttpRequest()
                    xr.open('DELETE', `https://api.stripe.com/v1/subscriptions/${item.id}`, true)
                    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                    xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xr.send(null)
                    if(i === JSON.parse(sub.currentTarget.response).data.length-1){
                        xr.onload = () => {
                            setLoading(null)
                            setPlan('Starter')
                            setAuth({...auth, plan: {...plans[0]}})
                        }
                    }
                  })
                }
            }
            if(loading !== null){
                return (
                    <div className={`${styles.form} ${styles.cancelSubscription}`} id='modalForm'>
                        <div className={styles.header}>
                            <p>{loading?'Cancelling Subscription':'Are you sure you want to cancel your subscription?'}</p>
                            <X onClick={()=>setModalConfig({type: ''})} />
                        </div>
                        {loading?<Loading />:
                        <div>
                            <Feedback />
                            <div className={styles.features}>
                                <h3>What you will be missing out on</h3>
                                <div className={styles.container}>
                                    <div className={styles.column}>
                                        {Object.keys(features).map((item, i)=>{
                                            return (
                                                <div className={styles.category} key={i}>
                                                    <div className={styles.title}><img src={`/logos/${item}.png`} alt={company[item]} />{company[item]}</div>
                                                    <div className={styles.content}>
                                                        <div className={styles.column}>
                                                            {features[item].map((feature, i)=>{
                                                                if(feature!==starter[item][i]){
                                                                    return (
                                                                        <div key={i} className={styles.feature}>
                                                                            <Lottie
                                                                                play
                                                                                loop={false}
                                                                                animationData={checkData}
                                                                                style={{ width: 50, height: 50 }}
                                                                            />
                                                                            <p>{feature}</p>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return null
                                                                }
                                                            })}
                                                        </div>
                                                        <div className={styles.column}>
                                                            {starter[item].map((feature, i)=>{
                                                                if(feature!==features[item][i]){
                                                                    return (
                                                                        <div key={i} className={styles.feature}>
                                                                            <Lottie
                                                                                play
                                                                                loop={false}
                                                                                animationData={down}
                                                                                style={{ width: 50, height: 50 }}
                                                                            />
                                                                            <p>{feature}</p>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return null
                                                                }
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className={styles.footer}>
                            <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                            <button className={styles.continueBtn} onClick={cancel}>Continue</button>
                        </div>
                    </div>
                )
            }else{
                return <Cancelled />
            }
        }
        const UpgradeSubscription = () => {
            let plus = plans[1].features
            let pro = plans[2].features
            const UpgradeButton = ({title}) => {
                return (
                    <div className={styles.upgradeBtn}>
                        <button>Upgrade to <span>&nbsp;{company.subsidiary}&nbsp;</span> {title}</button>
                    </div>
                )
            }
            return (
                <div className={`${styles.form} ${styles.cancelSubscription}`} id='modalForm'>
                    <div className={styles.header}>
                        <p>You're already on starter plan</p>
                        <X onClick={()=>setModalConfig({type: ''})} />
                    </div>
                    <div className={styles.features}>
                        <h1>Upgrade to gain the full experience</h1>
                        <h3>What you will get</h3>
                        <div className={styles.container}>
                            <div className={styles.column}>
                                {Object.keys(plus).map((item, i)=>{
                                    return (
                                        <div className={styles.category} key={i}>
                                            <div className={styles.title}><img src={`/logos/${item}.png`} alt={company[item]} />{company[item]}</div>
                                            <div className={styles.content}>
                                                <div className={styles.column}>
                                                    {plus[item].map((item, i)=>{
                                                        return (
                                                            <div key={i} className={styles.feature}>
                                                                <Lottie
                                                                    play
                                                                    loop={false}
                                                                    animationData={checkData}
                                                                    style={{ width: 50, height: 50 }}
                                                                />
                                                                <p>{item}</p>
                                                            </div>
                                                        )
                                                    })}
                                                    <UpgradeButton title='Plus' />
                                                </div>
                                                <div className={styles.column}>
                                                    {pro[item].map((item, i)=>{
                                                        return (
                                                            <div key={i} className={styles.feature}>
                                                                <Lottie
                                                                    play
                                                                    loop={false}
                                                                    animationData={checkData}
                                                                    style={{ width: 50, height: 50 }}
                                                                />
                                                                <p>{item}</p>
                                                            </div>
                                                        )
                                                    })}
                                                    <UpgradeButton title='Pro' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if(amount!==0){
            return <CancelSubscripton />
        }else{
            return <UpgradeSubscription />
        }
    }

    return (
        <div id='modalContainer' style={{height: window.innerHeight+'px'}} className={`${styles.modal} ${modalConfig.type === 'addEvent'||modalConfig.type === 'editEvent'?styles.addEvent:styles[modalConfig.type+'var']}`} onMouseDown={(e)=>closeModal(e)}>
            <div className={styles.modalWrapper} style={{height: windowHeight+'px'}}>
                {modalConfig.type === 'addjournal' ? 
                <AddJournal /> 
                : modalConfig.type === 'entry' ? 
                <RenameEntry /> 
                : modalConfig.type === 'journal' ?
                <EditJournal color={modalConfig.color} icon={modalConfig.icon} />
                : modalConfig.type === 'prompt' ?
                <AddPrompt />
                : modalConfig.type === 'editprompt' ?
                <EditPrompt />
                : modalConfig.type === 'addhabit' ?
                <AddHabit icons={iconsSvg} type="add" currentHabit={null} />
                : modalConfig.type === 'edithabit' ?
                <AddHabit icons={iconsSvg} type="edit" currentHabit={modalConfig.habit} />
                : modalConfig.type === 'addTask' ?
                <AddTask icons={iconsSvg} type="add" currentTask={null} />
                : modalConfig.type === 'editTask' ?
                <AddTask icons={iconsSvg} type="edit" currentTask={modalConfig.task} currentActiveTask={modalConfig.activeTask} />
                : modalConfig.type === 'addProject' ?
                <AddProject icons={iconsSvg} type="add" currentTask={null} />
                : modalConfig.type === 'editProject' ?
                <AddProject icons={iconsSvg} type="edit" currentProject={modalConfig.project} />
                : modalConfig.type === 'addEvent' ?
                <AddEvent icons={iconsSvg} type="add" currentEvent={null} />
                : modalConfig.type === 'editEvent' ?
                <AddEvent icons={iconsSvg} type="edit" currentEvent={modalConfig.event} />
                : modalConfig.type === 'upgrade' ?
                <Upgrade title={modalConfig.title} />
                : modalConfig.type === 'cancelSubscription' ?
                <Subscription amount={modalConfig.amount} />
                : null
                }
            </div>
        </div>
    )
}

export default Modal