const routes = require('next-routes')();

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/open', '/campaigns/open')
    .add('/campaigns/frequentlyasked', '/campaigns/frequentlyasked')
    .add('/campaigns/inactive', '/campaigns/inactive')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');



module.exports = routes;
