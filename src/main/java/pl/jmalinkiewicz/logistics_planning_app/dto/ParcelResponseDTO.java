package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParcelResponseDTO {

    private int id;

    private LocationDTO startLocation;
    private LocationDTO endLocation;

    private Double weightKg;

    private Double widthM;
    private Double heightM;
    private Double depthM;

    private Double volumeM3;

    private ParcelStatus status;

    private int transitId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}