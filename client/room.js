const writeEvent = (text) =>{
    const parent = document.querySelector('#participants');
    const el = document.createElement('li');
    el.innerHTML = text;
    console.log(parent.childNodes);
    parent.appendChild(el);
};

var par = JSON.parse(localStorage.getItem("part"));
console.log(par);
const onFormSubmitted = (e) =>{
    e.preventDefault();
        for(var j=0;j<par.length;j++){
            sock.emit('message', par[j]);
        }
};


const sock =io();
sock.on('message', writeEvent);
document.querySelector('#yo').addEventListener('submit',onFormSubmitted);

function do_change(){
    document.getElementById("yo").style.display = "none";
};
