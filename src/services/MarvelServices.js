import { useHttp } from "../components/hooks/http.hook";

export const MarvelServics = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=89650246901b31acc964ee3e207faf6e';
    const _baseOffset = 210;

    // getResource = async (url) => {
    //     let res = await fetch(url);
    //     if(!res.ok) {
    //         throw new Error(`Could not feth ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apikey}`);
        return res.data.results.map(_transformCharact);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharact);
    }

    const getCharact = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
        return _transformCharact(res.data.results[0]);
    }

    // https://gateway.marvel.com:443/v1/public/comics?apikey=89650246901b31acc964ee3e207faf6e
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const _transformCharact = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'info about this character has been mysteriously lost...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        loading,
        error,
        getCharact,
        getAllCharacters,
        clearError,
        getAllComics,
        getComics,
        getCharacterByName,
        process,
        setProcess
    };
}