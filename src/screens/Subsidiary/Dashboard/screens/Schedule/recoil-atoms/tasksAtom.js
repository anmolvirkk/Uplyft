import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const tasksAtom = atom({
    key: 'tasks',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default tasksAtom