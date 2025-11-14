package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;
import pl.jmalinkiewicz.logistics_planning_app.util.ValidationUtils;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ParcelTransitService {

    private final TransitService transitService;
    private final SimulationService simulationService;
    private final ParcelService parcelService;
    private final ParcelRepository parcelRepository;
    private final TransitRepository transitRepository;
    private final TransitMapper transitMapper;
    private final ParcelMapper parcelMapper;
    private final LocationRepository locationRepository;

    public ParcelResponseDTO createAndAssignParcel(final ParcelRequestDTO newParcel) {
        ValidationUtils.validateParcelRequest(newParcel);

        Parcel parcel = parcelMapper.toEntity(newParcel);

        List<Transit> transits = transitService.findScheduledTransitsForRoute(parcel.getStartLocation(), parcel.getEndLocation());

        for (Transit transit : transits) {
            List<Parcel> parcels = parcelRepository.findByTransitId(transit.getId());

            if (simulationService.checkIfParcelFits(parcel, parcels, transit)) {
                transit.setCurrentLoadKg(transit.getCurrentLoadKg() + parcel.getWeightKg());
                transit.setCurrentVolumeM3(transit.getCurrentVolumeM3() + parcel.getVolumeM3());
                parcel.setStatus(ParcelStatus.scheduled);
                parcel.setTransit(transit);

                break;
            }
        }

        return parcelMapper.toDto(parcelRepository.save(parcel));
    }

    public TransitResponseDTO createTransitAndAssignParcels(TransitRequestDTO newTransit) {
        ValidationUtils.validateTransitRequest(newTransit);

        Location start = locationRepository.findById((long) newTransit.getStartLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid startLocationId"));
        Location end = locationRepository.findById((long) newTransit.getEndLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid endLocationId"));

        final Transit transit = transitMapper.toEntity(newTransit);

        transitRepository.save(transit);

        transit.setStartLocation(start);
        transit.setEndLocation(end);
        
        List<Parcel> unassignedParcels = parcelService.findUnassignedParcelsForRoute(
                transit.getStartLocation(),
                transit.getEndLocation()
        );

        List<Parcel> assignedParcels = new ArrayList<>(unassignedParcels.size());

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

                if (Objects.equals(transit.getCurrentVolumeM3(), transit.getMaxVolumeM3()) || Objects.equals(transit.getCurrentLoadKg(), transit.getMaxLoadKg())) {
                    break;
                }

            }
        }
        return transitMapper.toDto(transitRepository.save(transit));
    }
}
