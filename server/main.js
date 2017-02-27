import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import bodyParser from 'body-parser';
import api from './routes';

const app = express();
const port = 3000;
const api_prefix = '/api';
const dev_port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/datafile', express.static(path.join(__dirname, './../ext/set3')));
app.use(api_prefix, api);

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

// development env
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        dev_port, () => {
            console.log('webpack-dev-server is listening on port', dev_port);
        }
    );
}

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
