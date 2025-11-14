package pl.jmalinkiewicz.logistics_planning_app.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.*;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TransitService {

    private final TransitRepository transitRepository;
    private final TransitMapper transitMapper;

    public List<TransitResponseDTO> getAllTransits() {
        return transitMapper.toDtoList(transitRepository.findAll());
    }

    public List<Transit> findScheduledTransitsForRoute(final Location start, final Location end) {
        return transitRepository.findByStatusAndStartLocationAndEndLocationOrderByArrivalDateAsc(TransitStatus.scheduled, start, end);
    }
}
