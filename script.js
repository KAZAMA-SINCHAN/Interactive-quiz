// ===== Project data (edit repo/live links to match your real GitHub repos) =====
const GH = "https://github.com/UTRINO-UTKARSH/";
const projects = [
  {title:"Python Programs Collection",desc:"Factorial, Fibonacci and structure-to-dictionary conversion programs, with an updated README.",tech:["Python","Git","GitHub"],repo:GH+"python-programs",live:""},
  {title:"Messy Python Code Improvement",desc:"A messy Python script cleaned up and improved with AI assistance: clearer names, structure and comments.",tech:["Python","Cursor AI","Refactoring"],repo:GH+"messy-python-improvement",live:""},
  {title:"Bug Fixing Using Cursor AI",desc:"A buggy program found, explained and corrected using Cursor AI.",tech:["Python","Cursor AI","Debugging"],repo:GH+"bug-fixing-cursor",live:""},
  {title:"Interactive Quiz Application",desc:"A browser quiz app with questions, answer checking and a final score.",tech:["HTML","CSS","JavaScript","Quiz"],repo:GH+"quiz-app",live:""},
  {title:"Book Reading List Application",desc:"Add books to a reading list and track what you have read. The README includes the deployed link.",tech:["HTML","CSS","JavaScript","Vercel","Book"],repo:GH+"book-reading-list",live:""}
];

const $ = s => document.querySelector(s);
const grid = $("#grid"), search = $("#search");

function render(list){
  grid.innerHTML = "";
  list.forEach(p=>{
    const c = document.createElement("article");
    c.className = "card";
    c.innerHTML = `<h3></h3><p></p><ul class="tags"></ul><div class="card-links"></div>`;
    c.querySelector("h3").textContent = p.title;
    c.querySelector("p").textContent = p.desc;
    c.querySelector(".tags").innerHTML = p.tech.map(t=>`<li>${t}</li>`).join("");
    const l = c.querySelector(".card-links");
    l.innerHTML = `<a href="${p.repo}" target="_blank" rel="noopener">GitHub repo</a>` +
      (p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live app</a>` : "");
    grid.appendChild(c);
  });
  $("#empty").hidden = list.length > 0;
  $("#count").textContent = `${list.length} of ${projects.length} projects`;
}
function filter(){
  const q = search.value.trim().toLowerCase();
  render(projects.filter(p => [p.title,p.desc,...p.tech].join(" ").toLowerCase().includes(q)));
}
search.addEventListener("input", filter);
render(projects);

// ===== Theme toggle (remembers choice) =====
const root = document.documentElement, tbtn = $("#themeToggle");
function setTheme(t){
  root.setAttribute("data-theme", t);
  tbtn.textContent = t === "dark" ? "Light" : "Dark";
  try{ localStorage.setItem("theme", t); }catch(e){}
}
let saved = null; try{ saved = localStorage.getItem("theme"); }catch(e){}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
tbtn.addEventListener("click", ()=> setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

// ===== Mobile menu =====
const menu = $("#menu"), mb = $("#menuBtn");
mb.addEventListener("click", ()=>{ const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
menu.addEventListener("click", e=>{ if(e.target.tagName==="A") menu.classList.remove("open"); });
$("#yr").textContent = new Date().getFullYear();

// ===== Chatbot (calls our own /api/chat so the API key stays on the server) =====
const log = $("#log"), input = $("#q"), send = $("#send");
let history = [];
function add(text, cls){
  const d = document.createElement("div");
  d.className = "msg " + cls; d.textContent = text;
  log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
}
async function ask(text){
  text = text.trim(); if(!text) return;
  add(text, "user"); input.value = ""; send.disabled = true;
  const wait = add("Thinking...", "bot");
  try{
    const res = await fetch("/api/chat", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({message:text, history})
    });
    const data = await res.json();
    if(!res.ok || !data.reply) throw new Error(data.error || "Request failed");
    wait.textContent = data.reply;
    history.push({role:"user",text},{role:"model",text:data.reply});
    history = history.slice(-8);
  }catch(err){
    wait.className = "msg err";
    wait.textContent = "The chatbot couldn't reach the AI service. Check your connection and try again in a moment.";
  }finally{ send.disabled = false; input.focus(); log.scrollTop = log.scrollHeight; }
}
send.addEventListener("click", ()=> ask(input.value));
input.addEventListener("keydown", e=>{ if(e.key==="Enter") ask(input.value); });
$("#suggest").addEventListener("click", e=>{ if(e.target.tagName==="BUTTON") ask(e.target.textContent); });
