package pl.jmalinkiewicz.logistics_planning_app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.mapper.TransitMapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.service.ParcelTransitService;
import pl.jmalinkiewicz.logistics_planning_app.service.TransitService;

import java.util.List;

@RestController
@RequestMapping("/transits")
@RequiredArgsConstructor
public class TransitController {

    private final TransitService transitService;
    private final ParcelTransitService parcelTransitService;
    private final TransitMapper transitMapper;

    @PostMapping
    public ResponseEntity<TransitResponseDTO> createTransit(@RequestBody TransitRequestDTO transit) {
        Transit saved = parcelTransitService.createTransitAndAssignParcels(transit);
        return ResponseEntity.ok(transitMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<TransitResponseDTO>> getAllTransits() {
        List<TransitResponseDTO> transits = transitService.getAllTransitsDto();
        return ResponseEntity.ok(transits);
    }
}