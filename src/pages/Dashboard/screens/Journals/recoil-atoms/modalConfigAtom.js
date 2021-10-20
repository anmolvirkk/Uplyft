import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const modalConfigAtom = atom({
    key: 'modalConfig',
    default: {type: '', current: '', id: null, updatePrompt: null, name: null},
    effects_UNSTABLE: [persistAtom]
})

export default modalConfigAtom