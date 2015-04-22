var AddStoreItem = require('./StoreComponent/AddStoreItem');
var StoreContainer = require('./StoreComponent/StoreContainer');

React.render(
    <StoreContainer />,
    document.getElementById('StoreItems')
);

React.render(
    <AddStoreItem />,
    document.getElementById('AddStoreItem')
);