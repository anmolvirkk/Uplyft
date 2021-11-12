import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const allCalendarEventsAtom = atom({
    key: 'allCalendarEvents',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default allCalendarEventsAtom