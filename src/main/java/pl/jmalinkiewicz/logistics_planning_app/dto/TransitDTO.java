package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.TransitStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransitDTO {
    private Long id;

    private LocationDTO startLocation;
    private LocationDTO endLocation;

    private Double maxLoadKg;

    private Double widthM;
    private Double heightM;
    private Double depthM;

    private Double currentLoadKg;
    private Double currentVolumeM3;

    private Double maxVolumeM3;

    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;

    private TransitStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
