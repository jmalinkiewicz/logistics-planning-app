package pl.jmalinkiewicz.logistics_planning_app.service;

import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;

import java.util.List;

@Service
public class SimulationService {
    public final boolean checkIfParcelFits(Parcel parcel, List<Parcel> assignedParcels, Transit transit) {
        // TODO: implement volume calculation for transit load
        return true;
    }
}
