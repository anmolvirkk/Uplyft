import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const scheduleSideMenuAtom = atom({
    key: 'scheduleSideMenuAtom',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default scheduleSideMenuAtom