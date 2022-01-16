import React, {useState} from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './_book.sass'
import AddButton from '../AddButton'
import MoreMenu from '../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil' 
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import booksAtom from '../../recoil-atoms/booksAtom'

import openModal from '../../../../functions/openModal'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import company from '../../../../../../../company'
import currentMobileSectionAtom from '../../recoil-atoms/currentMobileSectionAtom'

import { iconsSvg } from '../../../../variables/journalConfig'

const BookSection = ({ styles, isMobile }) => {

    const [newBook, setNewBook] = useState(null)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [books, setBooks] = useRecoilState(booksAtom)

    const deleteJournal = () => {
        let newBooks = books.filter((value)=>value.id!==allRoutes['book'])
        setBooks([...newBooks])

        if(newBooks[newBooks.length - 1]){
            
            let resetBook = async () => {
                setNewBook(null)
            }
    
            resetBook().then(()=>{
                setNewBook(newBooks[newBooks.length - 1].id)
                setAllRoutes({...allRoutes, book: newBooks[newBooks.length - 1].id})
            })

        }else{
            
            let resetBook = async () => {
                setNewBook(null)
            }

            resetBook().then(()=>{
                setAllRoutes({...allRoutes, book: null})
            })

        }

    }

    const editJournal = () => {
        openModal({type: 'journal', setModalConfig: setModalConfig})
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
                document.getElementById(from).style.zIndex = 1
            }, 300)
        }, 50)
        document.getElementById('journalCalendar').scrollLeft = document.getElementById('journalCalendar').scrollWidth
    }

    const setBookRoute = (id, e) => {
        setAllRoutes({...allRoutes, book: id})
        if(e.target.className){
            if(typeof e.target.className === 'string'){
                if(isMobile && e.target.className.search('moremenu') === -1){
                    animateToSection('bookSection', 'journalSideSection')
                    setCurrentMobileSection(1)
                }
            }
        }
    }

    return (
    <div className={styles.journalBooks} style={isMobile?{height: `${window.innerHeight - 80 - 60}px`}:null} id="bookSection">
        <div className={styles.bookSection}>
            {
            books.length > 0 ?
            books.map((props)=>(
                <NavLink onMouseDown={(e)=>setBookRoute(props.id, e)} key={props.id} to={allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/${company.subsidiary}/dashboard/${company.journals}/${props.id}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/${company.subsidiary}/dashboard/${company.journals}/${props.id}/${allRoutes['date']}/`} activeClassName={isMobile?null:"activeBook"} style={{display: 'flex'}}>
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
                                {iconsSvg[props.icon]}
                            </div>
                        </div>
                    </div>
                    <MoreMenu items={[{name: "edit", function: editJournal}, {name: "delete", function: deleteJournal}]} id={`journalMoreMenu${props.id}`} pos={{right: '-2.5vh', top: '3.5vh'}} />
                </NavLink>
            )) : <div className={styles.helperTextAddEntry} style={isMobile?{height: `${window.innerHeight - 80 - 60}px`}:null}><p>Add a journal to begin!</p>{!isMobile?<ArrowDown />:null}</div>
            }
        </div>
        <AddButton allRoutes={allRoutes} setAllRoutes={setAllRoutes} name="journal" books={books} setBooks={setBooks} />
        {newBook ? <Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${newBook}/${allRoutes['date']}/`} /> : null}
    </div>
)
}

export default BookSection