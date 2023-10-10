const $html = document.querySelector('html');
const $radio2 = document.querySelector('#bblue');
var button = document.querySelector('#pros');
var pros = document.querySelector('.txtpros');
var button2 = document.querySelector('#contras');
var contras = document.querySelector('.txtcontras');

$radio2.addEventListener('change', function(){
    $html.classList.toggle('themeblue');
})

button.addEventListener('click', function() {
    
    if(pros.style.display === 'flex') {
        pros.style.display = 'none';   
        pros.style.height = '0';   
    }
    else {
        pros.style.height = 'auto';   
        pros.style.display = 'flex';
        pros.style.animation = 'txt 0.5s';
        
    }
    

});

button2.addEventListener('click', function() {
    
    if(contras.style.display === 'flex') {
        contras.style.display = 'none';
    }
    else {
        contras.style.display = 'flex';
        contras.style.animation = 'txt 0.5s';
        
    }

});
