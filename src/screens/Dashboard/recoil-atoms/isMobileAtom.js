import {atom} from 'recoil'

const isMobileAtom = atom({
    key: 'isMobile',
    default: window.innerWidth < 639,
})

export default isMobileAtom