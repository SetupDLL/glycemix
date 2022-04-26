class GlucoseRepository {

    findOnDate(date) {
        let from = date.startOf('day').toSeconds();
        return fetch(`/entries/date/${from}`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                return new GlucoseDataSet(data.map(e => new GlucoseEntry(e.date, e.glucose)));
            });
    }

    getLastId() {
        return fetch(`/entries/lastId`)
            .then((response) => {
                return response.json();
            });
    }
}