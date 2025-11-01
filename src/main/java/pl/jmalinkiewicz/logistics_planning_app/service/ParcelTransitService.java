package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;


import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcelTransitService {

    private final TransitService transitService;
    private final SimulationService simulationService;
    private final ParcelService parcelService;
    private final ParcelRepository parcelRepository;
    private final TransitRepository transitRepository;
    private final TransitMapper transitMapper;
    private final LocationRepository locationRepository;

    public Parcel createAndAssignParcel(final Parcel parcel) {
        List<Transit> transits = transitService.findTransitsForRoute(parcel.getStartLocation(), parcel.getEndLocation());

        for (Transit transit : transits) {
            List<Parcel> parcels = transit.getParcels();

            if (simulationService.checkIfParcelFits(parcel, parcels, transit)) {
                transit.setCurrentLoadKg(transit.getCurrentLoadKg() + parcel.getWeightKg());
                transit.setCurrentVolumeM3(transit.getCurrentVolumeM3() + parcel.getVolumeM3());
                parcel.setStatus(ParcelStatus.scheduled);

                break;
            }
        }

        return parcelRepository.save(parcel);
    }

    public TransitResponseDTO createTransitAndAssignParcels(TransitRequestDTO newTransit) {

        System.out.println(newTransit);

        final Transit transit = transitMapper.toEntity(newTransit);

        System.out.println(transit);

        Location start = (Location) locationRepository.findById((long) newTransit.getStartLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid startLocationId"));
        Location end = (Location) locationRepository.findById((long) newTransit.getEndLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid endLocationId"));

        transit.setStartLocation(start);
        transit.setEndLocation(end);
        
        List<Parcel> unassignedParcels = parcelService.findUnassignedParcelsForRoute(
                transit.getStartLocation(),
                transit.getEndLocation()
        );

        List<Parcel> assignedParcels = new ArrayList<>();

        for (Parcel parcel : unassignedParcels) {

            if (simulationService.checkIfParcelFits(parcel, assignedParcels, transit)) {

                parcel.setTransit(transit);
                parcel.setStatus(ParcelStatus.scheduled);
                assignedParcels.add(parcel);
                parcelRepository.save(parcel);


                transit.setCurrentLoadKg(
                        transit.getCurrentLoadKg() + parcel.getWeightKg()
                );
                transit.setCurrentVolumeM3(
                        transit.getCurrentVolumeM3() + parcel.getVolumeM3()
                );

            }
        }
        return transitMapper.toDto(transitRepository.save(transit));
    }
}
