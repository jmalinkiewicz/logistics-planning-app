package pl.jmalinkiewicz.logistics_planning_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.LocationMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public List<LocationDTO> getAllLocationsDto() {
        return locationRepository.findAll()
                .stream()
                .map(locationMapper::toDto)
                .toList();
    }
}