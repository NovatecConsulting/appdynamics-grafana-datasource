"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appd_sdk_1 = require("./appd_sdk");
class AppDynamicsDatasource {
    constructor(instanceSettings, $q, backendSrv, templateSrv) {
        this.$q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.appD = new appd_sdk_1.AppDynamicsSDK(instanceSettings, backendSrv, templateSrv);
        this.templateSrv = templateSrv;
    }
    query(options) {
        return this.appD.query(options);
    }
    testDatasource() {
        return this.appD.testDatasource();
    }
    annotationQuery() {
        // TODO implement annotationQuery
    }
    metricFindQuery(query) {
        return this.appD.getTemplateNames(query).then((results) => {
            return results.map((result) => {
                return { text: result.name };
            });
        });
    }
}
exports.AppDynamicsDatasource = AppDynamicsDatasource;
