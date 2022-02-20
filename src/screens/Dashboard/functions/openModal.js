const openModal  = ({setModalConfig, ...props}) => {
    switch (props.type) {
        case 'entry':
            setModalConfig({type: props.type})
        break
        case 'journal':
            setModalConfig({type: props.type, id: props.id})
        break
        case 'prompt':
            setModalConfig({type: props.type, updatePrompt: props.updatePrompt, category: props.category})
        break
        case 'editprompt':
            setModalConfig({type: props.type, updatePrompt: props.updatePrompt, category: props.category, current: props.current})
        break
        case 'addhabit':
            setModalConfig({type: props.type})
        break
        case 'addjournal':
            setModalConfig({type: props.type})
        break
        default: return null
    }
}

export default openModal