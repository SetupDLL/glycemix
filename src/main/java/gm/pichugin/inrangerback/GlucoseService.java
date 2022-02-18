package gm.pichugin.inrangerback;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.TimeZone;

@Component
public record GlucoseService(GlucoseRecordRepository glucoseRecordRepository) {

    public List<GlucoseRecord> getForDate(LocalDate date, TimeZone timezone) {
        final LocalDateTime startOfDay = date.atStartOfDay();
        final LocalDateTime startOfNextDay = date.plusDays(1).atStartOfDay();

        final int offset = timezone.getOffset(startOfDay.toEpochSecond(ZoneOffset.UTC)) / 1000;
        return glucoseRecordRepository.findByTimeBetweenOrderByTime(
                startOfDay.toEpochSecond(ZoneOffset.UTC) - offset,
                startOfNextDay.toEpochSecond(ZoneOffset.UTC) - offset - 1
        );
    }

    public Iterable<GlucoseRecord> getToday(TimeZone timezone) {
        return getForDate(LocalDate.now(timezone.toZoneId()), timezone);
    }

    public Iterable<GlucoseRecord> getYesterday(TimeZone timezone) {
        return getForDate(LocalDate.now(timezone.toZoneId()).minusDays(1), timezone);
    }

}
