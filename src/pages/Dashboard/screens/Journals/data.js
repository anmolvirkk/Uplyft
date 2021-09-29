import {File, Check, Calendar, Anchor, Coffee} from 'react-feather'

const data = [
    {
        id: 0,
        icon: <Anchor />,
        color: "#9BAAD3",
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
    },
    {
        id: 1,
        icon: <Coffee />,
        color: "#7ED956",
        sections: 
        [
                    {
                        id: 0,
                        icon: <File />,
                        name: 'notes',
                        slots: [
                            {
                                id: 0,
                                subsections: [
                                    {
                                        name: 'brain dump',
                                        color: '#E4EE90',
                                        id: 0,
                                        data: []
                                    },
                                    {
                                        name: 'gratitude',
                                        color: '#FFC972',
                                        id: 1,
                                        data: []
                                    },
                                    {
                                        name: 'future',
                                        color: '#02D3FF',
                                        id: 2,
                                        data: []
                                    },
                                    {
                                        name: 'past',
                                        color: '#FF9B73',
                                        id: 3,
                                        data: []
                                    },
                                    {
                                        name: 'feelings',
                                        color: '#B692FE',
                                        id: 4,
                                        data: []
                                    },
                                    {
                                        name: 'note',
                                        color: '#EFF1F8',
                                        id: 5,
                                        data: []
                                    }
                                ]
                            }
                        ]
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