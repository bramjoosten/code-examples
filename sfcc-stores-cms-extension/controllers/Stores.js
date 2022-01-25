'use strict';

/* One thing that could be improved here is how the data is retreived: SFCC offers both an
internal API as well as a REST API. In the example the internal one is used to get the
initial data, where as the REST API is used to do the updates. If we want to only use
the internal API we would have needed to create a custom extension on the store db object,
since it's not allowed to modify it via the internal API. Therefore the best approach
would be to also fetch the data from the REST API, so we don't have to re-map
object keys and values. */

const server = require('server');
const URLUtils = require("dw/web/URLUtils");
const Resource = require("dw/web/Resource");
const StoreMgr = require('dw/catalog/StoreMgr');
const safeAssign = require('bc_utils/cartridge/scripts/utils/safeAssign');
const parseJSON = require('bc_utils/cartridge/scripts/utils/ParseJSON');
const CSRF = require('*/cartridge/scripts/middleware/csrf');


server.get('Start', CSRF.generateToken, function (req, res, next) {
    const STORE_GROUP = 'SomeStore';
    const allStores = StoreMgr.getStoreGroup(STORE_GROUP).getStores().toArray();

    res.render('listStores', {
        appData: {
            stores: allStores.map(store => {
                return {
                    id: store.ID,
                    name: store.name,
                    address: store.address1,
                    city: store.city
                };
            }),
            urls: {
                GetDetails: URLUtils.url('Stores-GetDetails', res.viewData.csrf.tokenName, res.viewData.csrf.token).toString(),
                Save: URLUtils.url('Stores-Save', res.viewData.csrf.tokenName, res.viewData.csrf.token).toString(),
                overviewURL: URLUtils.abs('SiteNavigationBar-ShowMenuitemOverview', 'CurrentMenuItemId', 'example_merchant_tools_menu').toString()
            },
            resources: {
                daysOfWeek: Resource.msg('store.daysOfWeek', 'example', null),
                itemName: Resource.msg('store.itemName', 'example', null),
                mainName: Resource.msg('mainName', 'example', null),
                tableHeadersDetail: Resource.msg('store.tableHeadersDetail', 'example', null),
                tableHeadersList: Resource.msg('store.tableHeadersList', 'example', null),
                save: Resource.msg('button.save', 'example', null)
            },
        },
    });
    next();
});

server.post('GetDetails', CSRF.validateAjaxRequest, function (req, res, next) {
    const body = parseJSON(req.body);
    const singleStore = StoreMgr.getStore(body.id) || '';

    if (!singleStore) {
        res.json({ error: true, message: Resource.msg("store.error.storeIDnotfound", "example", null) });
        return next();
    }

    res.json({
        error: false,
        openingHrs: singleStore.storeHours.toString()
    });

    return next();
});

server.post('Save', CSRF.validateAjaxRequest, function (req, res, next) {
    const ocapiService = require('*/cartridge/scripts/services/ocapi');
    const body = parseJSON(req.body);
    const tokenResponse = ocapiService.getToken().call();
    const token = parseJSON(safeAssign(tokenResponse, "object.text", '')).access_token;
    const storeId = body.id;

    if (token) {
        ocapiService.patchStore({ "store_hours": { default: { "source": JSON.stringify(body.storeHours) } } }).call(token, storeId);
    }

    next();
});


module.exports = server.exports();
