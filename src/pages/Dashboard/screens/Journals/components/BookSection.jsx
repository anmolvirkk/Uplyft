import React from 'react'
import { NavLink } from 'react-router-dom'
import './_book.scss'
import AddButton from '../../../components/AddButton'

const BookSection = ({ styles, journalData, setCurrentBook}) => {

    return (
    <div className={styles.journals}>
        <div className={styles.bookSection}>
            {journalData.map((props)=>(
                <NavLink onClick={()=>setCurrentBook(props.id)} key={props.id} to={`/journals/${props.id}/`} activeClassName="activeBook">
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
            </NavLink>
            ))}
        </div>
        <AddButton name="journal" />
    </div>
)
}

export default BookSection