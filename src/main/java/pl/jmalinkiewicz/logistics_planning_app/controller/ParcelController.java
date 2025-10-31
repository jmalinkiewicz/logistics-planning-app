package pl.jmalinkiewicz.logistics_planning_app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/parcels")
public class ParcelController {

    private final ParcelService parcelService;

    @PostMapping
    public ResponseEntity<Parcel> createParcel(@RequestBody Parcel parcel) {
        Parcel saved = parcelService.createParcel(parcel);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<ParcelDTO>> getAllParcels() {
        List<ParcelDTO> parcels = parcelService.getAllParcelsDto();
        return ResponseEntity.ok(parcels);
    }
}
