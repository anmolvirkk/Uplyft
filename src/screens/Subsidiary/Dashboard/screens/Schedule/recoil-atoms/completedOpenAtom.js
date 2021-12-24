import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const completedOpenAtom = atom({
    key: 'completedOpen',
    default: true,
    effects_UNSTABLE: [persistAtom]
})

export default completedOpenAtom