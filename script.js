const phone = "2348134717670";

let user = {name:'', dept:'', hobby:''};
let mode = '';
let step = 0;

const questions = [
  "Will you be my girlfriend?",
  "Are you sure?",
  "Are you REALLY sure?",
  "This is your LAST chance. Are you REALLY REALLY sure?"
];

const intro = document.getElementById('intro');
const qSec = document.getElementById('questionSection');
const resSec = document.getElementById('resultSection');
const reasonWrap = document.getElementById('reasonWrapper');
const acceptWrap = document.getElementById('acceptReasonWrapper'); // acceptance
const questionEl = document.getElementById('question');
const reasonInput = document.getElementById('reason');
const visual = document.getElementById('visualBox');
const loveAudio = document.getElementById('loveAudio');
const heartbreakAudio = document.getElementById('heartbreakAudio');
const acceptReasonWrap = document.getElementById('acceptReasonWrapper');
const acceptReasonInput = document.getElementById('acceptReason');

document.getElementById('startBtn').onclick = () => {
  const nameVal = document.getElementById('name').value.trim();
  const deptVal = document.getElementById('dept').value.trim();
  const hobbyVal = document.getElementById('hobby').value.trim();

  if(!nameVal || !deptVal || !hobbyVal){
    alert("Please fill in Name, Department, and Hobby before starting!");
    return;
  }

  user.name = nameVal;
  user.dept = deptVal;
  user.hobby = hobbyVal;

  intro.classList.add('hidden');
  qSec.classList.remove('hidden');
  step = 0;
  mode = '';
  questionEl.textContent = questions[0];
};

document.getElementById('yesBtn').onclick = () => answer("Yes");
document.getElementById('noBtn').onclick = () => answer("No");

document.getElementById('backToIntro').onclick = () => {
  qSec.classList.add('hidden');
  intro.classList.remove('hidden');
};

document.getElementById('restartBtn').onclick = restart;
document.getElementById('acceptRestartBtn').onclick = restart;

document.getElementById('sendBtn').onclick = sendRejectionToWhatsApp;
document.getElementById('acceptSendBtn').onclick = sendAcceptanceToWhatsApp;

function answer(ans){
  if(step === 0){
    mode = ans === "Yes" ? "accept" : "reject";
    step = 1;
    questionEl.textContent = questions[1];
    return;
  }

  if(ans === "No"){
    step = 0;
    mode = '';
    questionEl.textContent = questions[0];
    return;
  }

  if(step === questions.length - 1){
    finalize(mode);
    return;
  }

  step++;
  questionEl.textContent = questions[step];
}

function finalize(type){
  qSec.classList.add('hidden');
  resSec.classList.remove('hidden');
  visual.innerHTML = "";

  loveAudio.pause(); loveAudio.currentTime=0;
  heartbreakAudio.pause(); heartbreakAudio.currentTime=0;

  if(type === "accept"){
    visual.textContent = "❤️";
    acceptReasonWrap.classList.remove('hidden');
    reasonWrap.classList.add('hidden');
    try{ loveAudio.play(); }catch(e){}
  } else {
    visual.textContent = "💔";
    reasonWrap.classList.remove('hidden');
    acceptReasonWrap.classList.add('hidden');
    try{ heartbreakAudio.play(); }catch(e){}
  }
}

function restart(){
  resSec.classList.add('hidden');
  intro.classList.remove('hidden');
  reasonInput.value = "";
  acceptReasonInput.value = "";
  document.getElementById('name').value = "";
  document.getElementById('dept').value = "";
  document.getElementById('hobby').value = "";
  visual.innerHTML = "";
  step=0; mode="";
  loveAudio.pause(); loveAudio.currentTime=0;
  heartbreakAudio.pause(); heartbreakAudio.currentTime=0;
  reasonWrap.classList.add('hidden');
  acceptReasonWrap.classList.add('hidden');
}

function sendRejectionToWhatsApp(){
  const r = reasonInput.value.trim() || "(no reason)";
  const msg = "Name:"+user.name+"%0ADepartment:"+user.dept+"%0AHobby:"+user.hobby+"%0AFinal: Rejected%0AReason:"+encodeURIComponent(r);
  window.location.href="https://api.whatsapp.com/send?phone="+phone+"&text="+msg;
}

function sendAcceptanceToWhatsApp(){
  const r = acceptReasonInput.value.trim() || "(no reason)";
  const msg = "Name:"+user.name+"%0ADepartment:"+user.dept+"%0AHobby:"+user.hobby+"%0AFinal: Accepted%0AReason:"+encodeURIComponent(r);
  window.location.href="https://api.whatsapp.com/send?phone="+phone+"&text="+msg;
}

