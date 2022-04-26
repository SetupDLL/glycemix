package gm.pichugin.inrangerback;

import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("entries")
public class EntriesController {

    private final GlucoseRecordRepository glucoseRecordRepository;
    private final GlucoseService glucoseService;

    public EntriesController(GlucoseRecordRepository glucoseRecordRepository, GlucoseService glucoseService) {
        this.glucoseRecordRepository = glucoseRecordRepository;
        this.glucoseService = glucoseService;
    }

    @GetMapping("/")
    public Iterable<GlucoseRecord> findAll() {
        return glucoseRecordRepository.findAll();
    }

    @GetMapping("/date/{timestamp}")
    public Iterable<GlucoseRecord> findOnDate(@PathVariable Long timestamp) {
        final Instant from = Instant.ofEpochSecond(timestamp);
        final Instant to = from.plus(1, ChronoUnit.DAYS).minusNanos(1);
        return glucoseRecordRepository.findByDateBetweenOrderByDate(from, to);
    }

    @GetMapping("/find")
    public List<GlucoseRecord> findBetween(@RequestParam Long from, @RequestParam Long to) {
        return glucoseRecordRepository.findByDateBetweenOrderByDate(
                Instant.ofEpochSecond(from), Instant.ofEpochSecond(to)
        );
    }

    @GetMapping("/lastId")
    public Short getLastId() {
        final GlucoseRecord last = glucoseRecordRepository.findTopByOrderByIdDesc();
        return last != null ? last.getId() : -1;
    }

    @PostMapping
    public Short saveEntry(@RequestBody GlucoseRecord record) {
        return glucoseRecordRepository.save(record).getId();
    }

    @PostMapping("/list")
    public List<Short> saveEntries(@RequestBody List<GlucoseRecord> records) {
        return StreamSupport.stream(glucoseRecordRepository.saveAll(records).spliterator(), false)
                .map(GlucoseRecord::getId)
                .collect(Collectors.toList());
    }
}
