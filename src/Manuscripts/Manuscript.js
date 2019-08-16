import React from 'react';

export default class Manuscript extends React.Component {
    render() {
        const { manuscript } = this.props;
        return (
            <div>
                <h1>{manuscript.title}</h1>
                <p>{manuscript.content}</p>
            </div>
        )
    }
}