import React, {useState} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './_main.sass'

const Calendar = ({color}) => {

    let calendarStyle = {'--selectedDay': color}

    const [selectedDays, setSelectedDays] = useState([])
    
    const handleDayClick = (e) => {
        setSelectedDays([...selectedDays, e])
    }

    return (
        <div className='streakCalendarWrapper' style={calendarStyle}>
            <DayPicker
                selectedDays={selectedDays}
                onDayClick={(e)=>handleDayClick(e)}
            />
        </div>
    )
}

export default Calendar
