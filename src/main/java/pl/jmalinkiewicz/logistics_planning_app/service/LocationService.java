package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.LocationMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;
import pl.jmalinkiewicz.logistics_planning_app.util.ValidationUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public Location createLocation(LocationDTO location) {
        ValidationUtils.validateLocation(location);
        return locationRepository.save(locationMapper.toEntity(location));
    }

    public List<LocationDTO> getAllLocations() {
        return locationMapper.toDtoList(locationRepository.findAll());
    }
}