const setDate = async (allRoutes, setAllRoutes, dates, setDates) => {

    const addDate = () => {
            let date = new Date()
            setDates([...dates, date])
            if(!allRoutes['date']){
                allRoutes['date'] = date.valueOf()
            } 
            setAllRoutes({...allRoutes, date: date.valueOf(), [allRoutes['book']]: {...allRoutes[allRoutes['book']], [date.valueOf()]: null}})
    }

    if(dates.length !== 0){

        let shouldAddDate = false

        let checkShouldAddDate = async () => {

            let todaysDate = new Date()
            let storedDate = new Date(dates[dates.length - 1])

            if(todaysDate.toDateString() !== storedDate.toDateString()){
                shouldAddDate = true
            }

        }

        checkShouldAddDate().then(()=>{
            if(shouldAddDate){
                addDate()
                let calendarElement = document.getElementById('journalCalendar')
                if(calendarElement){
                    calendarElement.scrollTo(0,calendarElement.scrollHeight)
                }
            }
        })

    }else {
        addDate()
    }

}

export default setDate