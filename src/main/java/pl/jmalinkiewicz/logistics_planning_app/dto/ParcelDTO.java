package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParcelDTO {

    private Long id;

    private Integer startLocation;
    private Integer endLocation;

    private Double weightKg;

    private Double widthM;
    private Double heightM;
    private Double depthM;

    private Double volumeM3;

    private ParcelStatus status;

    private Long transitId; // only expose transit ID, not full entity

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}