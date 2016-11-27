import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '../components/List.js'
import RaisedButton from 'material-ui/RaisedButton';
import SimpleDialog from '../components/utils/SimpleDialog.js';
import ArticlePostModal from '../components/utils/ArticlePostModal.js';
import ArticleContentModal from '../components/utils/ArticleContentModal.js';
import actions from '../redux/actions/addArticle.js';
import ArticleBlock from '../components/utils/ArticleBlock/';
import Loading from '../components/utils/Loading/';

const style = {
  container: {
  },
  postBtn: {
    position: 'fixed',
    right: '50px',
  },
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      articlePostModal: false,
      articleContentModal: false,
      activeArticle: '',
      dialog: false,
      dialogText: ''
    }
  }
  componentDidMount() {
    const context = this;
    socket.on('updateArticle',function(msg){
      const payload = msg[0];
      context.props.addArticleAction({
        _id: payload._id,
        title: payload.title,
        content: payload.content,
        author: payload.posterAccount,
        avatar: payload.avatar,
        date: payload.PostDate,
      });
    })
  }

  postArticle() {
    this.setState({ articlePostModal: true })
  }
  articleClick(e,id) {
    this.setState({ articleContentModal: true })
    console.log(this.props.articles.forEach( i => {
      if (i._id === id ){
        this.setState({ activeArticle: i })
      }
    }))
  }
  render() {
    return (
      <div style={style.container}>
        { this.state.dialog ? <SimpleDialog content={this.state.dialogText} context={this} /> : '' }
        { this.state.articlePostModal ? <ArticlePostModal user={this.props.user} context={this} /> : '' }
        { this.props.user.login
          ?
          <RaisedButton
          onClick={() => this.postArticle()}
          label="發表文章" primary={true}
          style={style.postBtn} />
          :
          ''
        }
          <ArticleBlock articleClick={(e,id) => this.articleClick(e,id)} articles={this.props.articles} />
          { this.state.articleContentModal
            ?
            <ArticleContentModal
              user={this.props.user}
              context={this}
              activeArticle={this.state.activeArticle}
            />
            :
            ''
          }
          <div style={{width:'100%', height: '200px'}}>
            <Loading />
          </div>
      </div>
    )
  }

}
function mapStateToProp(state){
	return {
    user:state.userInfo,
    articles: state.article
  }
}

export default connect(mapStateToProp,{
    addArticleAction: actions.addArticle,
  })(Main)
