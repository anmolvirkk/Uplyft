import React, {useState} from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './_book.scss'
import AddButton from '../../../../components/AddButton'
import MoreMenu from '../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'
 
const BookSection = ({ styles, openModal, colors, icons, books, setBooks, allRoutes, setAllRoutes, setDate}) => {

    const [newBook, setNewBook] = useState(null)

    const deleteJournal = () => {
        let newBooks = books.filter((value)=>value.id!==allRoutes['book'])
        setBooks([...newBooks])

        if(newBooks[newBooks.length - 1]){
            
            let resetBook = async () => {
                setNewBook(null)
            }
    
            resetBook().then(()=>{
                setNewBook(newBooks[newBooks.length - 1].id)
                allRoutes['book'] = newBooks[newBooks.length - 1].id
                setAllRoutes({...allRoutes})
            })

        }else{
            
            let resetBook = async () => {
                setNewBook(null)
            }

            resetBook().then(()=>{
                allRoutes['book'] = null
                setAllRoutes({...allRoutes})
            })

        }

    }

    const editJournal = () => {
        openModal({type: 'journal'})
    }

    const setBookRoute = (id) => {
        allRoutes['book'] = id
        setAllRoutes({...allRoutes})
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
                <NavLink onMouseDown={()=>setBookRoute(props.id)} key={props.id} to={allRoutes&&allRoutes[props.id]&&allRoutes[allRoutes['date']][allRoutes['book']]?`/journals/${allRoutes['date']}/${props.id}/${allRoutes[allRoutes['date']][allRoutes['book']]}`:`/journals/${allRoutes['date']}/${props.id}/`} activeClassName="activeBook" style={{display: 'flex'}}>
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
                    <MoreMenu items={[{name: "edit", function: editJournal}, {name: "delete", function: deleteJournal}]} id={`journalMoreMenu${props.id}`} pos={{right: '-2.5vh', top: '150px'}} />
                </NavLink>
            )) : <div className={styles.helperTextAddEntry}><p>Add a journal to begin!</p><ArrowDown /></div>
            }
        </div>
        <AddButton setDate={setDate} allRoutes={allRoutes} setAllRoutes={setAllRoutes} colors={colors} icons={icons} name="journal" books={books} setBooks={setBooks} />
        {newBook ? <Redirect to={`/journals/${allRoutes['date']}/${newBook}/`} /> : null}
    </div>
)
}

export default BookSection