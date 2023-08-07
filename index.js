function readAll(){

    // ------------------------------------------------------------

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/api/users', true);
    xhr.responseType = "json";
    xhr.onload = function() {
        const data = xhr.response;
        var tabledata = document.querySelector(".data_table");
        var elements = "";
        data.map(record => {
            elements += `<tr>
            <td>${record.id}<td>
            <td>${record.name}<td>
            <td>${record.address}<td>
            <td>
                <button class="edit" onclick={edit(${record.id})}>Edit</button>
                <button class="delete" onclick={remove(${record.id})}>Delete</button>
            <td>
            </tr>`
        });
    tabledata.innerHTML = elements;
    };
    xhr.send();
}

function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";

}

async function add() {
    var id = parseInt(document.querySelector(".id").value);
    var name = document.querySelector(".name").value;
    var address = document.querySelector(".address").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/users");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    const body = JSON.stringify({
    id: id,
    name: name,
    address: address
    });        
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
    } else {
        console.log(`Error: ${xhr.status}`);
    }
    };
    xhr.send(body);
    console.log(xhr.status);
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display = "block";
    readAll();
}

function edit(id) {
    document.querySelector(".update_form").style.display = "block";
    document.querySelector(".uid").value = id;

}

function update() {
    var id = parseInt(document.querySelector(".uid").value);
    var name = document.querySelector(".uname").value;
    var address = document.querySelector(".uaddress").value;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:5000/api/users");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const body = JSON.stringify({
    id: id,
    name: name,
    address: address
    });        
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
    } else {
        console.log(`Error: ${xhr.status}`);
    }
    };
    xhr.send(body);
    console.log(xhr.status);

    document.querySelector(".update_form").style.display = "none";
    readAll();
}

function remove(id) {
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:5000/api/users/5");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.onload = function () {
    // var data = JSON.parse(xhr.responseText);
    // if (xhr.readyState == 4 && xhr.status == "200") {
    //     console.log(data);
    // } else {
    //     console.log(`Error: ${xhr.status}`);
    // }
    // };
    xhr.send();

    // data = data.filter(rec => rec.id !== id);
    // readAll();
}