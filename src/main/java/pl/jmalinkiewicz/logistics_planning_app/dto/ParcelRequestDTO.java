package pl.jmalinkiewicz.logistics_planning_app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParcelRequestDTO {

    private int startLocationId;
    private int endLocationId;

    private Double weightKg;

    private Double widthM;
    private Double heightM;
    private Double depthM;

    private Double volumeM3;

    private ParcelStatus status;

    private int transitId;
}