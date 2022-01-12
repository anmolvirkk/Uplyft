import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const currentScheduleMobileSectionAtom = atom({
    key: 'currentScheduleMobileSection',
    default: 0,
    effects_UNSTABLE: [persistAtom]
})

export default currentScheduleMobileSectionAtom