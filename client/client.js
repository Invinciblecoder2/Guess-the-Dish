const writeEvent = (text) =>{
    const parent = document.querySelector('#events');
    const el= document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};