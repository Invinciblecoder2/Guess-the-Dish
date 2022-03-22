var par = JSON.parse(localStorage.getItem("part"));
var scores = JSON.parse(localStorage.getItem("scores"));
var food=  localStorage.getItem("food");
var img =  localStorage.getItem("img");
var username = localStorage.getItem("naam");
var idx=localStorage.getItem("idx");
console.log(par);
console.log(img);
console.log("idx = "+idx)
const writeEvent = (p) =>{
    const parent = document.querySelector('#participants');
    parent.innerHTML="";
    console.log(p);
    for(var j=0;j<p.length;j++){
        const el = document.createElement('li');
        el.innerHTML = p[j];
        parent.appendChild(el);
    }
    par = p;
    localStorage.setItem("part", JSON.stringify(par));
};
const onFormSubmitted = (e) =>{
    e.preventDefault();
    document.getElementById("chat").readOnly = false;
    sock.emit('message', par);
    api();
};
const sock=io();
document.querySelector('#yo').addEventListener('submit',onFormSubmitted);
var timeleft;
function do_change1(){
    document.getElementById("start").hidden = true;
    timeleft=30;
    var Timer = setInterval(function(){
    if(timeleft <= 0){
      document.getElementById("yo").style.display = "block";
      document.getElementById("countdown").innerHTML = "Times Up!!!";
      document.getElementById("next").hidden= false;
      document.getElementById("chat").readOnly = true;
      clearInterval(Timer);
    } else {
      document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);
};
function do_change2(){
    document.getElementById("next").hidden= true;
    timeleft=30;
    Timer=setInterval(function(){
        if(timeleft <= 0){
        document.getElementById("yo").style.display = "block";
        document.getElementById("countdown").innerHTML = "Times Up!!!";
        document.getElementById("chat").readOnly = true;
        document.getElementById("next").hidden= false;
        clearInterval(Timer);
      } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    },1000);
    next();
};
const writeAns = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
  
    parent.appendChild(el);
    
  };

  const Answered = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    if(text == document.getElementById("hidname").innerHTML){
        var t=scores[idx];
        t=parseInt(t)+100;
        scores[idx]=t;
        localStorage.setItem("scores", JSON.stringify(scores));
        par[idx] = username + " has scored "+scores[idx];
        localStorage.setItem("part", JSON.stringify(par));
        alert("You got it right!!!");
        input.value = '';
        sock.emit('chat', username + " got it right!!! ");
        sock.emit('message',par);
        document.getElementById("chat").readOnly = true;
    }else{
        input.value = '';
        sock.emit('chat', username + ": "+text);
    }
  };
  const writeImage =(text) =>{
    console.log(text);
    document.getElementById('image').src=text;
  }
  const writeFood =(text) =>{
    console.log(text);
    document.getElementById('hidname').innerHTML=text;
    var n="";
          for(var i=0;i<food.length;i++){
              if(food[i]=='a' || food[i]=='e' || food[i]=='i' || food[i]=='o' || food[i]=='u'){
                  n+='_';
              }else{
                  n+=food[i];
              }
          }
          document.getElementById('food-name').innerHTML=n;
  }
    sock.on('chat', writeAns);
    sock.on('message', writeEvent);
  document
    .querySelector('#chat-form')
    .addEventListener('submit', Answered);
  

    function api(){
      console.log(food)
        fetch('https://foodish-api.herokuapp.com/api/')
        .then(response => response.text())
        .then(data => {
            const l = data.indexOf('https');
            const e = data.indexOf('images');
            const f = data.substring(e+7,data.length-2);
            const food = f.substring(0,f.indexOf('/'));
            const img = data.substring(l,data.length-2)
            document.getElementById('image').src=img;
            var n="";
            for(var i=0;i<food.length;i++){
                if(food[i]=='a' || food[i]=='e' || food[i]=='i' || food[i]=='o' || food[i]=='u'){
                    n+='_';
                }else{
                    n+=food[i];
                }
            }
            document.getElementById('food-name').innerHTML=n;
            document.getElementById('hidname').innerHTML=food;
        });
    }
   
  
    const exit = (e) =>{
        e.preventDefault();
        console.log(idx-1)
        par.splice(idx, 1); 
        scores.splice(idx, 1);
        localStorage.setItem("part", JSON.stringify(par));
        localStorage.setItem("scores", JSON.stringify(scores));
        sock.emit('chat', username + " left ");
        sock.emit('message',par);
        window.close();
    };
    document
    .querySelector('#tl')
    .addEventListener('submit', exit);
