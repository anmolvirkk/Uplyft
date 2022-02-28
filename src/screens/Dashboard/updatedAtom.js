import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const updatedAtom = atom({
    key: 'updated',
    default: {snacks: false, atoms: false, upgrade: false},
    effects_UNSTABLE: [persistAtom]
})

export default updatedAtom