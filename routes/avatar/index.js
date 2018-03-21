const fs = require('fs');
const routes = require('express').Router();

routes.get('/', function(req, res) {
    res.send('im the avatar node!'); 
});
routes.route('/:username')
    .get((req, res) => {
        fs.readFile(`${process.cwd()}/dist/avatar/${req.params.username}`, (error, data) => {
            //error handle
            if (error) {
                return error.code === 'ENOENT'
                    ? res.status(404).end('File not found!')
                    : res.status(500).end('Unexpected server error!');
            }

            const img = new Buffer(data, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img); 
        });
    });

module.exports = routes;