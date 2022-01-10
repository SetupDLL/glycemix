package gm.pichugin.inrangerback;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class GlucoseRecord {

    @Id
    private short id;
//    private LocalDateTime date;
    private long time;
    private int timeOffset;
    private float glucose;

    public GlucoseRecord() {
    }
}
