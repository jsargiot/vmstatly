/**
 * vmstatly (https://github.com/jsargiot/vmstatly)
 * @license MIT License
 */
var vmstatly = vmstatly || {};

(function() {
    'use strict';

    vmstatly.charts = {
        lineChart: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats) {
            // Collect the series to use in the chart
            var series = [];
            for (var i in stats) {
                var stat_name = stats[i];
                series.push({ name: stat_name, data: timeseries[stat_name] });
            }
            // Create chart from info
            return new Highcharts.Chart({
                chart: { renderTo: container },
                title: { text: title },
                xAxis: {
                    title: { text: xTitle },
                    type: 'int'
                },
                yAxis: {
                    title: { text: yTitle },
                    min: 0,
                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null
                },
                tooltip: { valueSuffix: tooltipSuffix },
                series: series
            });
        },

        process: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['r', 'b'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        },

        memory: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['free', 'buff', 'cache'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        },

        swap: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['si', 'so'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        },

        io: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['bi', 'bo'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        },

        system: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['in', 'cs'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        },

        cpu: function (container, title, xTitle, yTitle, tooltipSuffix, timeseries) {
            var stats = ['us', 'sy', 'id', 'wa'];
            return vmstatly.charts.lineChart(container, title, xTitle, yTitle, tooltipSuffix, timeseries, stats);
        }
    };
})();