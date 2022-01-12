import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const scheduleAddDropDownAtom = atom({
    key: 'scheduleAddDropDown',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default scheduleAddDropDownAtom