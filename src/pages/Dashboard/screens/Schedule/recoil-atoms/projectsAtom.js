import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const projectsAtom = atom({
    key: 'projects',
    default: [
        {
            id: 'today',
            color: 0,
            icon: 29,
            name: 'today',
            tasks: []
        },
        {
            id: 'all',
            color: 1,
            icon: 29,
            name: 'all',
            tasks: []
        }
    ],
    effects_UNSTABLE: [persistAtom]
})

export default projectsAtom