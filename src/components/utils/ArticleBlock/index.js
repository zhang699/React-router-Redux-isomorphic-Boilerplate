import React from 'react';
import './index.css'

const style = {
  title: {
    fontSize: '25px'
  },
  article: {
    borderBottom: '1px solid black',
    height: '70px'
  },
  articleContainer: {
    border: '1px solid orange',
    opacity: '0.2',
    height: '100%',
    width: '70%',
    margin:' 0 auto'
  },
}

const ArticleBlock = (props) => (
  <div style={style.articleContainer}>
    {
      props.articles.map((i) => (
        <div className="articleBlock"  style={style.article} key={i._id}>
          <div style={style.title}>{i.title}</div>
        </div>
      ))
    }
  </div>
)

export default ArticleBlock;
