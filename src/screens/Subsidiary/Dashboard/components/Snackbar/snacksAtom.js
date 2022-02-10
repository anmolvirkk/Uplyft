import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const snacksAtom = atom({
    key: 'snacksAtom',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default snacksAtom