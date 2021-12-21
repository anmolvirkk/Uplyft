import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const projectsAtom = atom({
    key: 'projects',
    default: [
        {
            id: 'today',
            color: 0,
            icon: null,
            name: 'today',
            tasks: []
        },
        {
            id: 'all',
            color: 1,
            icon: null,
            name: 'all',
            tasks: []
        }
    ],
    effects_UNSTABLE: [persistAtom]
})

export default projectsAtom