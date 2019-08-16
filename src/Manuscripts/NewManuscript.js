import React from 'react';

export default class NewManuscript extends React.Component {
    state = {
        manuscript: {
            _id: '',
            slug: '',
            title: '',
            content: '',
            createdAt: undefined,
            updatedAt: undefined
        }
    }
    updateValue = (e) => {
        const {manuscript} = this.state;
        this.setState({
            manuscript : {...manuscript, [e.target.name]:e.target.value}
        })
    }
    handleSave = (e) => {
        e.preventDefault();
        const slug = this.props.onSave(this.state.manuscript)
        this.props.history.replace(`/manuscripts/${slug}`)
    }
    render() {
        const { manuscript } = this.state;
        return (
            <div>
                <h2>New Manuscript</h2>
                <form onSubmit={this.handleSave}>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" value={manuscript.title} onChange={this.updateValue} />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea type="text" name="content" value={manuscript.content} onChange={this.updateValue} />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}