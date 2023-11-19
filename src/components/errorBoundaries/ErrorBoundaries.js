import {Component} from 'react'
import { ErrorMessage } from '../errorMessage/errorMessage';

export class ErrorBoundaries extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorYnfo) {
        console.log(error, errorYnfo);
        this.setState({error: true})
    }
    render() {
        if(this.state.error) {
            return (
                <ErrorMessage />
            );
        }

        return this.props.children;
    }
}