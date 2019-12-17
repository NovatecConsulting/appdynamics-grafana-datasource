define(["app/core/app_events","app/core/utils/datemath","app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_datemath__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./appd_sdk.ts":
/*!*********************!*\
  !*** ./appd_sdk.ts ***!
  \*********************/
/*! exports provided: AppDynamicsSDK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDynamicsSDK", function() { return AppDynamicsSDK; });
/* harmony import */ var grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/core/utils/datemath */ "grafana/app/core/utils/datemath");
/* harmony import */ var grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./utils.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




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
        var startTime = (Math.ceil(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__["parse"](options.range.from)));
        var endTime = (Math.ceil(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__["parse"](options.range.to)));
        var grafanaResponse = { data: [] };
        // For each one of the metrics the user entered:
        var requests = options.targets.map(function (target) {
            return new Promise(function (resolve) {
                if (target.hide) { // If the user clicked on the eye icon to hide, don't fetch the metrics.
                    return resolve();
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
                        var allQueries = _utils__WEBPACK_IMPORTED_MODULE_2__["resolveMetricQueries"](templatedMetric_1);
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
                    case 'Segments': // TODO: Maybe a Regex option as well
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
            grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Error', errMsg]);
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
    AppDynamicsSDK.prototype.getBusinessTransactionNames = function (appName, tierName, onlyPerformanceData) {
        var _this = this;
        if (onlyPerformanceData === void 0) { onlyPerformanceData = false; }
        var url = this.url + '/controller/rest/applications/' + appName + '/business-transactions';
        return this.backendSrv.datasourceRequest({
            url: url,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                var businessTransactions = void 0;
                if (tierName) {
                    businessTransactions = _this.getBTsInTier(tierName, response.data);
                }
                else {
                    businessTransactions = _this.getFilteredNames('', response.data);
                }
                if (onlyPerformanceData) {
                    return _this.filterBtWithoutPerfData(appName, tierName, businessTransactions);
                }
                else {
                    return businessTransactions;
                }
            }
            else {
                return [];
            }
        }).catch(function (error) {
            return [];
        });
    };
    AppDynamicsSDK.prototype.filterBtWithoutPerfData = function (appName, tierName, businessTransactions) {
        var startTime = Math.ceil(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__["parse"](this.templateSrv.timeRange.from));
        var endTime = Math.ceil(grafana_app_core_utils_datemath__WEBPACK_IMPORTED_MODULE_0__["parse"](this.templateSrv.timeRange.to));
        var requests = [];
        var _loop_1 = function () {
            var businessTransaction = businessTransactions[i];
            var metricPath = 'Business Transaction Performance|Business Transactions|' + tierName + '|' + businessTransaction.name + '|Calls per Minute';
            console.log("Query metric path:", metricPath);
            var requestPromise = this_1.backendSrv.datasourceRequest({
                url: this_1.url + '/controller/rest/applications/' + appName + '/metric-data',
                method: 'GET',
                params: {
                    'metric-path': metricPath,
                    'time-range-type': 'BETWEEN_TIMES',
                    'start-time': startTime,
                    'end-time': endTime,
                    'rollup': 'true',
                    'output': 'json'
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                return {
                    businessTransaction: businessTransaction.name,
                    response: response
                };
            });
            requests.push(requestPromise);
        };
        var this_1 = this;
        for (var i = 0; i < businessTransactions.length; i++) {
            _loop_1();
        }
        return Promise.all(requests)
            .then(function (results) {
            var filteredTransactionNames = lodash__WEBPACK_IMPORTED_MODULE_3___default()(results)
                .filter(function (element) { return element.response.data[0].metricValues.length > 0; })
                .map(function (element) {
                return { name: element.businessTransaction };
            })
                .value();
            return filteredTransactionNames;
        });
    };
    AppDynamicsSDK.prototype.getBusinessTransactionId = function (appName, tierName, btName) {
        var _this = this;
        var url = this.url + '/controller/rest/applications/' + appName + '/business-transactions/';
        return this.backendSrv.datasourceRequest({
            url: url,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                if (tierName && btName) {
                    return _this.getBTIdsInTier(tierName, btName, response.data);
                }
                else {
                    return [];
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
        var possibleQueries = ['BusinessTransactions', 'Tiers', 'Nodes', 'ServiceEndpoints', 'ApplicationId', 'BusinessTransactionId'];
        var onlyPerformanceData = query.endsWith('.OnlyPerfData');
        if (onlyPerformanceData) {
            query = query.substr(0, query.lastIndexOf('.'));
        }
        if (query.indexOf('.') > -1) {
            var values = query.split('.');
            var appName = void 0;
            var tierName = "";
            var btName = "";
            var type = void 0;
            type = values[values.length - 1];
            appName = this.templateSrv.replace(values[0]);
            if (values.length >= 3) {
                tierName = this.templateSrv.replace(values[1]);
            }
            if (values.length >= 4) {
                btName = this.templateSrv.replace(values[2]);
            }
            if (possibleQueries.indexOf(type) === -1) {
                grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Error', 'Templating must be one of Applications, AppName.BusinessTransactions, AppName.Tier.BusinessTransaction.BusinessTransactionId, AppName.Tiers, AppName.Tiername.ServiceEndpoints, AppName.Nodes, AppName.ApplicationId']);
            }
            else {
                switch (type) {
                    case 'BusinessTransactions':
                        return this.getBusinessTransactionNames(appName, tierName, onlyPerformanceData);
                    case 'BusinessTransactionId':
                        return this.getBusinessTransactionId(appName, tierName, btName);
                    case 'Tiers':
                        return this.getTierNames(appName);
                    case 'ApplicationId':
                        return this.getApplicationId(appName);
                    case 'Nodes':
                        return this.getNodeNames(appName, tierName);
                    case 'ServiceEndpoints':
                        return this.getServiceEndpoints(appName, tierName);
                    default:
                        grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Error', "The value after '.' must be BusinessTransactions, ServiceEndpoints, Tiers, Nodes, BusinessTransactionId or ApplicationId"]);
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
    AppDynamicsSDK.prototype.getApplicationId = function (appName) {
        return this.backendSrv.datasourceRequest({
            url: this.url + '/controller/rest/applications/' + appName,
            method: 'GET',
            params: { output: 'json' }
        }).then(function (response) {
            if (response.status === 200) {
                return [{ name: response.data[0]["id"] }];
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
        templatedQuery = _utils__WEBPACK_IMPORTED_MODULE_2__["getFirstTemplated"](templatedQuery);
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
    AppDynamicsSDK.prototype.getBTIdsInTier = function (tierName, btName, arrayResponse) {
        // We only want the BT-ID's that belong to a tier and the corresponding BT name
        var arr;
        var returnResponse = [];
        arr = arrayResponse.filter(function (element) {
            if (btName.startsWith("{") && btName.endsWith("}")) {
                btName.slice(1, -1);
            }
            if (btName.indexOf(",") === -1) {
                return element.tierName.toLowerCase() === tierName.toLowerCase() && element.name.toLowerCase() === btName.toLowerCase();
            }
            else {
                return element.tierName.toLowerCase() === tierName.toLowerCase();
            }
        });
        arr.forEach(function (element) {
            returnResponse.push({ name: element.id });
        });
        return returnResponse;
    };
    AppDynamicsSDK.prototype.getBTsInTier = function (tierName, arrayResponse) {
        // We only want the BTs that belong to the tier
        return arrayResponse.filter(function (element) {
            return element.tierName.toLowerCase() === tierName.toLowerCase();
        });
    };
    return AppDynamicsSDK;
}());



/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! exports provided: AppDynamicsDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDynamicsDatasource", function() { return AppDynamicsDatasource; });
/* harmony import */ var _appd_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appd_sdk */ "./appd_sdk.ts");

var AppDynamicsDatasource = /** @class */ (function () {
    function AppDynamicsDatasource(instanceSettings, backendSrv, templateSrv) {
        this.appD = new _appd_sdk__WEBPACK_IMPORTED_MODULE_0__["AppDynamicsSDK"](instanceSettings, backendSrv, templateSrv);
    }
    AppDynamicsDatasource.prototype.query = function (options) {
        return this.appD.query(options);
    };
    AppDynamicsDatasource.prototype.testDatasource = function () {
        return this.appD.testDatasource();
    };
    AppDynamicsDatasource.prototype.annotationQuery = function () {
        // TODO implement annotationQuery
    };
    AppDynamicsDatasource.prototype.metricFindQuery = function (query) {
        return this.appD.getTemplateNames(query).then(function (results) {
            return results.map(function (result) {
                return { text: result.name };
            });
        });
    };
    return AppDynamicsDatasource;
}());



/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: Datasource, ConfigCtrl, QueryCtrl, QueryOptionsCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return AppDynamicsConfigCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryOptionsCtrl", function() { return AppDynamicsQueryOptionsCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["AppDynamicsDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["AppDynamicsQueryCtrl"]; });



var AppDynamicsConfigCtrl = /** @class */ (function () {
    function AppDynamicsConfigCtrl() {
    }
    AppDynamicsConfigCtrl.templateUrl = 'partials/config.html';
    return AppDynamicsConfigCtrl;
}());
var AppDynamicsQueryOptionsCtrl = /** @class */ (function () {
    function AppDynamicsQueryOptionsCtrl() {
    }
    AppDynamicsQueryOptionsCtrl.templateUrl = 'partials/query.options.html';
    return AppDynamicsQueryOptionsCtrl;
}());



/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! exports provided: AppDynamicsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDynamicsQueryCtrl", function() { return AppDynamicsQueryCtrl; });
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AppDynamicsQueryCtrl = /** @class */ (function (_super) {
    __extends(AppDynamicsQueryCtrl, _super);
    function AppDynamicsQueryCtrl($scope, $injector, uiSegmentSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.metricSegmentValueChanged = function (metricSegment, segmentIndex) {
            // If the user is editing a Folder segment, we delete the ones after it. Unless the user typed a '*'
            if (segmentIndex < _this.metricSegments.length - 1 && metricSegment.value !== '*') {
                _this.metricSegments.length = segmentIndex + 1;
            }
            // Only add a new one if it is the last and it is not a Leaf and not a '*'.
            if (segmentIndex === _this.metricSegments.length - 1 && metricSegment.expandable && metricSegment.value !== '*') {
                _this.metricSegments.push(_this.uiSegmentSrv.newSelectMetric());
            }
            // If this is a Leaf, we don't need the segments after it.
            if (segmentIndex < _this.metricSegments.length - 1 && !metricSegment.expandable) {
                _this.metricSegments.length = segmentIndex + 1;
            }
            _this.target.metric = _this.metricSegments.map(function (segment) { return segment.value; }).join('|');
            _this.panelCtrl.refresh();
        };
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.appD = _this.datasource.appD;
        if (_this.target) {
            _this.parseTarget();
        }
        _this.getApplicationNames = function (query) {
            return _this.appD.getApplicationNames(query)
                .then(_this.transformToSegments(false));
        };
        _this.getMetricNames = function (index) {
            return _this.appD.getMetricNames(_this.target.application, _this.getSegmentPathUpTo(index))
                .then(_this.transformToSegments(false));
        };
        return _this;
    }
    AppDynamicsQueryCtrl.prototype.parseTarget = function () {
        var _this = this;
        this.metricSegments = [];
        this.target.transformLegendText = '1';
        this.applicationSegment = this.uiSegmentSrv.newSegment(this.target.application || 'Application');
        if (this.target.metric) {
            this.target.metric.split('|').forEach(function (element, index, arr) {
                var expandable = true;
                if (index === arr.length - 1) {
                    expandable = false;
                }
                var newSegment = _this.uiSegmentSrv.newSegment({ value: element, expandable: expandable });
                _this.metricSegments.push(newSegment);
            });
        }
        else {
            this.metricSegments = [this.uiSegmentSrv.newSelectMetric()];
        }
    };
    AppDynamicsQueryCtrl.prototype.getSegmentPathUpTo = function (index) {
        var arr = this.metricSegments.slice(0, index);
        var segments = '';
        arr.forEach(function (element) {
            segments += element.value + '|';
        });
        return segments;
    };
    AppDynamicsQueryCtrl.prototype.appChanged = function () {
        this.target.application = this.applicationSegment.value;
        this.panelCtrl.refresh();
    };
    AppDynamicsQueryCtrl.prototype.toggleEditorMode = function () {
        this.target.rawQuery = !this.target.rawQuery;
        if (!this.target.rawQuery) {
            // refresh target metric from segments (we discard the changes done in raw query mode)
            this.target.metric = this.metricSegments.map(function (segment) { return segment.value; }).join('|');
            this.panelCtrl.refresh();
        }
    };
    AppDynamicsQueryCtrl.prototype.onChangeInternal = function () {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    };
    AppDynamicsQueryCtrl.prototype.transformToSegments = function (addTemplateVars) {
        var _this = this;
        return function (results) {
            var segments = results.map(function (segment) {
                return _this.uiSegmentSrv.newSegment({ value: segment.name, expandable: segment.type === 'folder' });
            });
            return segments;
        };
    };
    AppDynamicsQueryCtrl.templateUrl = 'partials/query.editor.html';
    return AppDynamicsQueryCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__["QueryCtrl"]));



/***/ }),

/***/ "./utils.ts":
/*!******************!*\
  !*** ./utils.ts ***!
  \******************/
/*! exports provided: isContainsBraces, isContainsParenthesis, splitTemplateQuery, resolveMetricQueries, getFirstTemplated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContainsBraces", function() { return isContainsBraces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContainsParenthesis", function() { return isContainsParenthesis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitTemplateQuery", function() { return splitTemplateQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveMetricQueries", function() { return resolveMetricQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstTemplated", function() { return getFirstTemplated; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function isContainsBraces(query) {
    var bracesPattern = /.*\{.+\}.*?$/;
    return bracesPattern.test(query);
}
function isContainsParenthesis(query) {
    var parenthesisPattern = /.*\(.+\).*?$/;
    return parenthesisPattern.test(query);
}
function splitTemplateQuery(query) {
    var splitPattern = /\{[^\{\}]*\}|\{\/.*\/\}/g;
    var split;
    if (isContainsBraces(query)) {
        var result = query.match(splitPattern);
        split = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result, function (part) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.trim(part, '{}').split(',');
        });
    }
    else {
        split = query.split(',');
    }
    return split;
}
function resolveMetricQueries(query) {
    var queries = [];
    var splitPattern = /\([^\()\)]*\)|\(\/.*\/\)/g;
    if (isContainsParenthesis(query)) {
        var matches = query.match(splitPattern);
        matches.forEach(function (element) {
            var allPatterns = new RegExp(element, 'g');
            var possibleElements = element.match(allPatterns);
            possibleElements.forEach(function (possibleElement) {
                // MATTHIAS HUBER: we do not know why parenthesis needs to be removed. Maybe AppDynamics REST Calls in
                // earlier versions did not work. We have to keep them for metrics like 'Average Response Time (ms)'
                // queries.push(query.replace(element, possibleElement));
                // TEMPORARY FIX: we simply don't remove the parenthesis. Refactoring maybe in the future.
                queries.push(query);
            });
        });
    }
    else {
        return [query];
    }
    return queries;
}
function getFirstTemplated(query) {
    var allTemplated = splitTemplateQuery(query);
    var splitPattern = /\{[^\{\}]*\}|\{\/.*\/\}/g;
    if (isContainsBraces(query)) {
        var matches = query.match(splitPattern);
        for (var i = 0; i < matches.length; i++) {
            query = query.replace(matches[i], allTemplated[i][0]);
        }
    }
    return query;
}


/***/ }),

/***/ "grafana/app/core/app_events":
/*!**************************************!*\
  !*** external "app/core/app_events" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__;

/***/ }),

/***/ "grafana/app/core/utils/datemath":
/*!******************************************!*\
  !*** external "app/core/utils/datemath" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_datemath__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map