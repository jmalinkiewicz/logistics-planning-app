package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;

    public List<Parcel> findUnassignedParcelsForRoute(final Integer start, final Integer end) {
        return parcelRepository.findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        );
    }

    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    public Parcel createParcel(final Parcel parcel) {
        return parcelRepository.save(parcel);
    }
}