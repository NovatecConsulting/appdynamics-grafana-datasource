"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = require("./datasource");
exports.Datasource = datasource_1.AppDynamicsDatasource;
const query_ctrl_1 = require("./query_ctrl");
exports.QueryCtrl = query_ctrl_1.AppDynamicsQueryCtrl;
class AppDynamicsConfigCtrl {
}
AppDynamicsConfigCtrl.templateUrl = 'partials/config.html';
exports.ConfigCtrl = AppDynamicsConfigCtrl;
class AppDynamicsQueryOptionsCtrl {
}
AppDynamicsQueryOptionsCtrl.templateUrl = 'partials/query.options.html';
exports.QueryOptionsCtrl = AppDynamicsQueryOptionsCtrl;
