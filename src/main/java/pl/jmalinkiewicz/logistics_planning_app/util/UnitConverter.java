package pl.jmalinkiewicz.logistics_planning_app.util;

import org.springframework.stereotype.Component;

@Component
public class UnitConverter {
    public int metersToMillimeters(Double meters) {
        return meters == null ? 0 : (int) Math.ceil(meters * 1000);
    }
    public int kilogramsToGrams(Double kilos) {
        return kilos == null ? 0 : (int) Math.ceil(kilos * 1000);
    }
}
