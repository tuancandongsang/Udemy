function hello(message){
    console.log('tuancandongsang', message)
}

export default function( context , inject){
    inject('abc', hello)
}