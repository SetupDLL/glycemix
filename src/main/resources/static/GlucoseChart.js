const config = {
    type: 'line',
    options: {
        responsive: true,
        // plugins: {
        //     title: {
        //         text: 'Chart.js Time Scale',
        //         display: true
        //     },
        //     legend: {
        //         position: 'top',
        //     },
        // },
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'glucose'
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    // Luxon format string
                    tooltipFormat: 'T'
                }
            }
        }
    }

};

class GlucoseChart extends Chart {

    constructor(element) {
        super(element, config);
    }

    updateDataSets(dataSets) {
        config.data.datasets = dataSets;
    }
}