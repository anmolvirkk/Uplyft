import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const tagsAtom = atom({
    key: 'tags',
    default: {
        priority: [
            {
                label: 'Low',
                value: 0
            },
            {
                label: 'Medium',
                value: 50
            },
            {
                label: 'High',
                value: 100
            }
        ],
        timeRequired: [
            {
                label: 'Low',
                value: 0
            },
            {
                label: 'Medium',
                value: 50
            },
            {
                label: 'High',
                value: 100
            }
        ]
    },
    effects_UNSTABLE: [persistAtom]
})

export default tagsAtom