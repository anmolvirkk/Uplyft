import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const eventsAtom = atom({
    key: 'events',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default eventsAtom