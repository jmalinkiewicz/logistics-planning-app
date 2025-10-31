package pl.jmalinkiewicz.logistics_planning_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.model.TransitStatus;

import java.util.List;

public interface TransitRepository extends JpaRepository<Transit, Long> {
    List<Transit> findByStatusAndStartLocationAndEndLocationOrderByArrivalDateAsc(TransitStatus status, Integer startLocation, Integer endLocation);
}
