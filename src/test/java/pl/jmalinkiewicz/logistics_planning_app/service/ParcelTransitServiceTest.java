package pl.jmalinkiewicz.logistics_planning_app.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.ParcelStatus;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.repository.LocationRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.ParcelRepository;
import pl.jmalinkiewicz.logistics_planning_app.repository.TransitRepository;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ParcelTransitServiceTest {
    @InjectMocks ParcelTransitService parcelTransitService;

    @Mock
    ParcelService parcelService;

    @Mock
    ParcelMapper parcelMapper;

    @Mock
    TransitService transitService;

    @Mock
    ParcelRepository parcelRepository;

    @Mock
    SimulationService simulationService;

    @Mock
    TransitRepository transitRepository;

    @Mock
    TransitMapper transitMapper;

    @Mock
    LocationRepository locationRepository;

    @Test
    @DisplayName("createAndAssignParcel should assign parcel to first fitting scheduled transit")
    void createAndAssignParcel_assignsParcelToTransit() {
        Location start = new Location();
        start.setId(1);
        start.setCity("Berlin");

        Location end = new Location();
        end.setId(2);
        end.setCity("Warsaw");

        ParcelRequestDTO request = new ParcelRequestDTO();
        request.setStartLocationId(1);
        request.setEndLocationId(2);
        request.setWeightKg(100.0);
        request.setWidthM(1.0);
        request.setHeightM(1.0);
        request.setDepthM(1.0);

        Parcel parcel = new Parcel();
        parcel.setId(10);
        parcel.setStartLocation(start);
        parcel.setEndLocation(end);
        parcel.setWeightKg(100.0);
        parcel.setWidthM(1.0);
        parcel.setHeightM(1.0);
        parcel.setDepthM(1.0);

        Transit transit = new Transit();
        transit.setId(5);
        transit.setStartLocation(start);
        transit.setEndLocation(end);
        transit.setCurrentLoadKg(0.0);
        transit.setCurrentVolumeM3(0.0);

        ParcelResponseDTO dto = new ParcelResponseDTO();
        dto.setTransitId(5);
        dto.setWeightKg(100.0);
        dto.setVolumeM3(1.0);

        when(parcelMapper.toEntity(request)).thenReturn(parcel);
        when(transitService.findScheduledTransitsForRoute(start, end))
                .thenReturn(List.of(transit));
        when(parcelRepository.findByTransitId(5))
                .thenReturn(Collections.emptyList());
        when(simulationService.checkIfParcelFits(parcel, Collections.emptyList(), transit))
                .thenReturn(true);
        
        when(parcelRepository.save(parcel)).thenReturn(parcel);
        
        when(parcelMapper.toDto(parcel)).thenReturn(dto);

        ParcelResponseDTO result = parcelTransitService.createAndAssignParcel(request);

        assertEquals(5L, result.getTransitId());
        assertEquals(100.0, transit.getCurrentLoadKg());
        assertEquals(1.0, transit.getCurrentVolumeM3());
        assertEquals(ParcelStatus.scheduled, parcel.getStatus());
        assertEquals(transit, parcel.getTransit());

        verify(parcelRepository).save(parcel);
    }

    @DisplayName("createTransitAndAssignParcels should assign only fitting parcels and update transit load/volume")
    @Test
    void createTransitAndAssignParcels_assignsFittingParcels() {
        TransitRequestDTO request = new TransitRequestDTO();
        request.setStartLocationId(1);
        request.setEndLocationId(2);
        request.setMaxLoadKg(500.0);
        request.setWidthM(10.0);
        request.setHeightM(10.0);
        request.setDepthM(10.0);
        LocalDateTime departure = LocalDateTime.of(2025, 3, 1, 10, 0);
        LocalDateTime arrival   = LocalDateTime.of(2025, 3, 2, 18, 0);
        request.setDepartureDate(departure);
        request.setArrivalDate(arrival);

        Location start = new Location();
        start.setId(1);
        start.setCity("Berlin");

        Location end = new Location();
        end.setId(2);
        end.setCity("Warsaw");

        Transit transit = new Transit();
        transit.setId(100);
        transit.setMaxLoadKg(500.0);
        transit.setCurrentLoadKg(0.0);
        transit.setCurrentVolumeM3(0.0);
        transit.setWidthM(10.0);
        transit.setHeightM(10.0);
        transit.setDepthM(10.0);

        Parcel parcel1 = new Parcel();
        parcel1.setId(10);
        parcel1.setWeightKg(100.0);
        parcel1.setWidthM(1.0);
        parcel1.setHeightM(1.0);
        parcel1.setDepthM(1.0);

        Parcel parcel2 = new Parcel();
        parcel2.setId(11);
        parcel2.setWeightKg(600.0);
        parcel2.setWidthM(1.0);
        parcel2.setHeightM(1.0);
        parcel2.setDepthM(1.0);

        List<Parcel> unassigned = List.of(parcel1, parcel2);

        TransitResponseDTO responseDto = new TransitResponseDTO();

        when(locationRepository.findById((long) 1)).thenReturn(Optional.of(start));
        when(locationRepository.findById((long) 2)).thenReturn(Optional.of(end));

        when(transitMapper.toEntity(request)).thenReturn(transit);
        when(parcelService.findUnassignedParcelsForRoute(start, end)).thenReturn(unassigned);

        when(simulationService.checkIfParcelFits(eq(parcel1), anyList(), eq(transit))).thenReturn(true);
        when(simulationService.checkIfParcelFits(eq(parcel2), anyList(), eq(transit))).thenReturn(false);

        when(parcelRepository.save(any(Parcel.class))).thenAnswer(inv -> inv.getArgument(0));
        when(transitRepository.save(any(Transit.class))).thenAnswer(inv -> inv.getArgument(0));

        when(transitMapper.toDto(transit)).thenReturn(responseDto);

        TransitResponseDTO result = parcelTransitService.createTransitAndAssignParcels(request);



        verify(transitRepository, times(2)).save(transit);

        assertEquals(transit, parcel1.getTransit());
        assertEquals(ParcelStatus.scheduled, parcel1.getStatus());

        assertNull(parcel2.getTransit());

        assertEquals(100, transit.getCurrentLoadKg());
        assertEquals(1.0, transit.getCurrentVolumeM3());

        verify(parcelRepository, times(1)).save(parcel1);
        verify(parcelRepository, never()).save(parcel2);
        
        verify(transitMapper).toDto(transit);

        assertSame(responseDto, result);
    }

}
