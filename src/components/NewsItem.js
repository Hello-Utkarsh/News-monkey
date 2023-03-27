import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imgurl, pageurl, author, date} = this.props
        return (

            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imgurl} className="card-img-top" alt="Unavailable" />
                    <div className="card-body text-center">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"}, Last updated {date?date:"Unknown"}</small></p>
                        <a href={pageurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>


        )
    }
}
