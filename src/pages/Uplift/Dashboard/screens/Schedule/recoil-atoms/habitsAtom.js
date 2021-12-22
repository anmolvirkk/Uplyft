import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const habitsAtom = atom({
    key: 'habits',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default habitsAtom