import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const slotsAtom = atom({
    key: 'slots',
    default: {},
    effects_UNSTABLE: [persistAtom]
})

export default slotsAtom