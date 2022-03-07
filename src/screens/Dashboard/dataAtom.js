import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const dataAtom = atom({
    key: 'data',
    default: {},
    effects_UNSTABLE: [persistAtom]
})

export default dataAtom