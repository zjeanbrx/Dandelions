var botaomais = document.querySelector('.btnmais');
var mostrar = document.querySelector('.charmostrar')
var mostrar2 = document.querySelector('.charmostrar2')

botaomais.addEventListener('click', function() {
    
    if(mostrar.style.display === 'block') {
        mostrar.style.display = 'none';     
        mostrar2.style.display = 'none';
    }
    else {
        mostrar.style.display = 'block';
        mostrar.style.animation = 'txt 0.5s';   
        mostrar2.style.display = 'block';
        mostrar2.style.animation = 'txt 0.5s';     
    }

});


