package gm.pichugin.inrangerback;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/today")
    public Iterable<GlucoseRecord> getToday() {
        return glucoseService.getToday();
    }

    @GetMapping("/yesterday")
    public Iterable<GlucoseRecord> getYesterday() {
        return glucoseService.getYesterday();
    }

    private List<GlucoseRecord> getForDate(LocalDate date) {
        return glucoseService.getForDate(date);
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
