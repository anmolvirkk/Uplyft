import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const authAtom = atom({
    key: 'auth',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default authAtom