

const DOM = document.getElementById('DOM')

DOM.addEventListener('click', function(){
    console.log('DOM Events')
})

setTimeout(() => console.log('setTimeout2'), 2000)

setTimeout(() => console.log('setTimeout3'), 3000)

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {console.log(data)})
    .catch(error => console.log(error) )
  

setTimeout(() => console.log('setTimeout0'), 0)


setTimeout(() => console.log('setTimeout1'), 1000)

console.log('alo1');

console.log('alo2');






