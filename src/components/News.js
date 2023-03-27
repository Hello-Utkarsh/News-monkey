import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        category: 'general',
        pagesize: 16
    }

    static propTypes = {
        category: PropTypes.string,
        pagesize: PropTypes.number,
    }

    articles = []

    constructor() {
        super()
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
        }
    }

    async updateNews(params) {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsed_data = await data.json()
        this.setState({
            articles: parsed_data.articles,
            totalResults: parsed_data.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews()
    }

    handlePrevclick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextclick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()



    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='d-flex justify-content-center'>NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="container my-5 d-flex justify-content-start flex-wrap mx-auto" style={{ width: "90vw" }}>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="my-4 mx-3 mx-auto d-flex justify-content-strat flex-wrap" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgurl={element.urlToImage} author={element.author} pageurl={element.url} date={element.publishedAt} />
                        </div>
                    })}

                </div>
                <div className='d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next</button>
                </div>
            </div>
        )
    }
}
