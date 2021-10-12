import React from 'react'
import { NavLink } from 'react-router-dom'
import './_book.scss'
import AddButton from '../../../components/AddButton'
import MoreMenu from '../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
 
const BookSection = ({ styles, journalData, setJournalData, setCurrentBook, currentBook, openModal, colors, icons, currentDate}) => {

    const deleteJournal = () => {
        const newJournalData = journalData.filter((value)=>value.id!==currentBook)
        setJournalData([...newJournalData])
        const setBook = journalData[currentBook + 1] !== undefined ? currentBook+1 : currentBook-1
        setCurrentBook(setBook)
    }

    const editJournal = () => {
        openModal({type: 'journal', id: currentBook, journalData: journalData, setJournalData: setJournalData})
    }

    return (
    <div className={styles.journals}>
        <div className={styles.bookSection} id="bookSection">
            {
            journalData.length > 0 ?
            journalData.map((props)=>(
                <NavLink onClick={()=>setCurrentBook(props.id)} key={props.id} to={`/journals/${props.id}/`} activeClassName="activeBook" style={{display: 'flex'}}>
                    <div className="book">
                        <div className="book-back book-inner">
                            <div className="book-face" style={{backgroundColor: props.color}}></div>
                        </div>
                        <div className="book-pages book-inner"></div>
                        <div className="book-pages book-inner"></div>
                        <div className="book-pages book-inner"></div>
                        <div className="book-pages book-inner"></div>
                        <div className="book-cover book-inner">
                            <div className="book-face" style={{backgroundColor: props.color}}>
                                {props.icon}
                            </div>
                        </div>
                    </div>
                    <MoreMenu items={[{name: "edit", function: editJournal}, {name: "delete", function: deleteJournal}]} id={`journalMoreMenu${props.id}`} pos={{right: '-2.5vh', top: '20vh'}} />
                </NavLink>
            )) : <div className={styles.helperTextAddEntry}><p>Add a journal to begin!</p><ArrowDown /></div>
            }
        </div>
        <AddButton currentDate={currentDate} colors={colors} icons={icons} name="journal" journalData={journalData} setJournalData={setJournalData} setCurrentBook={setCurrentBook} />
    </div>
)
}

export default BookSection