const writeEvent = (text) =>{
    const parent = document.querySelector('#participants');
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};
const onFormSubmitted = (e) =>{
    e.preventDefault();
    const input = document.querySelector('#names');
    input.value = localStorage.getItem("naam");
    const text = input.value;
    sock.emit('message', text);
};


const sock =io();
sock.on('message', writeEvent);
document.querySelector('#participants').addEventListener('submit',onFormSubmitted);

function do_change(){
    document.getElementById("yo").style.display = "block";
};