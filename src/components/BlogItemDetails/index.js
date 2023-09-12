import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  // here the api call blogdata is set to the state feild

  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogDetails()
  }

  //here we make api call for individual blog data
  getBlogDetails = async () => {
    // here we getting the id of each blog item using (this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const responsive = await fetch(`https://apis.ccbp.in/blogs/${id}`) //update the id
    const data = await responsive.json()
  // convert the snake_case to camelCase
    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      title: data.title,
      topic: data.topic,
      author: data.author,
    }
    this.setState({blogData: updatedData, isLoading: false}) //updating the api data
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state //getting the updated data
    const {title, imageUrl, content, avatarUrl, author} = blogData // object destructuring for blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state //loader is added 
    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
