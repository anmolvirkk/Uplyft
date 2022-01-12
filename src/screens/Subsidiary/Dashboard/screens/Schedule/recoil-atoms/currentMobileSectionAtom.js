import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const currentMobileSectionAtom = atom({
    key: 'currentMobileSection',
    default: 0,
    effects_UNSTABLE: [persistAtom]
})

export default currentMobileSectionAtom