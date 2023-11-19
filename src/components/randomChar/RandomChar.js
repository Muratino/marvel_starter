import { useState, useEffect } from 'react';
import { MarvelServics } from '../../services/MarvelServices';
import { Spinner } from '../spinner/spinner';
import { ErrorMessage } from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const setContent = (process, Component, data, not) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
            break;
        case 'loading':
            return <Spinner />;
            break;
        case 'confirmed':
            return <Component data={data} not={not} />;
            break;
        case 'error':
            return <ErrorMessage />;
            break
        default:
            throw new Error('Unexpected process state')
    }
}


const RandomChar = () => {

    const [char, setCharList] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const {process, setProcess, getCharact, clearError} = MarvelServics();

    useEffect(() => {
        upDataChar();
    }, [])

    const onCharLoaded = (char) => {
        if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            setCharList(char);
            setNotFound(true);
        } else {
            setCharList(char);
            setNotFound(false);
        }
    }

    const upDataChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharact(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error) ? <Vue Redchar={char} notFound={notFound} /> : null;


    return (
        <div className="randomchar">
            {setContent(process, Vue, char, notFound)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={upDataChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const Vue = ({ data, not }) => {
    const { name, description, thumbnail, homePage, wiki } = data;

    const classes = not ? 'randomchar__img red' : 'randomchar__img';
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character"
                className={classes} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;