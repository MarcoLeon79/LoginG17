// Busca si entraste con una cuenta, si no tienes te lleva al login
const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const nomUsu = document.getElementById('nombreUsuario')
nomUsu.textContent = user.name

// Salir de la cuenta
const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    alert(`¡Hasta pronto ${user.name}!`)
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})

// Clave de la API de Pexels
const apiKey = '563492ad6f91700001000001ee0e9ca6636a40a2922a3057ed643c83'
// URL de la API de Pexels
const apiUrl = 'https://api.pexels.com/v1'

// Función del buscador de imágenes
function searchImages() {
    const searchQuery = document.getElementById('searchQuery').value
    const gallery = document.getElementById('gallery')
    gallery.innerHTML = '' //Limpia la galería por los nuevos resultados
    fetch(`${apiUrl}/search?query=${encodeURIComponent(searchQuery)}&per_page=12`, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.photos.forEach(photo => {
            const divCol = document.createElement('div')
            divCol.style.justify_conten = 'space-around'
            divCol.classList.add('col')
            
            const divCard = document.createElement('div')
            divCard.classList.add('card', 'text-bg-info')
            divCard.style.width = '18rem'

            const img = document.createElement('img')
            img.src = photo.src.medium
            img.alt = photo.url
            img.classList.add('card-img-top')
            img.style.max_height = '200px'

            const divCardBody = document.createElement('div')
            divCardBody.classList.add('card-body')

            const h5 = document.createElement('h5')
            h5.classList.add('card-title')
            h5.textContent = photo.photographer

            const p = document.createElement('p')
            p.classList.add('card-text')
            p.textContent = photo.alt

            const a = document.createElement('a')
            a.classList.add('btn', 'btn-primary')
            a.href = img.alt
            a.textContent = 'Link de la imagen'
            a.target = '_blank'

            divCardBody.appendChild(h5)
            divCardBody.appendChild(p)
            divCardBody.appendChild(a)

            divCard.appendChild(img)
            divCard.appendChild(divCardBody)

            divCol.appendChild(divCard)
            gallery.appendChild(divCol)
        })
    })
    .catch(error => {
        console.error('Error fetching images:', error)
    })
}