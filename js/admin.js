const users =
JSON.parse(
localStorage.getItem("nexus_users")
) || [];

const logs =
JSON.parse(
localStorage.getItem("nexus_logs")
) || [];

function showTab(tab){

document
.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"));

document
.getElementById(tab)
.classList.add("active");

}

function loadStats(){

document.getElementById(
"totalUsers"
).innerText=users.length;

let total=0;

users.forEach(u=>{

total+=Number(u.coins||0);

});

document.getElementById(
"totalCoins"
).innerText=
total.toLocaleString();

}

function renderUsers(){

const table=
document.getElementById(
"userTable"
);

const search=
document.getElementById(
"searchUser"
).value.toLowerCase();

table.innerHTML="";

users
.filter(u=>
u.username
.toLowerCase()
.includes(search)
)
.forEach(user=>{

table.innerHTML+=`

<tr>

<td>${user.id}</td>

<td>${user.username}</td>

<td>${user.coins}</td>

<td>${user.wheel||0}</td>

<td>
${user.banned?"BAN":"AKTİF"}
</td>

<td>

<button
class="action-btn"
onclick="addCoin(${user.id})">

+Coin

</button>

<button
class="action-btn"
onclick="removeCoin(${user.id})">

-Coin

</button>

<button
class="action-btn"
onclick="addWheel(${user.id})">

+Çark

</button>

<button
class="action-btn"
onclick="banUser(${user.id})">

Ban

</button>

<button
class="action-btn"
onclick="deleteUser(${user.id})">

Sil

</button>

</td>

</tr>

`;

});

}

function saveUsers(){

localStorage.setItem(
"nexus_users",
JSON.stringify(users)
);

renderUsers();
loadStats();

}

function addCoin(id){

let amount=
Number(prompt(
"Coin miktarı"
));

if(!amount)return;

const user=
users.find(
u=>u.id===id
);

user.coins+=amount;

saveUsers();

}

function removeCoin(id){

let amount=
Number(prompt(
"Düşülecek coin"
));

if(!amount)return;

const user=
users.find(
u=>u.id===id
);

user.coins-=amount;

saveUsers();

}

function addWheel(id){

let amount=
Number(prompt(
"Çark hakkı"
));

if(!amount)return;

const user=
users.find(
u=>u.id===id
);

user.wheel=
(user.wheel||0)
+amount;

saveUsers();

}

function banUser(id){

const user=
users.find(
u=>u.id===id
);

user.banned=
!user.banned;

saveUsers();

}

function deleteUser(id){

if(!confirm(
"Silinsin mi?"
)) return;

const index=
users.findIndex(
u=>u.id===id
);

users.splice(index,1);

saveUsers();

}

function renderLogs(){

const div=
document.getElementById(
"logList"
);

div.innerHTML="";

logs.forEach(log=>{

div.innerHTML+=`

<div class="card">

${log.date}
<br>
${log.message}

</div>

`;

});

}

function logout(){

localStorage.removeItem(
"nexus_session"
);

location.href=
"index.html";

}

loadStats();
renderUsers();
renderLogs();
