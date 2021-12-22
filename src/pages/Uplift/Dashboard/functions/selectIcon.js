import { iconsSvg } from "../variables/journalConfig"

const selectIcon = (name) => {

    return iconsSvg.map((icon, index)=>{
        if(icon.type.render.displayName === name){
            return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
        }
        return null
    })

}

export default selectIcon