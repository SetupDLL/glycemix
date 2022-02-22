const config = {
    type: 'line',
    // plugins: [
    //     {
    //         id: 'custom_canvas_background_color',
    //         beforeDraw: (chart) => {
    //             const ctx = chart.canvas.getContext('2d');
    //             ctx.save();
    //             ctx.globalCompositeOperation = 'destination-over';
    //             ctx.fillStyle = BACKGROUND_COLOR;
    //             ctx.fillRect(0, 0, chart.width, chart.height);
    //             ctx.restore();
    //         }
    //     }
    // ],
    options: {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            annotation: {
                annotations: {
                    box1: {
                        type: 'box',
                        yMin: MIN_TARGET_GLUCOSE,
                        yMax: MAX_TARGET_GLUCOSE,
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