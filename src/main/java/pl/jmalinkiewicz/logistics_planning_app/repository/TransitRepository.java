package pl.jmalinkiewicz.logistics_planning_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;

public interface TransitRepository extends JpaRepository<Transit, Long> {}
