import React from 'react'
const NewsItem = (props) => {

  let { title, description, imagrUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className=" badge rounded-pill bg-danger" >
            {source}
          </span></div>
        <img src={!imagrUrl ? "https://www.hindustantimes.com/ht-img/img/2023/02/22/1600x900/India-Australia-Cricket-57_1677073626147_1677073626147_1677073660961_1677073660961.jpg" : imagrUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}.... </h5>
          <p className="card-text">{description}....</p>
          <p className="card-text"><small className="text-muted">by {author ? author : "unkown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
        </div>
      </div>

    </div>
  )
}


export default NewsItem;
