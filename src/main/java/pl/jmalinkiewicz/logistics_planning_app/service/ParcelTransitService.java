package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
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

    public Transit createTransitAndAssignParcels(Transit newTransit) {
        final Transit savedTransit = transitRepository.save(newTransit);

        List<Parcel> unassignedParcels = parcelService.findUnassignedParcelsForRoute(
                savedTransit.getStartLocation(),
                savedTransit.getEndLocation()
        );

        List<Parcel> assignedParcels = new ArrayList<>();

        for (Parcel parcel : unassignedParcels) {

            if (simulationService.checkIfParcelFits(parcel, assignedParcels, savedTransit)) {

                parcel.setTransit(savedTransit);
                parcel.setStatus(ParcelStatus.scheduled);
                assignedParcels.add(parcel);
                parcelRepository.save(parcel);


                savedTransit.setCurrentLoadKg(
                        savedTransit.getCurrentLoadKg() + parcel.getWeightKg()
                );
                savedTransit.setCurrentVolumeM3(
                        savedTransit.getCurrentVolumeM3() + parcel.getVolumeM3()
                );

            }
        }
        return transitRepository.save(savedTransit);
    }
}
