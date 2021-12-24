import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const dropDownDayAtom = atom({
    key: 'dropDownDay',
    default: {day: 'All', open: false},
    effects_UNSTABLE: [persistAtom]
})

export default dropDownDayAtom