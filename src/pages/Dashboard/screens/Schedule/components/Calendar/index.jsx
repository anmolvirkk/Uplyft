import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './_main.sass'
import { useRecoilState } from 'recoil'
import allCalendarEventsAtom from '../../recoil-atoms/allCalendarEvents'

const localizer = momentLocalizer(moment)

const MainCalendar = () => {

    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    let events = []
    allCalendarEvents.forEach((item)=>{
        events.push({
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.color
        })
    })

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
        />
    )
}

export default MainCalendar