import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const datesAtom = atom({
    key: 'dates',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default datesAtom