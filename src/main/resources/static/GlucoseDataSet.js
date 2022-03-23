class GlucoseDataSet {

    width;
    height;
    gradient;
    primary;

    constructor(name, data, primary) {
        this.label = name;
        this.primary = primary;
        this.cubicInterpolationMode = 'monotone';
        this.data = data;
        this.borderWidth = BORDER_WIDTH;
    }

    updateGradient() {
        if (this.primary) {
            this.borderColor = context => {
                const chart = context.chart;
                if (!chart.chartArea) {
                    return;
                }
                return this.getGradient(chart);
            };
        }
    }

    getGradient(chart) {
        const {ctx, chartArea} = chart;

        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!this.gradient || this.width !== chartWidth || this.height !== chartHeight) {
            this.width = chartWidth;
            this.height = chartHeight;

            let axis = chart.scales.y;
            if (!axis.height) {
                return;
            }
            this.gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            applyColors(this.gradient, axis.min, axis.max);
        }

        return this.gradient;
    }
}

function applyColors(gradient, min, max) {
    let range = max - min;
    let midTarget = MAX_TARGET_GLUCOSE - MIN_TARGET_GLUCOSE;
    let midOffset = midTarget / range;
    let maxOffset = 1 - (max - MAX_TARGET_GLUCOSE) / range;
    if (min < MIN_TARGET_GLUCOSE) {
        if (max < MIN_TARGET_GLUCOSE) {
            gradient.addColorStop(1, LOW_COLOR);
        } else {
            let minOffset = (MIN_TARGET_GLUCOSE - min) / range;
            gradient.addColorStop(minOffset, LOW_COLOR);
            gradient.addColorStop(minOffset, MID_COLOR);
            if (max > MAX_TARGET_GLUCOSE) {
                gradient.addColorStop(maxOffset, MID_COLOR);
                gradient.addColorStop(maxOffset, HIGH_COLOR);
            }
        }
    } else {
        if (min > MAX_TARGET_GLUCOSE) {
            gradient.addColorStop(0, HIGH_COLOR);
        } else {
            gradient.addColorStop(0, MID_COLOR);
            if (max > MAX_TARGET_GLUCOSE) {
                gradient.addColorStop(maxOffset, MID_COLOR);
                gradient.addColorStop(maxOffset, HIGH_COLOR);
            } else {
                gradient.addColorStop(0, MID_COLOR);
            }
        }
    }

    // if (max > MAX_TARGET_GLUCOSE) {
    //     if (min < MAX_TARGET_GLUCOSE) {
    //         gradient.addColorStop(1 - (max - MAX_TARGET_GLUCOSE) / range, CHART_COLORS.red);
    //     }
    //     let maxOffset = min < MAX_TARGET_GLUCOSE ? 1 - (max - MAX_TARGET_GLUCOSE) / range : 1;
    // } else if (max > MIN_TARGET_GLUCOSE) {
    //     gradient.addColorStop(1, CHART_COLORS.green);
    // }
    // let midOffset = midTarget < range ? midTarget / range : 0;
    // gradient.addColorStop(midOffset, CHART_COLORS.green);
}