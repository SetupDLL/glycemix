class GlucoseDataSet {

    constructor(data) {
        this.borderColor = LINE_COLOR;
        this.cubicInterpolationMode = 'monotone';
        this.data = data;
        this.pointRadius = 6;
        this.pointHoverRadius = 6;
        this.pointBorderWidth = 3;
        this.pointHoverBorderWidth = 5;
        this.pointBackgroundColor = POINT_BACKGROUND_COLOR;
        this.pointBorderColor = POINT_BORDER_COLOR;
        this.borderWidth = BORDER_WIDTH;
    }
}