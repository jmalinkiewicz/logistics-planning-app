package pl.jmalinkiewicz.logistics_planning_app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.ParcelMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelService;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelTransitService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/parcels")
public class ParcelController {

    private final ParcelService parcelService;
    private final ParcelTransitService parcelTransitService;
    private final ParcelMapper parcelMapper;

    @PostMapping
    public ResponseEntity<ParcelResponseDTO> createParcel(@RequestBody ParcelRequestDTO parcel) {
        Parcel saved = parcelTransitService.createAndAssignParcel(parcel);
        return ResponseEntity.ok(parcelMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<ParcelResponseDTO>> getAllParcels() {
        List<ParcelResponseDTO> parcels = parcelService.getAllParcelsDto();
        return ResponseEntity.ok(parcels);
    }
}
