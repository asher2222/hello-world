// 간단한 인터랙션 데모
const timeEl = document.getElementById('time');
const btn = document.getElementById('btn');
const log = document.getElementById('log');

function fmt(d){
  const pad = (n)=> String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function tick(){
  const now = new Date();
  timeEl.textContent = `현재 시간: ${fmt(now)}`;
}
setInterval(tick, 1000);
tick();

btn.addEventListener('click', ()=>{
  const now = new Date();
  log.textContent = `버튼 클릭! → ${fmt(now)}\n` + log.textContent;
});