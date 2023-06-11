 
export function searchImg(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '14167175-fc0e53a7a7b8f01fb7f615bad';
    return fetch(
      `${url}?q=${value}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(resp => {

        if(resp.ok) {
          return resp.json()
        }

          return Promise.reject(new Error(`Can't find images with the name ${value}`))
        }) 
  }

