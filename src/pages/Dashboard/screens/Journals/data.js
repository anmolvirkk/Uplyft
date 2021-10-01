import {File, Check, Calendar, Anchor} from 'react-feather'

const data = [
    {
        id: 0,
        icon: <Anchor />,
        color: "rgb(126, 217, 86)",
        sections: 
        [
                    {
                        id: 0,
                        icon: <File />,
                        name: 'notes',
                        slots: []
                    },
                    {
                        id: 1,
                        icon: <Check />,
                        name: 'tasks',
                        slots: [
                            {
                                id: 0,
                                title: 'Title',
                                body: 'loriem ipsum'
                            }
                        ]
                    },
                    {
                        id: 2,
                        icon: <Calendar />,
                        name: 'events',
                        slots: [
                            {
                                id: 0,
                                title: 'Title',
                                body: 'loriem ipsum'
                            }
                        ]
                    }
        ]
    }
]

export default data