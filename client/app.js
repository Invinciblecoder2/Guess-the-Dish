const sock =io();
function passvalue(){
    var username=document.getElementById('username').value;
    localStorage.setItem("naam",username);
    return;
}