package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransitResponseDTO {
    private Integer id;
    private LocationDTO startLocation;
    private LocationDTO endLocation;
    private Double maxLoadKg;
    private Double widthM;
    private Double heightM;
    private Double depthM;
    private Double maxVolumeM3;
    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;
    private String status;
}
