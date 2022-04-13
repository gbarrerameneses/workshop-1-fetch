const baseURL = 'http://platzi-avo.vercel.app'
const appNode = document.querySelector('#app')

appNode.addEventListener('click', (event) => {
    if(event.target.nodeName === 'H2'){
        window.alert('hola')
    }
})

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: "USD",
    }).format(price)
    return newPrice
}

//web api
//Conectarnos al server
window
    .fetch(`${baseURL}/api/avo`)
    //procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
    //JSON -> Data -> Renderizar info browser
    .then(responseJSON => {
        const todosLosItems = []
        responseJSON.data.forEach((item) => {
           //crear imagen
            const image = document.createElement('img')
            image.src = `${baseURL}${item.image}`
            image.className = ' w-auto'
            
           //crear título
            const title = document.createElement('h2')
            title.textContent = item.name
            title.className = 'font-mono text-2xl text-green-700'
            
           //crear precio
            const price = document.createElement('div')
            price.textContent = formatPrice(item.price)
            price.className = 'text-base text-gray-500'

            const container = document.createElement('div')
            container.append(image, title, price)
            container.className = 'info m-auto'

            todosLosItems.push(container)
        })
        appNode.append(...todosLosItems)
        appNode.className = 'container  flex flex-wrap justify-between items-center m-auto'
    })