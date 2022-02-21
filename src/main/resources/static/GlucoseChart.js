const MAX_GLUCOSE = 9.5;
const MIN_GLUCOSE = 4.5;

const GLUCOSE_RANGE_COLOR = 'rgba(75,192,77,0.2)';
const GLUCOSE_RANGE_BORDER_COLOR = 'rgb(159,204,161)';
const GLUCOSE_RANGE_BORDER_WIDTH = 1;

const config = {
    type: 'line',
    options: {
        responsive: true,
        plugins: {
            annotation: {
                annotations: {
                    box1: {
                        type: 'box',
                        yMin: MIN_GLUCOSE,
                        yMax: MAX_GLUCOSE,
                        backgroundColor: GLUCOSE_RANGE_COLOR,
                        borderColor: GLUCOSE_RANGE_BORDER_COLOR,
                        borderWidth: GLUCOSE_RANGE_BORDER_WIDTH
                    }
                }
            }
            // title: {
            //     text: 'Chart.js Time Scale',
            //     display: true
            // },
            // legend: {
            //     position: 'top',
            // },
        },
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