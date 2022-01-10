import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const notesAtom = atom({
    key: 'notes',
    default: {},
    effects_UNSTABLE: [persistAtom]
})

export default notesAtom