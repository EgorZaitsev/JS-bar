

function templateEngine(block) {
    if (block === undefined || block === null || block === false) {
            return document.createTextNode('');
    }
    
    if (typeof block === 'string' || typeof block === 'number' || block === true) {
        return document.createTextNode(block)
    }

    if(Array.isArray(block)) {
        const fragment = document.createDocumentFragment();

        block.forEach(item =>{
            const el = templateEngine(item);

            fragment.appendChild(el);
        });
        return fragment;
    }
    


    const result = document.createElement(block.tag);

    if (block.cls) {
        result.classList.add(
            ...[].concat(block.cls).filter(Boolean)
        );
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);
        
        keys.forEach(key => {
            result.setAttribute(key, block.attrs[key]);
        });
    }

    
    result.appendChild(templateEngine(block.content));

    

    return result;
}

