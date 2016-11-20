import React from 'react';
import './index.css'

const style = {
  title: {
    fontSize: '25px',
    color: 'black',
    marginTop: '20px'
  },
  article: {
    borderBottom: '1px solid black',
    height: '100px',
    overflow: 'auto'
  },
  articleContainer: {
    height: '100%',
    width: '70%',
    margin:' 0 auto',
    marginTop: '100px'
  },
  date: {
    float: 'right'
  }
}

const ArticleBlock = (props) => (
  <div style={style.articleContainer}>
    {
      props.articles.map((i) => (
        <div onClick={(e) => props.articleClick(e,i._id)} className="articleBlock"  style={style.article} key={i._id}>
          <div style={style.title}>
            {i.title}
          </div>
          <div style={style.date}>{(i.PostDate).substring(0, 24)}</div>
        </div>
      ))
    }
  </div>
)

export default ArticleBlock;
