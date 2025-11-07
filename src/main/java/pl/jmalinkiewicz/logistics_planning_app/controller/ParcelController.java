package pl.jmalinkiewicz.logistics_planning_app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelService;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelTransitService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/parcels")
public class ParcelController {

    private final ParcelService parcelService;
    private final ParcelTransitService parcelTransitService;

    @PostMapping
    public ResponseEntity<ParcelResponseDTO> createParcel(@RequestBody ParcelRequestDTO parcel) {
        ParcelResponseDTO saved = parcelTransitService.createAndAssignParcel(parcel);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ParcelResponseDTO>> getAllParcels() {
        List<ParcelResponseDTO> parcels = parcelService.getAllParcelsDto();
        return ResponseEntity.ok(parcels);
    }
}
