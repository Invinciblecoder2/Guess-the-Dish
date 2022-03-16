var par = JSON.parse(localStorage.getItem("part"));
const writeEvent = (p) =>{
    parent.innerHTML="";
    console.log(p);
    for(var j=0;j<p.length;j++){
        const parent = document.querySelector('#participants');
        const el = document.createElement('li');
        el.innerHTML = p[j];
        console.log(p[j]);
        parent.appendChild(el);
    }
};

console.log(par);
const onFormSubmitted = (e) =>{
    e.preventDefault();
    sock.emit('message', par);
    
};


const sock =io();
sock.on('message', writeEvent);
document.querySelector('#yo').addEventListener('submit',onFormSubmitted);

function do_change(){
    document.getElementById("yo").style.display = "none";
};
