package gm.pichugin.inrangerback;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public record GlucoseService(GlucoseRecordRepository glucoseRecordRepository) {

    public List<GlucoseRecord> findByPeriod(Instant from, Instant to) {
        return glucoseRecordRepository.findByDateBetweenOrderByDate(from, to);
    }
}
