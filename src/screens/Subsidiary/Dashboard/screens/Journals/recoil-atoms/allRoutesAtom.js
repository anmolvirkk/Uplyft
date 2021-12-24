import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const allRoutesAtom = atom({
    key: 'allRoutes',
    default: {},
    effects_UNSTABLE: [persistAtom]
})

export default allRoutesAtom