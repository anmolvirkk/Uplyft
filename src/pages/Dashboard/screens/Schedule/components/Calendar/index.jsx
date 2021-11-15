import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './_main.sass'
import { useRecoilState } from 'recoil'
import allCalendarEventsAtom from '../../recoil-atoms/allCalendarEventsAtom'
import moment from 'moment'
import habitsAtom from '../../recoil-atoms/habitsAtom'

const localizer = momentLocalizer(moment)

const MainCalendar = () => {

    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [habit] = useRecoilState(habitsAtom)
    
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
        let getWeekDate = new Date()
        getWeekDate.setHours(new Date(item.start).getHours())
        getWeekDate.setMinutes(new Date(item.start).getMinutes())
        getWeek(new Date(getWeekDate)).forEach((day)=>{
            let habitRepeat = habit.find((i)=>i.id === item.id).repeat
            for(let key in habitRepeat){
                if(habitRepeat[key] !== null && key!=='unique' && key!=='all'){
                    habitRepeat[key].forEach((repeat)=>{
                        let times = {
                            from: {
                                h: parseInt(repeat.from.split(':')[0]),
                                m: parseInt(repeat.from.split(':')[1])
                            },
                            to: {
                                h: parseInt(repeat.to.split(':')[0]),
                                m: parseInt(repeat.to.split(':')[1])
                            }
                        }
                        if(key === day.toLocaleDateString('en-US', {weekday: 'short'}).toLowerCase()){
                            let startDate = new Date(new Date(item.start).setFullYear(day.getFullYear()))
                            startDate.setMonth(day.getMonth())
                            startDate.setDate(day.getDate())
                            startDate.setHours(new Date(times.from.h))
                            startDate.setMinutes(new Date(times.from.m))
                            let endDate = new Date(new Date(item.end).setFullYear(day.getFullYear()))
                            endDate.setMonth(day.getMonth())
                            endDate.setDate(day.getDate())
                            endDate.setHours(new Date(times.to.h))
                            endDate.setMinutes(new Date(times.to.m))
                            if(endDate.getHours() < startDate.getHours()){
                                endDate.setDate(new Date(day.getDate() + 1))
                            }
                            events.push({
                                title: item.title,
                                start: startDate,
                                end: endDate,
                                color: item.color,
                                id: day.valueOf()
                            })
                        }
                    })
                }
            }
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
                            let habitRepeat = habit.find((i)=>i.id === item.id).repeat
                            for(let key in habitRepeat){
                                if(habitRepeat[key] !== null && key!=='unique' && key!=='all'){
                                    habitRepeat[key].forEach((repeat)=>{
                                        let times = {
                                            from: {
                                                h: parseInt(repeat.from.split(':')[0]),
                                                m: parseInt(repeat.from.split(':')[1])
                                            },
                                            to: {
                                                h: parseInt(repeat.to.split(':')[0]),
                                                m: parseInt(repeat.to.split(':')[1])
                                            }
                                        }
                                        if(key === day.toLocaleDateString('en-US', {weekday: 'short'}).toLowerCase()){
                                            let startDate = new Date(new Date(item.start).setFullYear(day.getFullYear()))
                                            startDate.setMonth(day.getMonth())
                                            startDate.setDate(day.getDate())
                                            startDate.setHours(new Date(times.from.h))
                                            startDate.setMinutes(new Date(times.from.m))
                                            let endDate = new Date(new Date(item.end).setFullYear(day.getFullYear()))
                                            endDate.setMonth(day.getMonth())
                                            endDate.setDate(day.getDate())
                                            endDate.setHours(new Date(times.to.h))
                                            endDate.setMinutes(new Date(times.to.m))
                                            if(endDate.getHours() < startDate.getHours()){
                                                endDate.setDate(new Date(day.getDate() + 1))
                                            }
                                            events.push({
                                                title: item.title,
                                                start: startDate,
                                                end: endDate,
                                                color: item.color,
                                                id: day.valueOf()
                                            })
                                        }
                                    })
                                }
                            }
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