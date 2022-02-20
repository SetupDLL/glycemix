class GlucoseRepository {

    findOnDate(date, dataSetName, primary) {
        let from = date.startOf('day').toSeconds();
        return fetch(`/entries/date/${from}`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                return new GlucoseDataSet(dataSetName, data.map(e => new GlucoseEntry(e.date, e.glucose)), primary);
            });
    }

    findToday() {
        return this.findOnDate(DateTime.now(), 'Today', true);
    }

    findYesterday() {
        return this.findOnDate(DateTime.now().minus({days: 1}), 'Yesterday', false);
    }

    getLastId() {
        return fetch(`/entries/lastId`)
            .then((response) => {
                return response.json();
            });
    }
}