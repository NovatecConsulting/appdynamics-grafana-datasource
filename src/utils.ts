import _ from 'lodash';

export function isContainsBraces(query) {
    const bracesPattern = /.*\{.+\}.*?$/;
    return bracesPattern.test(query);
}

export function isContainsParenthesis(query) {
    const parenthesisPattern = /.*\(.+\).*?$/;
    return parenthesisPattern.test(query);

}

export function splitTemplateQuery(query) {
    const splitPattern = /\{[^\{\}]*\}|\{\/.*\/\}/g;
    let split;

    if (isContainsBraces(query)) {
        const result = query.match(splitPattern);
        split = _.map(result, (part) => {
            return _.trim(part, '{}').split(',');
        });
    } else {
        split = query.split(',');
    }

    return split;
}

export function resolveMetricQueries(query) {
    const queries: any[] = [];
    const splitPattern = /\([^\()\)]*\)|\(\/.*\/\)/g;
    if (isContainsParenthesis(query)) {
        const matches = query.match(splitPattern);
        matches.forEach((element) => {
            const allPatterns = new RegExp(element, 'g');
            const possibleElements = element.match(allPatterns);
            possibleElements.forEach((possibleElement) => {
                // MATTHIAS HUBER: we do not know why parenthesis needs to be removed. Maybe AppDynamics REST Calls in
                // earlier versions did not work. We have to keep them for metrics like 'Average Response Time (ms)'
                // queries.push(query.replace(element, possibleElement));
                // TEMPORARY FIX: we simply don't remove the parenthesis. Refactoring maybe in the future.
                queries.push(query);
            });

        });

    } else {
        return [query];
    }
    return queries;
}

export function getFirstTemplated(query) {

    const allTemplated = splitTemplateQuery(query);
    const splitPattern = /\{[^\{\}]*\}|\{\/.*\/\}/g;
    if (isContainsBraces(query)) {
        const matches = query.match(splitPattern);
        for (let i = 0; i < matches.length; i++) {
            query = query.replace(matches[i], allTemplated[i][0]);
        }
    }
    return query;
}
