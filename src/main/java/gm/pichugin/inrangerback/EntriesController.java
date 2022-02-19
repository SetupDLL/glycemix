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
    public Iterable<GlucoseRecord> getAll() {
        return glucoseRecordRepository.findAll();
    }

    @GetMapping("/date/{unix}")
    public Iterable<GlucoseRecord> getOnDate(@PathVariable Long unix) {
        final Instant from = Instant.ofEpochSecond(unix);
        return glucoseService.findByPeriod(from, from.plus(1, ChronoUnit.DAYS).minusNanos(1));
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
