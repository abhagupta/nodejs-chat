let $ = require('jquery')


let io = require('socket.io-client')

let socket = io('http://127.0.0.1:8000')

socket.on('connect', ()=>console.log('connected'))

// Enable the form now that our code has loaded
$('#send').removeAttr('disabled')

// Emit a starter message and log it when the server echoes back
// socket.on('im', msg => console.log(msg))
// socket.emit('im', 'hello world!')

let $template = $('#template')

socket.on('im', msg => {
    let $li = $template.clone().show()
    console.log("Lis :" + $li)
    $li.children('span').text(msg)
    alert(msg)
    $('#messages').append($li)
})
$('form').submit(() => {
    socket.emit('im', $('#m').val())
    console.log("message :" + $('#m').val())
    $('#m').val('')
    return false
})


