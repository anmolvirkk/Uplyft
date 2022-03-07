import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

const priceAtom = atom({
    key: 'price',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

export default priceAtom