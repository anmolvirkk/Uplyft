import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const tagsAtom = atom({
    key: 'eventTags',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export default tagsAtom