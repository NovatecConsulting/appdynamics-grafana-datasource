import { AppDynamicsSDK } from './appd_sdk';

export class AppDynamicsDatasource {

    appD: AppDynamicsSDK;

    constructor(instanceSettings, backendSrv, templateSrv) {
        this.appD = new AppDynamicsSDK(instanceSettings, backendSrv, templateSrv);
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
