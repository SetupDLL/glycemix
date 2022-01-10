package gm.pichugin.inrangerback;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
public record GlucoseService(GlucoseRecordRepository glucoseRecordRepository) {

    public List<GlucoseRecord> getForDate(LocalDate date) {
        final LocalDateTime startOfDay = date.atStartOfDay();
        final LocalDateTime startOfNextDay = date.plusDays(1).atStartOfDay();

        return glucoseRecordRepository.findByTimeBetweenOrderByTime(
                startOfDay.toEpochSecond(ZoneOffset.UTC),
                startOfNextDay.toEpochSecond(ZoneOffset.UTC)
        );
    }

    public Iterable<GlucoseRecord> getToday() {
        return getForDate(LocalDate.now());
    }

    public Iterable<GlucoseRecord> getYesterday() {
        return getForDate(LocalDate.now().minusDays(1));
    }

}
