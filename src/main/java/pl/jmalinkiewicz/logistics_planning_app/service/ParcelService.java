package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;
    private final ParcelMapper parcelMapper;

    public List<Parcel> findUnassignedParcelsForRoute(final Integer start, final Integer end) {
        return parcelRepository.findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        );
    }

    public List<ParcelDTO> findUnassignedParcelsForRouteDto(final Integer start, final Integer end) {
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

    public List<ParcelDTO> getAllParcelsDto() {
        return parcelRepository.findAll()
                .stream()
                .map(parcelMapper::toDto)
                .toList();
    }

    public Parcel createParcel(final Parcel parcel) {
        return parcelRepository.save(parcel);
    }
}