package gm.pichugin.inrangerback;

import org.springframework.stereotype.Component;

import java.time.*;
import java.util.List;
import java.util.TimeZone;

@Component
public record GlucoseService(GlucoseRecordRepository glucoseRecordRepository) {

    public List<GlucoseRecord> getForDate(ZonedDateTime date) {
        System.out.println("Client date: " + date);

        final ZonedDateTime startOfDay = date.with(LocalTime.MIN);
        final ZonedDateTime startOfNextDay = startOfDay.plusDays(1).minusNanos(1);
        System.out.println("startOfDay: " + startOfDay);
        System.out.println("startOfNextDay: " + startOfNextDay);

        System.out.println("startOfDay Instant: " + startOfDay.toInstant());
        System.out.println("startOfNextDay Instant: " + startOfNextDay.toInstant());

        return glucoseRecordRepository.findByDateBetweenOrderByDate(startOfDay.toInstant(), startOfNextDay.toInstant());
    }

    public Iterable<GlucoseRecord> getToday(TimeZone timezone) {
        final ZonedDateTime clientDate = ZonedDateTime.now(timezone.toZoneId());
        return getForDate(clientDate);
    }

    public Iterable<GlucoseRecord> getYesterday(TimeZone timezone) {
        final ZonedDateTime clientDate = ZonedDateTime.now(timezone.toZoneId()).minusDays(1);
        return getForDate(clientDate);
    }

}
