"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isContainsBraces(query) {
    var bracesPattern = /.*\{.+\}.*?$/;
    return bracesPattern.test(query);
}
exports.isContainsBraces = isContainsBraces;
function isContainsParenthesis(query) {
    var parenthesisPattern = /.*\(.+\).*?$/;
    return parenthesisPattern.test(query);
}
exports.isContainsParenthesis = isContainsParenthesis;
function splitTemplateQuery(query) {
    var splitPattern = /\{[^\{\}]*\}|\{\/.*\/\}/g;
    var split;
    if (isContainsBraces(query)) {
        var result = query.match(splitPattern);
        split = _.map(result, function (part) {
            return _.trim(part, '{}').split(',');
        });
    }
    else {
        split = query.split(',');
    }
    return split;
}
exports.splitTemplateQuery = splitTemplateQuery;
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
exports.resolveMetricQueries = resolveMetricQueries;
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
exports.getFirstTemplated = getFirstTemplated;
