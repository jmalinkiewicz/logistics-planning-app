package pl.jmalinkiewicz.logistics_planning_app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.service.TransitService;

import java.util.List;

@RestController
@RequestMapping("/transits")
@RequiredArgsConstructor
public class TransitController {

    private final TransitService transitService;

    @PostMapping
    public ResponseEntity<Transit> createTransit(@RequestBody Transit transit) {
        Transit saved = transitService.createTransitAndAssignParcels(transit);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<TransitDTO>> getAllTransits() {
        List<TransitDTO> transits = transitService.getAllTransitsDto();
        return ResponseEntity.ok(transits);
    }
}