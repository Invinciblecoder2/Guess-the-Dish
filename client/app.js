
var par = JSON.parse(localStorage.getItem("part"));
if(par == null){
    par=["Sahaj"];
}
console.log(par);
const sock =io();
function passvalue(){
    var username=document.getElementById('username').value;
    localStorage.setItem("naam",username);
    par.push(username);
    console.log(par);
    localStorage.setItem("part", JSON.stringify(par));
    return;
}
