import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const openBookAtom = atom({
    key: 'openBook',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default openBookAtom