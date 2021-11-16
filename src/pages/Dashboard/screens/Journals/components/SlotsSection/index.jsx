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

const SlotsSection = ({styles}) => {

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
    const [books] = useRecoilState(booksAtom)

    const [newSlot, setNewSlot] = useState()
    
    const deleteSlot = () => {

        let newSlots = slots[allRoutes['book']].filter((val)=>val.id!==allRoutes[allRoutes['book']][allRoutes['date']])
        setSlots({...slots, [allRoutes['book']]: newSlots})
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

    const setRoute = (id) => {
        setAllRoutes({...allRoutes, [allRoutes['book']]: {...allRoutes[allRoutes['book']], [allRoutes['date']]: id}})
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
            <div className={styles.sideSection}>
                <div className={styles.slotSection}>
                    {slots[allRoutes['book']]&&slots[allRoutes['book']][allRoutes['date']] ? slots[allRoutes['book']][allRoutes['date']].map((item)=>{
                        return item.id ? <NavLink onMouseEnter={(e)=>addToolTipForSlots(e)} onClick={()=>setRoute(item.id)} key={item.id} to={`/journals/${allRoutes['book']}/${allRoutes['date']}/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={item.title}><p>{item.title.replace(/\s/g, "") ==='' ? item.time : item.title}</p>
                        <MoreMenu items={[{name: "rename", function: renameSlot}, {name: "delete", function: deleteSlot}]} id={`slotsMoreMenu${item.id}`} pos={{right: '-1.75vh', top: '3.5vh'}} /></NavLink> : null
                    }) : <div className={styles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
                </div>
                <AddButton name="entry" />
                {newSlot ? <Redirect to={`/journals/${allRoutes['book']}/${allRoutes['date']}/${newSlot}`} /> : null}
                {allRoutes['book']?<Redirect from={`/journals/${allRoutes['book']}/${allRoutes['date']}`} to={`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            </div>
        )
    }else{
        return null
    }
}
export default SlotsSection