import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const newDateAtom = atom({
    key: 'newDate',
    default: {},
    effects_UNSTABLE: [persistAtom]
})

export default newDateAtom