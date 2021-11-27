import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const projectsAtom = atom({
    key: 'projects',
    default: [{
        id: 'all',
        color: 0,
        icon: 29,
        name: 'all',
        tasks: []
    }],
    effects_UNSTABLE: [persistAtom]
})

export default projectsAtom