package gm.pichugin.inrangerback;

import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.List;

public interface GlucoseRecordRepository extends CrudRepository<GlucoseRecord, Short> {
    GlucoseRecord findTopByOrderByIdDesc();
    List<GlucoseRecord> findByDateBetweenOrderByDate(Instant from, Instant to);
}
