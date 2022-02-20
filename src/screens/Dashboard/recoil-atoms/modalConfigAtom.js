import {atom} from 'recoil'

const modalConfigAtom = atom({
    key: 'modalConfig',
    default: {type: '', current: '', id: null, updatePrompt: null, name: null}
})

export default modalConfigAtom