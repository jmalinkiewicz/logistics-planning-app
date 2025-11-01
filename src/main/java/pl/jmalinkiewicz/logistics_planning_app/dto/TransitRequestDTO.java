package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransitRequestDTO {
    private int startLocationId;
    private int endLocationId;
    private Double maxLoadKg;
    private Double widthM;
    private Double heightM;
    private Double depthM;
    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;
}