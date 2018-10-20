import axios from "../axios"
// import { resolve } from "path";

const spotifyService = {
    // Esta es la url base de la API
    baseUrl: 'https://platzi-music-api.now.sh'
}

spotifyService.search = function (query, type) {
    // Usando template strings armamos la url del endpoint con
    // el formato esperado por la API.
    const url = `${this.baseUrl}/search?q=${query.toString().trim().replace(' ', '%20')}&type=${type}`

    // Retornamos la llamada de fetch (recuerden que devuelve una Promise).
    // Fetch recibe como primer parametro la url y luego un objeto
    // con configuracion donde pasamos el tipo de metodo HTTP
    console.log(url)
    return new Promise((resolve, reject) => {
        axios({ method: "GET", "url": url }).then(result => {
            // console.log(result.data.artists.items)
            resolve(result.data)
        }, error => {
            console.log(error)
            reject(error)
        })
    })
    /* return fetch(url, { method: 'GET' })
      .then(res => {
        // En el caso de que hay un error disparamos un excpecio
        // para luego manejarla en nuesrtro componenten
        if (res.status !== 200) {
          throw res.statusText
        }
  
        // Casteamos la respuesta y la devolvemos para
        // usarla luego en el componente
        return res.json()
      }) */
}

export default spotifyService
