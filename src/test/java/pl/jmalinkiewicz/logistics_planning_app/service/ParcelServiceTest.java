package pl.jmalinkiewicz.logistics_planning_app.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ParcelServiceTest {

    @InjectMocks
    ParcelService parcelService;

    @Mock
    ParcelRepository parcelRepository;

    @Mock
    ParcelMapper parcelMapper;

    @Test
    @DisplayName("findUnassignedParcelsForRoute should return unassigned parcels for given route.")
    void findUnassignedParcelsForRoute_shouldReturnUnassignedParcels() {
        Location start = new Location();
        start.setCity("Berlin");
        Location end = new Location();
        end.setCity("Warsaw");

        Parcel parcel1 = new Parcel();
        Parcel parcel2 = new Parcel();
        List<Parcel> mockParcels = List.of(parcel1, parcel2);

        when(parcelRepository.findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        )).thenReturn(mockParcels);

        List<Parcel> result = parcelService.findUnassignedParcelsForRoute(start, end);

        assertEquals(2, result.size());
        assertTrue(result.contains(parcel1));
        assertTrue(result.contains(parcel2));
        verify(parcelRepository, times(1)).findByStatusAndStartLocationAndEndLocationOrderByCreatedAtAsc(
                ParcelStatus.unassigned, start, end
        );
    }

    @Test
    @DisplayName("getAllParcels should return a list of all parcels as DTOs.")
    void getAllParcels_shouldReturnAllParcelDTOs() {
        Parcel parcel1 = new Parcel();
        Parcel parcel2 = new Parcel();
        List<Parcel> mockParcels = List.of(parcel1, parcel2);

        ParcelResponseDTO dto1 = new ParcelResponseDTO();
        ParcelResponseDTO dto2 = new ParcelResponseDTO();
        List<ParcelResponseDTO> dtoList = List.of(dto1, dto2);

        when(parcelRepository.findAll()).thenReturn(mockParcels);
        when(parcelMapper.toDtoList(mockParcels)).thenReturn(dtoList);

        List<ParcelResponseDTO> result = parcelService.getAllParcels();

        assertEquals(2, result.size());
        assertTrue(result.contains(dto1));
        assertTrue(result.contains(dto2));
        verify(parcelRepository, times(1)).findAll();
        verify(parcelMapper, times(1)).toDtoList(mockParcels);
    }

    @Test
    @DisplayName("getAllLocations should return empty list when no locations exist.")
    void getAllLocations_shouldReturnEmptyList() {
        when(parcelRepository.findAll()).thenReturn(List.of());
        when(parcelMapper.toDtoList(List.of())).thenReturn(List.of());

        List<ParcelResponseDTO> result = parcelService.getAllParcels();

        assertTrue(result.isEmpty());
        verify(parcelRepository, times(1)).findAll();
    }
}
