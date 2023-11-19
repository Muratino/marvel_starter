import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from '../charForm/charForm';
import { ErrorBoundaries } from "../errorBoundaries/ErrorBoundaries";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundaries>
                <RandomChar />
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundaries>
                <div>
                    <ErrorBoundaries >
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundaries>
                    <ErrorBoundaries>
                        <CharForm />
                    </ErrorBoundaries>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;