import React from 'react';

export default class Manuscript extends React.Component {
    render() {
        const { manuscript } = this.props;
        if(!manuscript) { return null;}
        return (
            <div>
                <h2>{manuscript.title}</h2>
                <p>{manuscript.content}</p>
            </div>
        )
    }
}