import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps={
        country : 'in',
        pageSize :8,
        category : 'general'
    }

    static propTypes ={
             country :  PropTypes.string,
             pageSize : PropTypes.number,
             category : PropTypes.string
    }
     capatalizefirstlatter =(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
     }
    constructor(props) {
        super(props);
        this.state = {
            articles:[],
            loading: false,
            page: 1,
            totalResults : 0
        }
        document.title = `${this.capatalizefirstlatter(this.props.category)}-NewsWorld`;

    }
    
    async update(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
              this.update();
    }
    handlePrev = async () => {
        this.setState({
        page: this.state.page - 1
        })

        this.update();
    }
    handleNext = async () => {
       
        this.setState({
            page: this.state.page + 1
        })
        this.update();
    }
    fetchMoreData = async() => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() {
        return (
            <div>
                
                    <h1 className='text-center' style={{margin : '40px 0px '}}>NewsWorld - Top {this.capatalizefirstlatter(this.props.category)} Headlines</h1>
                    {/* {this.state.loading && <Spinner />} */}
                    <InfiniteScroll
                                dataLength={this.state.articles.length}
                                next={this.fetchMoreData}
                                hasMore={this.state.articles !==  this.state.totalResults}
                                loader={<Spinner/>}>
                     <div className="container">                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imagrUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
               
            </div>
        )
    }
}

export default News
