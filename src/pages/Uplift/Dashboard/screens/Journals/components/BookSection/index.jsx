import React, {useState} from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './_book.sass'
import AddButton from '../AddButton'
import MoreMenu from '../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil' 
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import booksAtom from '../../recoil-atoms/booksAtom'

import openModal from '../../../../functions/openModal'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import company from '../../../../../../../company'

const BookSection = ({ styles }) => {

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

    const setBookRoute = (id) => {
        setAllRoutes({...allRoutes, book: id})
    }

    const iconsSvg = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]
    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name){
                return <div className="bookIcon" key={index}>{iconsSvg[index]}</div>
            }
            return null
        })

    }

    return (
    <div className={styles.journals}>
        <div className={styles.bookSection} id="bookSection">
            {
            books.length > 0 ?
            books.map((props)=>(
                <NavLink onMouseDown={()=>setBookRoute(props.id)} key={props.id} to={allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/uplift/dashboard/${company.journals}/${props.id}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/uplift/dashboard/${company.journals}/${props.id}/${allRoutes['date']}/`} activeClassName="activeBook" style={{display: 'flex'}}>
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
                                {selectIcon(props.icon)}
                            </div>
                        </div>
                    </div>
                    <MoreMenu items={[{name: "edit", function: editJournal}, {name: "delete", function: deleteJournal}]} id={`journalMoreMenu${props.id}`} pos={{right: '-2.5vh', top: '3.5vh'}} />
                </NavLink>
            )) : <div className={styles.helperTextAddEntry}><p>Add a journal to begin!</p><ArrowDown /></div>
            }
        </div>
        <AddButton allRoutes={allRoutes} setAllRoutes={setAllRoutes} name="journal" books={books} setBooks={setBooks} />
        {newBook ? <Redirect to={`/uplift/dashboard/${company.journals}/${newBook}/${allRoutes['date']}/`} /> : null}
    </div>
)
}

export default BookSection