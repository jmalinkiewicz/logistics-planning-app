package pl.jmalinkiewicz.logistics_planning_app.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.*;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransitServiceTest {

    @InjectMocks
    TransitService transitService;

    @Mock
    TransitRepository transitRepository;

    @Mock
    TransitMapper transitMapper;

    @Test
    @DisplayName("findScheduledTransitsForRoute should return a list of scheduled transits for given route.")
    void findScheduledTransitsForRoute_shouldReturnScheduledTransitsForRoute() {
        Location start = new Location();
        start.setCity("Berlin");
        Location end = new Location();
        end.setCity("Warsaw");

        Transit transit1 = new Transit();
        Transit transit2 = new Transit();
        List<Transit> mockParcels = List.of(transit1, transit2);

        when(transitRepository.findByStatusAndStartLocationAndEndLocationOrderByArrivalDateAsc(
                TransitStatus.scheduled, start, end
        )).thenReturn(mockParcels);

        List<Transit> result = transitService.findScheduledTransitsForRoute(start, end);

        assertEquals(2, result.size());
        assertTrue(result.contains(transit1));
        assertTrue(result.contains(transit2));
        verify(transitRepository, times(1)).findByStatusAndStartLocationAndEndLocationOrderByArrivalDateAsc(
                TransitStatus.scheduled, start, end
        );
    }

    @Test
    @DisplayName("getAllTransits should return a list of all transits DTOs.")
    void getAllTransits_shouldReturnAllTransitDTOs() {
        Transit transit1 = new Transit();
        Transit transit2 = new Transit();

        List<Transit> mockTransits = List.of(transit1, transit2);

        TransitResponseDTO dto1 = new TransitResponseDTO();
        TransitResponseDTO dto2 = new TransitResponseDTO();

        when(transitRepository.findAll()).thenReturn(mockTransits);
        when(transitMapper.toDtoList(mockTransits)).thenReturn(List.of(dto1, dto2));

        List<TransitResponseDTO> result = transitService.getAllTransits();

        assertEquals(2, result.size());
        assertTrue(result.contains(dto1));
        assertTrue(result.contains(dto2));
        verify(transitRepository, times(1)).findAll();
        verify(transitMapper, times(1)).toDtoList(mockTransits);
    }


}
