function validationForm(){
    var name=document.getElementById("emri").value;
    if(name.length < 2){
        alert9("emri duhet te kete te pakten 2 karaktere")
        return false
    }else{
        return true;
    }
}

function deletePerson(id) {
    let listapersonave = localStorage.getItem('lista');
    let list=JSON.parse(listapersonave)
    console.log(list)
    if (!listapersonave) {
        listapersonave = [];
    } else {
        listapersonave = JSON.parse(listapersonave);
    }
    const index = listapersonave.findIndex(person => person.id === id);
    console.log(listapersonave)
    console.log(index)
    if (index > -1) {
        listapersonave.splice(index, 1);
        localStorage.setItem('lista', JSON.stringify(listapersonave));
    } else {
        console.log("Personi nuk u gjet me këtë ID: " + id);
    }
    location.reload();

}

function showdata() {
    let listapersonave = localStorage.getItem('lista');
    if (!listapersonave) {
        listapersonave = [];
    } else {
        listapersonave = JSON.parse(listapersonave);
    }

    var data = localStorage.getItem('lista');
    var afisho = JSON.parse(data);
    const html = document.getElementById("shfaq");
    if (afisho) {
        for (let i = 0; i < afisho.length; i++) {
            // afisho[i].id = i;
            const print = `
                <div class="row-info">
                    <div class="person">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" />
                        <div class="personal-info">
                            <p>${afisho[i].name}</p>
                            <p><strong>${afisho[i].statusi}</strong></p>
                        </div>
                    </div>
                    <div class="delete-button">
                        <p onclick="deletePerson(${afisho[i].id})">x</p>
                    </div>
                </div>`;
            html.innerHTML += print;
        }
    }
}

function  addData(){
    if(validationForm() == true){
        var name=document.getElementById("emri").value;
        var statusi=document.getElementById("statusi").value;
       
        let person = {
            name: name,
            statusi: statusi
        };
        
        let listapersonave =localStorage.getItem('lista');
        if(!listapersonave){
            listapersonave = []
          }
          else{
            listapersonave = JSON.parse(listapersonave)
            }   
            listapersonave.push(person)
            localStorage.setItem("lista",JSON.stringify(listapersonave));


            const html=document.getElementById("shfaq")
            html.innerHTML+=`<div class="row-info">
                                <div class="person">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" />
                                    <div class="personal-info">
                                        <p>${person.name}</p>
                                        <p><strong>${person.statusi}</strong></p>
                                    </div>
                                </div>
                                <div class="delete-button">
                                    <p onclick="deletePerson(${person.id})">x</p>
                                </div>
                            </div>`
    
            document.getElementById("emri").value="";
            // document.getElementById("statusi").value="";
    }
}

const inputKerkimi = document.getElementById("kerkoEmrin");
const divRezultati = document.getElementById("shfaq");
inputKerkimi.addEventListener("input", function() {
    search(); 
});

function search() {
    const emriKerkuar = inputKerkimi.value.toLowerCase();

    let listapersonave = localStorage.getItem('lista');
    if (!listapersonave) {
        return; 
        }

    listapersonave = JSON.parse(listapersonave);

    const rezultati = listapersonave.filter(person => person.name.toLowerCase().includes(emriKerkuar));

    divRezultati.innerHTML = ''; 
    if (rezultati.length > 0) {
        for (let i = 0; i < rezultati.length; i++) {
            const print = `
                <div class="row-info">
                    <div class="person">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" />
                        <div class="personal-info">
                            <p>${rezultati[i].name}</p>
                            <p><strong>${rezultati[i].statusi}</strong></p>
                        </div>
                    </div>
                    <div class="delete-button">
                        <p onclick="deletePerson('${rezultati[i].id}')">x</p>
                    </div>
                </div>`;
            divRezultati.innerHTML += print;
        }
    } else {
        divRezultati.innerHTML = '<p>Nuk ekzistnon.</p>';
    }
}

document.onload=showdata();
    