import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const notesDropDownAtom = atom({
    key: 'notesDropDown',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default notesDropDownAtom