package pl.jmalinkiewicz.logistics_planning_app.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TransitService {

    private final TransitRepository transitRepository;
    private final ParcelRepository parcelRepository;
    private final ParcelService parcelService;
    private final SimulationService simulationService;
    private final TransitMapper transitMapper;
    private final ParcelMapper parcelMapper;

    public List<TransitDTO> getAllTransitsDto() {
        return transitRepository.findAll()
                .stream()
                .map(transitMapper::toDto)
                .toList();
    }

    public List<Transit> getAllTransits() {
        return transitRepository.findAll();
    }

    public Transit createTransitAndAssignParcels(Transit newTransit) {
        final Transit savedTransit = transitRepository.save(newTransit);
        final TransitDTO transitDto = transitMapper.toDto(savedTransit);

        List<Parcel> unassignedParcels = parcelService.findUnassignedParcelsForRoute(
                savedTransit.getStartLocation(),
                savedTransit.getEndLocation()
        );

        List<ParcelDTO> assignedParcels = new ArrayList<>();

        for (Parcel parcel : unassignedParcels) {
            ParcelDTO parcelDto = parcelMapper.toDto(parcel);

            if (simulationService.checkIfParcelFits(parcelDto, assignedParcels, transitDto)) {

                parcel.setTransit(savedTransit);
                parcel.setStatus(ParcelStatus.scheduled);
                assignedParcels.add(parcelDto);
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
