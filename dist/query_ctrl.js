"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("app/plugins/sdk");
class AppDynamicsQueryCtrl extends sdk_1.QueryCtrl {
    constructor($scope, $injector, $q, uiSegmentSrv, templateSrv) {
        super($scope, $injector);
        this.$q = $q;
        this.uiSegmentSrv = uiSegmentSrv;
        this.templateSrv = templateSrv;
        this.metricSegmentValueChanged = (metricSegment, segmentIndex) => {
            // If the user is editing a Folder segment, we delete the ones after it. Unless the user typed a '*'
            if (segmentIndex < this.metricSegments.length - 1 && metricSegment.value !== '*') {
                this.metricSegments.length = segmentIndex + 1;
            }
            // Only add a new one if it is the last and it is not a Leaf and not a '*'.
            if (segmentIndex === this.metricSegments.length - 1 && metricSegment.expandable && metricSegment.value !== '*') {
                this.metricSegments.push(this.uiSegmentSrv.newSelectMetric());
            }
            // If this is a Leaf, we don't need the segments after it.
            if (segmentIndex < this.metricSegments.length - 1 && !metricSegment.expandable) {
                this.metricSegments.length = segmentIndex + 1;
            }
            this.target.metric = this.metricSegments.map((segment) => segment.value).join('|');
            this.panelCtrl.refresh();
        };
        this.uiSegmentSrv = uiSegmentSrv;
        this.appD = this.datasource.appD;
        if (this.target) {
            this.parseTarget();
        }
        this.getApplicationNames = (query) => {
            return this.appD.getApplicationNames(query)
                .then(this.transformToSegments(false));
        };
        this.getMetricNames = (index) => {
            return this.appD.getMetricNames(this.target.application, this.getSegmentPathUpTo(index))
                .then(this.transformToSegments(false));
        };
    }
    parseTarget() {
        this.metricSegments = [];
        this.target.transformLegendText = '1';
        this.applicationSegment = this.uiSegmentSrv.newSegment(this.target.application || 'Application');
        if (this.target.metric) {
            this.target.metric.split('|').forEach((element, index, arr) => {
                let expandable = true;
                if (index === arr.length - 1) {
                    expandable = false;
                }
                const newSegment = this.uiSegmentSrv.newSegment({ value: element, expandable });
                this.metricSegments.push(newSegment);
            });
        }
        else {
            this.metricSegments = [this.uiSegmentSrv.newSelectMetric()];
        }
    }
    getSegmentPathUpTo(index) {
        const arr = this.metricSegments.slice(0, index);
        let segments = '';
        arr.forEach((element) => {
            segments += element.value + '|';
        });
        return segments;
    }
    appChanged() {
        this.target.application = this.applicationSegment.value;
        this.panelCtrl.refresh();
    }
    toggleEditorMode() {
        this.target.rawQuery = !this.target.rawQuery;
        if (!this.target.rawQuery) {
            // refresh target metric from segments (we discard the changes done in raw query mode)
            this.target.metric = this.metricSegments.map((segment) => segment.value).join('|');
            this.panelCtrl.refresh();
        }
    }
    onChangeInternal() {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
    transformToSegments(addTemplateVars) {
        return (results) => {
            const segments = results.map((segment) => {
                return this.uiSegmentSrv.newSegment({ value: segment.name, expandable: segment.type === 'folder' });
            });
            return segments;
        };
    }
}
AppDynamicsQueryCtrl.templateUrl = 'partials/query.editor.html';
exports.AppDynamicsQueryCtrl = AppDynamicsQueryCtrl;
