import React, {useState} from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import MoreMenu from '../../../../components/MoreMenu'
import AddButton from '../AddButton'
import {ArrowDown} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import slotsAtom from '../../recoil-atoms/slotsAtom'
import booksAtom from '../../recoil-atoms/booksAtom'

import openModal from '../../../../functions/openModal'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import company from '../../../../../../../company'
import currentMobileSectionAtom from '../../recoil-atoms/currentMobileSectionAtom'

const SlotsSection = ({styles, isMobile}) => {

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
    const [books] = useRecoilState(booksAtom)

    const [newSlot, setNewSlot] = useState()
    
    const deleteSlot = () => {
        let newSlots = slots[allRoutes['book']][allRoutes['date']].filter((val)=>val.id!==allRoutes[allRoutes['book']][allRoutes['date']])
        setSlots({...slots, [allRoutes['book']]: {...slots[allRoutes['book']], [allRoutes['date']]: newSlots}})
        if(newSlots[newSlots.length - 1]){
            
            let resetSlot = async () => {
                setNewSlot(null)
            }
    
            resetSlot().then(()=>{
                setNewSlot(newSlots[newSlots.length - 1].id)
                setAllRoutes({...allRoutes, [allRoutes['book']]:{[allRoutes['date']]: newSlots[newSlots.length - 1].id}})
            })

        }else{
            
            let resetSlot = async () => {
                setNewSlot(null)
            }

            resetSlot().then(()=>{
                setAllRoutes({...allRoutes, [allRoutes['book']]:{[allRoutes['date']]: null}})
            })

        }

    }

    const renameSlot = () => {
        openModal({type: 'entry', setModalConfig: setModalConfig})
    }

    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)

    const animateToSection = (from, to) => {
        document.getElementById(from).style.position = 'absolute'
        document.getElementById(from).style.zIndex = 99
        document.getElementById(to).style.position = 'static'
        document.getElementById(to).style.display = 'flex'
        document.getElementById('journalCalendar').style.position = 'static'
        document.getElementById('journalCalendar').style.display = 'flex'
        setTimeout(()=>{
            document.getElementById(from).style.transform = 'translateX(-100%)'
            document.getElementById(to).style.transform = 'translateX(0%)'
            document.getElementById(to).style.zIndex = 1
            document.getElementById('journalCalendar').style.transform = 'translateX(0%)'
            document.getElementById('journalCalendar').style.zIndex = 1
            setTimeout(()=>{
                document.getElementById(from).style.display = 'none'
            }, 300)
        }, 50)
        document.getElementById('journalCalendar').scrollLeft = document.getElementById('journalCalendar').scrollWidth
    }

    const setRoute = (id, e) => {
        setAllRoutes({...allRoutes, [allRoutes['book']]: {...allRoutes[allRoutes['book']], [allRoutes['date']]: id}})
        if(e.target.className){
            if(typeof e.target.className === 'string'){
                if(isMobile && e.target.className.search('moremenu') === -1){
                    animateToSection('journalSideSection', 'journalMainSection')
                    setCurrentMobileSection(2)
                }
                if(isMobile){
                    document.getElementById('journalCalendar').scrollLeft = document.getElementById('journalCalendar').scrollWidth
                }else{
                    document.getElementById('journalCalendar').scrollTop = document.getElementById('journalCalendar').scrollHeight
                }
            }
        }
    }

    const addToolTipForSlots = (e) => {
        if(e.target.classList.contains(styles.sideSectionSlot)){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                    e.target.classList.add(styles.overflownSlot)
            }else if(e.target.classList.contains(styles.overflownSlot)) {
                e.target.classList.remove(styles.overflownSlot)
            }
        }
    }

    if(books.length !== 0 && allRoutes['book']){
        return (
            <div className={styles.sideSection} id='journalSideSection' style={isMobile?{height: `${window.innerHeight - 80 - 60 - 100}px`}:null}>
                <div className={styles.slotSection}>
                    {slots[allRoutes['book']]&&slots[allRoutes['book']][allRoutes['date']]&&slots[allRoutes['book']][allRoutes['date']].length>0 ? slots[allRoutes['book']][allRoutes['date']].map((item)=>{
                        return item.id ? <NavLink onMouseEnter={(e)=>addToolTipForSlots(e)} onClick={(e)=>setRoute(item.id, e)} key={item.id} to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${item.id}`} className={styles.sideSectionSlot} activeClassName={isMobile?null:styles.activeSectionSlot} data-title={item.title}><p>{item.title.replace(/\s/g, "") ==='' ? item.time : item.title}</p>
                        <MoreMenu items={[{name: "rename", function: renameSlot}, {name: "delete", function: deleteSlot}]} id={`slotsMoreMenu${item.id}`} pos={{right: '-1.75vh', top: '3.5vh'}} /></NavLink> : null
                    }) : <div className={styles.helperTextAddEntry} style={isMobile?{height: `${window.innerHeight - 80 - 60}px`}:null}><p>Add your first entry!</p>{isMobile?<ArrowDown />:null}</div>}
                </div>
                <AddButton name="entry" />
                {newSlot ? <Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${newSlot}`} /> : null}
                {allRoutes['book']?<Redirect from={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}`} to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            </div>
        )
    }else{
        return null
    }
}
export default SlotsSection