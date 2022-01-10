class GlucoseRepository {

    findToday() {
        return fetch(`/entries/today`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                return new GlucoseDataSet('Today', data.map(e => new GlucoseEntry(e.time, e.glucose)), true);
            });
    }

    findYesterday() {
        return fetch(`/entries/yesterday`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                return new GlucoseDataSet('Yesterday', data.map(e => new GlucoseEntry(e.time, e.glucose)), false);
            });
    }

    findByDay(date, dataSetName, primary) {
        let start = date.startOf('day').toMillis() - 1 + 420;
        let end = date.endOf('day').toMillis() + 1 + 420;
        return fetch(`?find[date][$gte]=${start}&find[date][$lte]=${end}&count=100`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                return new GlucoseDataSet(dataSetName, data.map(e => new GlucoseEntry(e.date, e.mbg)), primary);
            });
    }
}