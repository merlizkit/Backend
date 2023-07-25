const socketClient = io();

/* ---------------------------------- chat ---------------------------------- */
if(location.pathname == '/chat'){
    let username = null;

    if(!username) {
        Swal.fire({
            title: '¡Welcome to chat!',
            text: 'Insert your username',
            input: 'text',
            inputValidator: (value) =>{
                if(!value) return 'Your username is required'
            }
        })
        .then((input)=>{
            username = input.value;
            socketClient.emit('newUser', username);
        })
    }
    
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('send');
    const output = document.getElementById('output');
    const actions = document.getElementById('actions');

    sendBtn.addEventListener('click', ()=>{
        socketClient.emit('chat:message', {
            username,
            message: message.value
        })
        message.value = '';
    })

    socketClient.on('messages', (arrayMsgs)=>{
        actions.innerHTML = ''
        const chatRender = arrayMsgs.map((msg)=>{
            return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`
        }).join(' ')
        output.innerHTML = chatRender
    })

    socketClient.on('msg', (msg)=>{
        console.log(msg);
    })

    socketClient.on('newUser', (user) => {
        Toastify({
            text: `🟢 ${user} is logged in`,
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    })

    message.addEventListener('keypress', ()=>{
        socketClient.emit('chat:typing', username)
    })

    socketClient.on('chat:typing', (user)=>{
        actions.innerHTML = `<p>${user} is writing a message...</p>`
    })
}

/* ----------------------------- product create ----------------------------- */
if(location.pathname == '/') {
    socketClient.on('allProducts', (array) => {
        let prodInfo = '';
        array.forEach(product => {
            prodInfo += `${product.code} - ${product.title} || Stock: ${product.stock} || Precio: ${product.price}</br>`;
        })
        products.innerHTML = `${prodInfo}`;
    })

    const creForm = document.getElementById('creForm');
    const inputTitle = document.getElementById('title');
    const inputDesc = document.getElementById('description');
    const inputCode = document.getElementById('code');
    const inputPrice = document.getElementById('price');
    const inputStock = document.getElementById('stock');
    const inputCat = document.getElementById('category');

    creForm.onsubmit = (send) => {
        send.preventDefault();
        const newProduct = {
            title: inputTitle.value,
            description: inputDesc.value,
            code: inputCode.value,
            price: inputPrice.value,
            stock: inputStock.value,
            category: inputCat.value
        }
        socketClient.emit('newProduct', newProduct);
    }
    
    /* ----------------------------- product delete ----------------------------- */
    const delForm = document.getElementById('delForm');
    const prodId = document.getElementById('prodId');
    
    delForm.onsubmit = (send) => {
        send.preventDefault();
        socketClient.emit('deleteProduct', prodId.value);
    }
}