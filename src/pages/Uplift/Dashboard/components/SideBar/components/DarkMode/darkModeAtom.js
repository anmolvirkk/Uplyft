import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const darkModeAtom = atom({
    key: 'darkMode',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default darkModeAtom