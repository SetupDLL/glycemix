package gm.pichugin.inrangerback;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Instant;

@Getter
@Setter
@Entity
public class GlucoseRecord {

    @Id
    private short id;
    private Instant date;
    private float glucose;

    public GlucoseRecord() {
    }
}
