var express = require('express');
var app = express();
var path = require('path');
var config = require('../../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var api = require ('./api.js');

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
	saveUninitialized: true, // don't create session until something stored
  resave: false, //don't save session if unmodified
  secret: 'yicheng',
  key: 'auth_token',//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
		url:'mongodb://forclass1:test123@ds013898.mlab.com:13898/forclass'
  })
}));

api.api(app);//引入api.js


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



app.get('*', (req, res) => {

	let initialState = {
			todos:[{
				id:0,
				completed: false,
				text:'initial for demo'
			}],
			userInfo:{

			}
	}
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
});

const renderFullPage = (html, preloadedState) => (`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1">
  <title>React Todo List</title>
	<link rel="stylesheet" type="text/css" href="/css/reset.css">

</head>
<body>
  <div id="app">${html}</div>
  <script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
   </script>
  <script src="bundle.js"></script>
</body>
</html>
`
);

var port = 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
