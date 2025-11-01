package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;
    private final ParcelMapper parcelMapper;

    public List<Parcel> findUnassignedParcelsForRoute(final Location start, final Location end) {
        return parcelRepository.findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        );
    }

    public List<ParcelResponseDTO> findUnassignedParcelsForRouteDto(final Location start, final Location end) {
        return parcelRepository.findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        )
                .stream()
                .map(parcelMapper::toDto)
                .toList();
    }

    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    public List<ParcelResponseDTO> getAllParcelsDto() {
        return parcelRepository.findAll()
                .stream()
                .map(parcelMapper::toDto)
                .toList();
    }

    public Parcel createParcel(final Parcel parcel) {
        return parcelRepository.save(parcel);
    }

}