/**
 * vmstatly (https://github.com/jsargiot/vmstatly)
 * @license MIT License
 */
var vmstatly = vmstatly || {};

(function() {
    'use strict';

    var stats = {
        'r': 0,
        'b': 1,
        'swpd': 2,
        'free': 3,
        'buff': 4,
        'cache': 5,
        'si': 6,
        'so': 7,
        'bi': 8,
        'bo': 9,
        'in': 10,
        'cs': 11,
        'us': 12,
        'sy': 13,
        'id': 14,
        'wa': 15
    }

    vmstatly = {
        parse: function(value) {
            var timeseries = {}, counter = 0;
            var lines = value.split("\n");

            for (var lineno in lines) {
                var line = lines[lineno];
                // Ignore empty lines and header lines
                if (!line.startsWith('procs') && !line.startsWith(' r') && line.length > 0) {
                    // Collect all stats from this line
                    var line_values = line.trim().split(/ +/);
                    for (var stat in stats) {
                        // If stat wasn't in the timeseries object, add it
                        if (!(stat in timeseries)) {
                            timeseries[stat] = [];
                        }
                        // Take the component of the stat
                        var stat_value = line_values[stats[stat]];
                        timeseries[stat].push([counter, parseInt(stat_value)]);
                    }
                    counter = counter + 1;
                }
            }
            return timeseries;
        },

        readFile: function(file) {
            var reader = new FileReader();
            reader.onload = function(evt){
                var content = evt.target.result;
                var timeseries = vmstatly.parse(content);

                vmstatly.charts.process('proc-stats', 'Processes Stats', '', 'Processes', ' procs', timeseries);
                vmstatly.charts.memory('mem-stats', 'Memory Stats', '', 'Kb', ' kb', timeseries);
                vmstatly.charts.swap('swap-stats', 'Swap Stats', '', 'Blocks', ' blocks/s', timeseries);
                vmstatly.charts.io('io-stats', 'IO Stats', '', 'Blocks', ' blocks', timeseries);
                vmstatly.charts.system('sys-stats', 'System Stats', '', 'X', ' x/s', timeseries);
                vmstatly.charts.cpu('cpu-stats', 'CPU Stats', '', '%', ' %', timeseries);

                document.getElementById('GraphsContainer').style.display = "";
            };
            reader.readAsBinaryString(file);
        }
    };
})();