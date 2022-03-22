
var par =  JSON.parse(localStorage.getItem("part"));
var scores =  JSON.parse(localStorage.getItem("scores"));
var food=  localStorage.getItem("food");
var img =  localStorage.getItem("img");
console.log(par);
const sock =io();
function passvalue(){
    var username=document.getElementById('username').value;
    localStorage.setItem("naam",username);
    if(par == null){
        par=[username+" has scored 0"];
        scores=[0];
    }else{
        par.push(username + " has scored 0");
        scores.push("0");
    }
    console.log(par);
    localStorage.setItem("part", JSON.stringify(par));
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("idx", par.length-1);
    return;
}

