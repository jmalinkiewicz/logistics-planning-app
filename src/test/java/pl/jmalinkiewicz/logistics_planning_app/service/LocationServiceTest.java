package pl.jmalinkiewicz.logistics_planning_app.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations.*;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.LocationMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LocationServiceTest {

    @InjectMocks
    LocationService locationService;

    @Mock
    LocationRepository locationRepository;

    @Mock
    LocationMapper locationMapper;

    @Test
    @DisplayName("createLocation should save and return entity when valid input.")
    void createLocation_shouldSaveAndReturn() {
        String city = "Berlin";

        LocationDTO dto = new LocationDTO();
        dto.setCity(city);

        Location entity = new Location();
        entity.setCity(city);

        when(locationMapper.toEntity(dto)).thenReturn(entity);
        when(locationRepository.save(entity)).thenReturn(entity);

        Location result = locationService.createLocation(dto);

        assertEquals(city, result.getCity());
        verify(locationMapper, times(1)).toEntity(dto);
        verify(locationRepository, times(1)).save(entity);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("createLocation should throw when city is null or blank.")
    void createLocation_shouldThrowWhenCityIsNullOrBlank(String city) {
        LocationDTO dto = new LocationDTO();
        dto.setCity(city);

        assertThrows(NullPointerException.class,
                () -> locationService.createLocation(dto));
    }

    @Test
    @DisplayName("getAllLocations should return a list of all locations.")
    void getAllLocations_shouldReturnListOfAllLocations() {
        Location loc1 = new Location();
        loc1.setCity("Berlin");
        Location loc2 = new Location();
        loc2.setCity("Warsaw");
        Location loc3 = new Location();
        loc3.setCity("London");

        List<Location> entities = List.of(loc1, loc2, loc3);

        LocationDTO dto1 = new LocationDTO();
        dto1.setCity("Berlin");
        LocationDTO dto2 = new LocationDTO();
        dto2.setCity("Warsaw");
        LocationDTO dto3 = new LocationDTO();
        dto3.setCity("London");

        when(locationRepository.findAll()).thenReturn(entities);
        when(locationMapper.toDtoList(entities)).thenReturn(List.of(dto1, dto2, dto3));

        List<LocationDTO> result = locationService.getAllLocations();

        assertEquals(3, result.size());
        assertTrue(result.stream().anyMatch(dto -> dto.getCity().equals("Berlin")));
        assertTrue(result.stream().anyMatch(dto -> dto.getCity().equals("Warsaw")));
        assertTrue(result.stream().anyMatch(dto -> dto.getCity().equals("London")));

        verify(locationRepository, times(1)).findAll();
        verify(locationMapper, times(1)).toDtoList(entities);
    }

    @Test
    @DisplayName("getAllLocations should return empty list when no locations exist")
    void getAllLocations_shouldReturnEmptyList() {
        when(locationRepository.findAll()).thenReturn(List.of());
        when(locationMapper.toDtoList(List.of())).thenReturn(List.of());

        List<LocationDTO> result = locationService.getAllLocations();

        assertTrue(result.isEmpty());
        verify(locationRepository, times(1)).findAll();
    }
}
