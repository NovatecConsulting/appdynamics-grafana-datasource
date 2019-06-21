"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateMath = require("app/core/utils/datemath");
var app_events_1 = require("app/core/app_events");
var utils = require("./utils");
/*
    This is the class where all AppD logic should reside.
    This gets Application Names, Metric Names and queries the API
*/
var AppDynamicsSDK = /** @class */ (function () {
    function AppDynamicsSDK(instanceSettings, backendSrv, templateSrv) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        // Controller settings
        this.username = instanceSettings.username;
        this.password = instanceSettings.password;
        this.url = instanceSettings.url;
        this.tenant = instanceSettings.tenant;
    }
    AppDynamicsSDK.prototype.query = function (options) {
        var _this = this;
        var startTime = (Math.ceil(dateMath.parse(options.range.from)));
        var endTime = (Math.ceil(dateMath.parse(options.range.to)));
        var grafanaResponse = { data: [] };
        // For each one of the metrics the user entered:
        var requests = options.targets.map(function (target) {
            return new Promise(function (resolve) {
                if (target.hide) {
                    resolve();
                }
                else {
                    var templatedApp_1 = _this.templateSrv.replace(target.application, options.scopedVars, 'regex');
                    var templatedMetric_1 = _this.templateSrv.replace(target.metric, options.scopedVars, 'regex');
                    if (templatedMetric_1 === target.metric) {
                        return new Promise(function (innerResolve) {
                            _this.getMetrics(templatedApp_1, templatedMetric_1, target, grafanaResponse, startTime, endTime, options, resolve);
                        });
                    }
                    else {
                        // We need to also account for every combination of templated metric
                        var allQueries = utils.resolveMetricQueries(templatedMetric_1);
                        var everyRequest = allQueries.map(function (query) {
                            return new Promise(function (innerResolve) {
                                _this.getMetrics(templatedApp_1, query, target, grafanaResponse, startTime, endTime, options, innerResolve);
                            });
                        });
                        return Promise.all(everyRequest).then(function () {
                            resolve();
                        });
                    }
                }
            });
        });
        return Promise.all(requests).then(function () {
            return grafanaResponse;
        });
    };
    AppDynamicsSDK.prototype.getMetrics = function (templatedApp, templatedMetric, target, grafanaResponse, startTime, endTime, options, callback) {
        var _this = this;
        //console.log(`Getting metric: App = ${templatedApp} Metric = ${templatedMetric}`);
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications/' + templatedApp + '/metric-data',
            method: 'GET',
            params: {
                'metric-path': templatedMetric,
                'time-range-type': 'BETWEEN_TIMES',
                'start-time': startTime,
                'end-time': endTime,
                'rollup': 'false',
                'output': 'json'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            // A single metric can have multiple results if the user chose to use a wildcard
            // Iterates on every result.
            response.data.forEach(function (metricElement) {
                var pathSplit = metricElement.metricPath.split('|');
                var legend = target.showAppOnLegend ? templatedApp + ' - ' : '';
                // Legend options
                switch (target.transformLegend) {
                    case 'Segments':// TODO: Maybe a Regex option as well
                        var segments = target.transformLegendText.split(',');
                        for (var i = 0; i < segments.length; i++) {
                            var segment = Number(segments[i]) - 1;
                            if (segment < pathSplit.length) {
                                legend += pathSplit[segment] + (i === (segments.length - 1) ? '' : '|');
                            }
                        }
                        break;
                    default:
                        legend += metricElement.metricPath;
                }
                grafanaResponse.data.push({
                    target: legend,
                    datapoints: _this.convertMetricData(metricElement)
                });
            });
        }).then(function () {
            callback();
        }).catch(function (err) {
            var errMsg = 'Error getting metrics.';
            if (err.data) {
                if (err.data.indexOf('Invalid application name') > -1) {
                    errMsg = "Invalid application name " + templatedApp;
                }
            }
            app_events_1.default.emit('alert-error', ['Error', errMsg]);
            callback();
        });
    };
    // This helper method just converts the AppD response to the Grafana format
    AppDynamicsSDK.prototype.convertMetricData = function (metricElement) {
        var responseArray = [];
        metricElement.metricValues.forEach(function (metricValue) {
            responseArray.push([metricValue.value, metricValue.startTimeInMillis]);
        });
        return responseArray;
    };
    AppDynamicsSDK.prototype.testDatasource = function () {
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications',
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                var numberOfApps = response.data.length;
                return { status: 'success', message: 'Data source is working, found ' + numberOfApps + ' apps', title: 'Success' };
            }
            else {
                return { status: 'failure', message: 'Data source is not working: ' + response.status, title: 'Failure' };
            }
        });
    };
    AppDynamicsSDK.prototype.annotationQuery = function () {
        // TODO implement annotationQuery
    };
    AppDynamicsSDK.prototype.getBusinessTransactionNames = function (appName, tierName) {
        var _this = this;
        var url = this.url + '/controller/rest/applications/' + appName + '/business-transactions';
        return this.backendSrv.datasourceRequest({
            url: url,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                if (tierName) {
                    return _this.getBTsInTier(tierName, response.data);
                }
                else {
                    return _this.getFilteredNames('', response.data);
                }
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getTierNames = function (appName) {
        var _this = this;
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications/' + appName + '/tiers',
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                return _this.getFilteredNames('', response.data);
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getNodeNames = function (appName, tierName) {
        var _this = this;
        var url = this.url + '/controller/rest/applications/' + appName + '/nodes';
        if (tierName) {
            url = this.url + '/controller/rest/applications/' + appName + '/tiers/' + tierName + '/nodes';
        }
        return this.backendSrv.datasourceRequest({
            url: url,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                return _this.getFilteredNames('', response.data);
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getServiceEndpoints = function (appName, tierName) {
        var _this = this;
        var url = this.url + '/controller/rest/applications/' + appName + '/metrics?metric-path=Service+Endpoints|' + tierName;
        return this.backendSrv.datasourceRequest({
            url: url,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                return _this.getFilteredNames('', response.data);
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getTemplateNames = function (query) {
        var possibleQueries = ['BusinessTransactions', 'Tiers', 'Nodes', 'ServiceEndpoints'];
        var templatedQuery = this.templateSrv.replace(query);
        if (templatedQuery.indexOf('.') > -1) {
            var values = templatedQuery.split('.');
            var appName = void 0;
            var tierName = void 0;
            var type = void 0;
            if (values.length === 3) {
                appName = values[0];
                tierName = values[1];
                type = values[2];
            }
            else {
                appName = values[0];
                type = values[1];
            }
            //console.log(appName, tierName, type);
            if (possibleQueries.indexOf(type) === -1) {
                app_events_1.default.emit('alert-error', ['Error', 'Templating must be one of Applications, AppName.BusinessTransactions, AppName.Tiers, AppName.Tiername.ServiceEndpoints, AppName.Nodes']);
            }
            else {
                switch (type) {
                    case 'BusinessTransactions':
                        return this.getBusinessTransactionNames(appName, tierName);
                    case 'Tiers':
                        return this.getTierNames(appName);
                    case 'Nodes':
                        return this.getNodeNames(appName, tierName);
                    case 'ServiceEndpoints':
                        return this.getServiceEndpoints(appName, tierName);
                    default:
                        app_events_1.default.emit('alert-error', ['Error', "The value after '.' must be BusinessTransactions, ServiceEndpoints, Tiers or Nodes"]);
                }
            }
        }
        else {
            return this.getApplicationNames('');
        }
    };
    AppDynamicsSDK.prototype.getApplicationNames = function (query) {
        var _this = this;
        var templatedQuery = this.templateSrv.replace(query);
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications',
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                return _this.getFilteredNames(templatedQuery, response.data);
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getMetricNames = function (app, query) {
        var _this = this;
        var templatedApp = this.templateSrv.replace(app);
        var templatedQuery = this.templateSrv.replace(query);
        templatedQuery = utils.getFirstTemplated(templatedQuery);
        //console.log('TEMPLATED QUERY', templatedQuery);
        var params = { output: 'json' };
        if (query.indexOf('|') > -1) {
            params['metric-path'] = templatedQuery;
        }
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications/' + templatedApp + '/metrics',
            method: 'GET',
            params: params
        }).then(function (response) {
            if (response.status === 200) {
                return _this.getFilteredNames(templatedQuery, response.data);
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.getFilteredNames = function (query, arrayResponse) {
        if (query.indexOf('|') > -1) {
            var queryPieces = query.split('|');
            query = queryPieces[queryPieces.length - 1];
        }
        if (query.length === 0) {
            return arrayResponse;
        }
        else {
            // Only return the elements that match what the user typed, this is the essence of autocomplete.
            return arrayResponse.filter(function (element) {
                return query.toLowerCase().indexOf(element.name.toLowerCase()) !== -1
                    || element.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
        }
    };
    AppDynamicsSDK.prototype.getBTsInTier = function (tierName, arrayResponse) {
        // We only want the BTs that belong to the tier
        return arrayResponse.filter(function (element) {
            return element.tierName.toLowerCase() === tierName.toLowerCase();
        });
    };
    return AppDynamicsSDK;
}());
exports.AppDynamicsSDK = AppDynamicsSDK;
