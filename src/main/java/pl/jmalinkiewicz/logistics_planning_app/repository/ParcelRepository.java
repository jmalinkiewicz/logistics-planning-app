package pl.jmalinkiewicz.logistics_planning_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;

import java.util.List;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {
    List<Parcel> findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(ParcelStatus status, Integer startLocation, Integer endLocation);
}
