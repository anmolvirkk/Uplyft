import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const isGuestAtom = atom({
    key: 'isGuest',
    default: true,
    effects_UNSTABLE: [persistAtom]
})

export default isGuestAtom