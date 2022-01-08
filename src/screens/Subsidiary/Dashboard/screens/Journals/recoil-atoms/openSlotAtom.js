import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const openSlotAtom = atom({
    key: 'openSlot',
    effects_UNSTABLE: [persistAtom]
})

export default openSlotAtom