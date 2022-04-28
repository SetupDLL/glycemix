const config = {
    type: 'line',
    options: {
        // responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            annotation: {
                annotations: {
                    box1: {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        yMin: MIN_TARGET_GLUCOSE,
                        yMax: MAX_TARGET_GLUCOSE,
                        backgroundColor: GLUCOSE_RANGE_COLOR,
                        borderColor: GLUCOSE_RANGE_BORDER_COLOR,
                        borderWidth: GLUCOSE_RANGE_BORDER_WIDTH
                    }
                }
            },
            datalabels: {
                color: LABEL_TEXT_COLOR,
                font: {
                    size: 14,
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    return value.glucose;
                },
                align: 'end',
                anchor: 'end'
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    // pan options and/or events
                },
                // mode: 'x',
                limits: {
                    x: {min: START_OF_DAY, max: END_OF_DAY},
                },
            }
        },
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'glucose'
        },
        scales: {
            y: {
                display: false,
                suggestedMin: 2,
                suggestedMax: 20,
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                type: 'time',
                min: START_OF_DAY,
                max: END_OF_DAY,
                time: {
                    tooltipFormat: 'T',
                    // unit: 'hour',
                    // stepSize: 1
                    format: "HH:mm",
                    displayFormats: {
                        minute: 'HH:mm',
                        hour: 'HH:mm'
                    }
                },
                ticks: {
                    major: {
                        enabled: true, // <-- This is the key line
                        fontStyle: 'bold', //You can also style these values differently
                        fontSize: 14 //You can also style these values differently
                    },
                    source: 'data'
                }
            }
        }
    }

};

class GlucoseChart extends Chart {

    constructor(element) {
        super(element, config);
    }

    updateDataSet(dataSet) {
        config.data.datasets = [dataSet];
    }
}

function updateTimeBounds(dataSet) {
    let record = dataSet.data[0];
    if (!record) return;

    let date = DateTime.fromMillis(record.date);
    let x = config.options.scales.x;
    x.min = date.startOf('day').toMillis();
    x.max = date.endOf('day').toMillis();
}