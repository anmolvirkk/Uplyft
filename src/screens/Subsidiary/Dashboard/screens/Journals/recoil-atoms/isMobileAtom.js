import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const isMobileAtom = atom({
    key: 'isMobile',
    default: window.innerWidth < 1450,
    effects_UNSTABLE: [persistAtom]
})

export default isMobileAtom