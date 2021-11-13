import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './_main.sass'
import { useRecoilState } from 'recoil'
import allCalendarEventsAtom from '../../recoil-atoms/allCalendarEvents'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MainCalendar = () => {

    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    
    let events = []
    const getWeek = (date) => {
        let week = []
        for (let i = 0; i < 7; i++) {
            let first = date.getDate() - date.getDay() + i 
            let day = new Date(date.setDate(first))
            week.push(day)
        }
        return week
    }
    allCalendarEvents.forEach((item)=>{
        getWeek(new Date(item.start)).forEach((day)=>{
            let endDate = new Date(new Date(item.end).setFullYear(day.getFullYear()))
            endDate.setMonth(day.getMonth())
            endDate.setDate(day.getDate())
            if(endDate.getHours() < day.getHours()){
                endDate.setDate(new Date(day.getDate() + 1))
            }
            events.push({
                title: item.title,
                start: day,
                end: endDate,
                color: item.color,
                id: day.valueOf()
            })
        })
    })   

    const setRepeatEvents = (date) => {
        if(date){
            const shouldAddEvent = () => {
                let addEvent = true
                let weekDate = getWeek(new Date(new Date(date)))[0].toLocaleDateString("en-US", {day: '2-digit', month: 'long', year: 'numeric'})
                events.forEach((item)=>{
                    let eventDate = item.start.toLocaleDateString("en-US", {day: '2-digit', month: 'long', year: 'numeric'})
                    if(weekDate === eventDate){
                        addEvent = false
                    }
                })
                return addEvent
            }
            if(shouldAddEvent()){
                allCalendarEvents.forEach((item)=>{
                        getWeek(new Date(new Date(date))).forEach((day)=>{
                                let startDate = new Date(new Date(item.start).setFullYear(day.getFullYear()))
                                startDate.setMonth(day.getMonth())
                                startDate.setDate(day.getDate())
                                let endDate = new Date(new Date(item.end).setFullYear(day.getFullYear()))
                                endDate.setMonth(day.getMonth())
                                endDate.setDate(day.getDate())
                                if(endDate.getHours() < day.getHours()){
                                    endDate.setDate(new Date(day.getDate() + 1))
                                }
                                events.push({
                                    title: item.title,
                                    start: startDate,
                                    end: endDate,
                                    color: item.color,
                                    id: day.valueOf()
                                })
                        })
                })  
            } 
        }
    }

    const eventStyleGetter = (e) => {
        let style = {
            backgroundColor: e.color
        }
        return {
            style: style
        }
    }
    
    return (
        <Calendar 
            selectable
            showMultiDayTimes
            localizer={localizer}
            startAccessor="start"
            endAccessor="end" 
            events={events}
            defaultView={Views.WEEK}
            views={[Views.WEEK, Views.DAY, Views.AGENDA]}
            eventPropGetter={(e)=>eventStyleGetter(e)}
            onNavigate={(e)=>setRepeatEvents(e)}
        />
    )
}

export default MainCalendar