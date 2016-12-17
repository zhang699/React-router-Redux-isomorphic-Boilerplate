var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('../../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
import config1 from '../config.js';
import axios from 'axios';
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
	saveUninitialized: false, // don't create session until something stored
  resave: true, //don't save session if unmodified
  secret: 'yicheng',
  key: 'auth_token',//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 1},//1 days
  store: new MongoStore({
		url: config1.dbURL
  })
}));


//Redis
import Redis from './redis';
Redis();

//SOCKET.IO
import { socketio } from './io.js';
socketio(io, axios, config1);

//引入API
import { api } from './api.js';
api(app);


import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';
import root from '../client/root.js';
import {Provider} from 'react-redux'
import {configureStore} from '../redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const routes = createRoutes(root);

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo:true,publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));


app.get('*',(req, res) => {

	let initialState = {
			todos:[{
				id:0,
				completed: false,
				text:'initial for demo'
			}],
			userInfo:{
				login:false
			},
			article: []
	}
	
	axios.get(`http://localhost:3001/getArticle`)//axios在iso server須加上域名
		.then(response => {
			initialState.article = response.data;//axios預設json parse
			const store = configureStore(initialState);
			const muiTheme = getMuiTheme({
				userAgent: req.headers['user-agent'],
			});
			match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
				if (error) {
					res.status(500).send(error.message);
				} else if (redirectLocation) {
					res.redirect(302, redirectLocation.pathname + redirectLocation.search);
				} else if (renderProps) {
					const content = renderToString(
						<Provider store={store}>
							<MuiThemeProvider muiTheme={muiTheme}>
								<RouterContext {...renderProps} />
							</MuiThemeProvider>
						</Provider>
					);
					let state = store.getState();
					let page = renderFullPage(content, state);
					return res.status(200).send(page);
				} else {
					res.status(404).send('Not Found');
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.end(err);
		});
})

const renderFullPage = (html, preloadedState) => (`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1">
  <title>那些年困惑的年輕人</title>
	<link rel="stylesheet" type="text/css" href="/css/reset.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
	<script src="/socket.io/socket.io.js"></script>
  <script></script>
	<script>
	  var socket = io();




	</script>
</head>
<body>
<div id="fb-root"></div>

  <div id="app">${html}</div>
  <script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
   </script>
  <script src="bundle.js"></script>
</body>
</html>
`
);

var port = 3001;

http.listen(port,'127.0.0.1', function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
