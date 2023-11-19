import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { Spinner } from '../spinner/spinner';
// import { ErrorMessage } from '../errorMessage/errorMessage';
// import Skeleton from '../skeleton/Skeleton'
import { MarvelServics } from '../../services/MarvelServices';
import { setContent } from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
    // console.log(charId);
    const [char, setChar] = useState(null);

    const { getCharact, clearError, process, setProcess } = MarvelServics();

    // console.log(process);
    useEffect(() => {
        updateChar()
    }, [charId])


    const updateChar = () => {
        clearError();
        if (!charId) {
            return;
        }

        getCharact(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    // FSM - finite-state machine

    // const setContent = (process, char) => {
    //     switch (process) {
    //         case 'waiting':
    //             return <Skeleton />;
    //             break;
    //         case 'loading':
    //             return <Spinner />;
    //             break;
    //         case 'confirmed':
    //             return <View char={char} />;
    //             break;
    //         case 'error':
    //             return <ErrorMessage />;
    //             break
    //         default:
    //             throw new Error('Unexpected process state')
    //     }
    // }

    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;