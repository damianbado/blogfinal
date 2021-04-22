import { API, Auth, graphqlOperation }  from 'aws-amplify'
import React, { Component } from 'react'
import { createComment } from '../graphql/mutations'

class CreateCommentPost extends Component {

    state = {
        commentOwnerId: "",
        commentOwnerUserName: "",
        content: ""
    }

    componentWillMount = async () => {
        await Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    commentOnwerId: user.id,
                    commentOwnerUsername: user.username
                })
            })
    }

    handleChangeContent = event => this.setState({ content: event.target.value})
    
    handleAddComment = async event => {
        event.preventDefault()

        const input = {
            commentPostId: this.props.postId,
            commentOwnerId: this.state.commentOwnerId,
            commentOwnerUsername: this.state.commentOwnerUserName,
            content: this.state.content,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createComment, {input}))

        this.setState({content: ""})
    }

    render() {
        return (
            <div>
                <form className="add-comment"
                    onSubmit={this.handleAddComment}> 
                    <textarea
                        type="text"
                        name="content"
                        rowe="3"
                        cols="40"
                        required
                        placeholder="Add Your Comment..."
                        value={this.state.content}
                        onChange={this.handleChangeContent} />

                        <input
                            className = "btn"
                            type="submit"
                            style={{fontSize: '19px'}}
                            value="Add Comment" />
                </form>
            </div>
        )
    }
}

export default CreateCommentPost;