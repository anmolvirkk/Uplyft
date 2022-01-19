import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const scheduleHeaderAtom = atom({
    key: 'scheduleHeader',
    default: {title: 'Schedule', onAdd: null},
    effects_UNSTABLE: [persistAtom]
})

export default scheduleHeaderAtom