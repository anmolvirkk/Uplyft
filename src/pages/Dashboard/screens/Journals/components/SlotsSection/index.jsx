import React, {useState} from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import MoreMenu from '../../../../components/MoreMenu'
import AddButton from '../../../../components/AddButton'
import {ArrowDown} from 'react-feather'

const SlotsSection = ({styles, currentSection, openModal, slots, setSlots, books, allRoutes, setAllRoutes, setDate}) => {

    const [newSlot, setNewSlot] = useState()
    
    const deleteSlot = () => {

        let newSlots = slots[allRoutes['book']].filter((val)=>val.id!==allRoutes[allRoutes['date']][allRoutes['book']])
        slots[allRoutes['book']] = newSlots
        setSlots({...slots})
        if(newSlots[newSlots.length - 1]){
            
            let resetSlot = async () => {
                setNewSlot(null)
            }
    
            resetSlot().then(()=>{
                setNewSlot(newSlots[newSlots.length - 1].id)
                allRoutes[allRoutes['date']][allRoutes['book']] = newSlots[newSlots.length - 1].id
                setAllRoutes({...allRoutes})
            })

        }else{
            
            let resetSlot = async () => {
                setNewSlot(null)
            }

            resetSlot().then(()=>{
                allRoutes[allRoutes['date']][allRoutes['book']] = null
                setAllRoutes({...allRoutes})
            })

        }

    }

    const renameSlot = () => {
        openModal({type: 'entry'})
    }

    const setRoute = (id) => {
        allRoutes[allRoutes['date']][allRoutes['book']] = id
        setAllRoutes({...allRoutes})
    }
    

    document.addEventListener('mouseover', function(e) {
        if(e.target.classList.contains(styles.sideSectionSlot)){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                 e.target.classList.add(styles.overflownSlot)
            }else if(e.target.classList.contains(styles.overflownSlot)) {
                e.target.classList.remove(styles.overflownSlot)
            }
        }
    });

    if(books.length !== 0 && allRoutes['book']){
        return (
            <div className={styles.sideSection}>
                <div className={styles.slotSection}>
                    {slots[allRoutes['book']]&&slots[allRoutes['book']].length!==0 ? slots[allRoutes['book']].map((item)=>{
                        return <NavLink onClick={()=>setRoute(item.id)} key={item.id} to={`/journals/${allRoutes['date']}/${allRoutes['book']}/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={item.title}><p>{item.title.replace(/\s/g, "") ==='' ? item.time : item.title}</p>
                        <MoreMenu items={[{name: "rename", function: renameSlot}, {name: "delete", function: deleteSlot}]} id={`slotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
                    }) : <div className={styles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
                </div>
                <AddButton setDate={setDate} allRoutes={allRoutes} setAllRoutes={setAllRoutes} name="entry" currentSection={currentSection} slots={slots} setSlots={setSlots} />
                {newSlot ? <Redirect to={`/journals/${allRoutes['date']}/${allRoutes['book']}/${newSlot}`} /> : null}
                {allRoutes['book']&&allRoutes[allRoutes['date']][allRoutes['book']]?<Redirect from={`/journals/${allRoutes['date']}/${allRoutes['book']}`} to={`/journals/${allRoutes['date']}/${allRoutes['book']}/${allRoutes[allRoutes['date']][allRoutes['book']]}`} />:null}
            </div>
        )
    }else{
        return null
    }
}
export default SlotsSection