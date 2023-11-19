import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBanner from "../appBanner/AppBanner";
// import { Spinner } from '../spinner/spinner';
// import { ErrorMessage } from '../errorMessage/errorMessage';
import { MarvelServics } from '../../services/MarvelServices';

import { setContent } from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getComics, getCharact, clearError, process, setProcess} = MarvelServics();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    getCharact(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;



// import { Link, useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';


// import { Spinner } from '../spinner/spinner';
// import { ErrorMessage } from '../errorMessage/errorMessage';
// import { MarvelServics } from '../../services/MarvelServices';


// import './singleComic.scss';

// const SingleComicPage = () => {

//     const { comicId } = useParams();

//     const [comic, setComic]  = useState(null);
//     const { loading, error, getComics, clearError } = MarvelServics();

//     useEffect(() => {
//         updateComic()
//     }, [comicId])

//     const updateComic = () => {
//         clearError();
//         getComics(comicId)
//             .then(onComicLoaded);
//     }
    
//     const onComicLoaded = (comic) => {
//         setComic(comic)
//     }

//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loading ? <Spinner /> : null;
//     const content = !(loading || error || !comic) ? <Vue comic={comic} /> : null;


//     return (
//         <>
//             {errorMessage}
//             {spinner}
//             {content}
//         </>
//     )
// }

// const Vue = ({ comic }) => {
//     const { title, description, pageCount, thumbnail, language, price } = comic;

//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img" />
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to='/comics' className="single-comic__back">Back to all</Link>
//         </div>
//     );
// }


// export default SingleComicPage;