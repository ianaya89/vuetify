const spotifyService = {
  //  API base url
  baseUrl: 'https://platzi-music-api.now.sh'
}

spotifyService.search = (query, type) => {
  // Usando template strings armamos la url del endpoint con
  // el formato esperado por la API.
  const url = `${this.baseUrl}/search?q=${query}&type=${type}`

  // Retornamos la llamada de fetch (recuerden que devuelve una Promise).
  // Fetch recibe como primer parametro la url y luego un objeto
  // con configuracion donde pasamos el tipo de metodo HTTP
  return fetch(url, { method: 'GET' })
    .then(res => {
      // En el caso de que hay un error disparamos un excpecio
      // para luego manejarla en nuesrtro componenten
      if (res.status !== 200) {
        throw res.statusText
      }

      // Casteamos la respuesta y la devolvemos para
      // usarla luego en el componente
      return res.json()
    })
}

export default spotifyService
