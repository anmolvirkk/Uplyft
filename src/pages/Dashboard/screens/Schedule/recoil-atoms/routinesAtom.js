import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const routinesAtom = atom({
    key: 'routines',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default routinesAtom