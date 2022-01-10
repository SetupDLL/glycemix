const MG_DL_IN_MMOL_L = 18.018;

class GlucoseEntry {

    constructor(date, glucose) {
        this.date = transformDate(date * 1000);
        this.glucose = glucose;
    }
}

function transformDate(date) {
    let time = new Date(date);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return new Date(1970, 1, 1, hours, minutes, seconds).getTime();
}