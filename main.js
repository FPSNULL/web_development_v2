function Save() {
    const user = {};

    user.name = document.querySelector('#name').value;
    user.email = document.querySelector('#email').value;
    user.id = document.querySelector('#id').value;
    
    document.querySelector('#name').value = null;
    document.querySelector('#email').value = null;

    
    if (user.id) {
        Update(user);
    } else {
        fetch('https://desenvolvimento-web-80f92-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify({
                id: null,
                name: user.name,
                email: user.email,
            })
        })
            .then(response => response.json())
            .then(data => {
                LoadUser();
                alert('usuário salvo!');
            })
            .catch(error => console.log(error));
    }
    
}


const users = [];
function LoadUser() {
    fetch('https://desenvolvimento-web-80f92-default-rtdb.firebaseio.com/users.json')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#list').innerHTML = null;

            for (const key in data) {
                const li = document.createElement('li');
                const user = data[key];

                user.id = key;
                users.push(user);

                li.classList.add('collection-item');
                li.innerHTML = `<div><p>${user.name}</p>`;
                li.innerHTML += `<p>${user.email}</p></div>`;
                li.innerHTML += `<button class="waves-effect waves-light btn-small" onclick="Edit('${key}')"><a class="white-text" href="#top">Edit</a></button>`;
                li.innerHTML += `<button class="waves-effect waves-light btn-small" onclick="Remove('${key}')">Remove</button>`;

                document.querySelector('#list').appendChild(li);
                document.querySelector('#id').value = null;
            }
        })
        .catch(error => console.log(error));
}
document.body.onload = LoadUser();

function Edit(key) {
    const user = users.find(item => item.id == key);

    document.querySelector('#name').value = user.name;
    document.querySelector('#email').value = user.email;
    document.querySelector('#id').value = user.id;
}

function Update(user) {
    fetch(`https://desenvolvimento-web-80f92-default-rtdb.firebaseio.com/users/${user.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({
            email: user.email,
            name: user.name
        })
    })
        .then(response => response.json())
        .then(() => LoadUser())
        .catch(error => console.log(error))

}

function Remove(key) {
    fetch(`https://desenvolvimento-web-80f92-default-rtdb.firebaseio.com/users/${key}.json`,
        {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => LoadUser())
        .catch(error => console.log(error))
}