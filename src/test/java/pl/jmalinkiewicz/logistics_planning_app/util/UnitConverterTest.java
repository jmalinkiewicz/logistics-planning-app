package pl.jmalinkiewicz.logistics_planning_app.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UnitConverterTest {
    private final UnitConverter converter = new UnitConverter();

    @Test
    @DisplayName("Meters to millimeters should convert correctly.")
    void metersToMillimeters_shouldConvertCorrectly() {
        assertEquals(1000, converter.metersToMillimeters(1.0));
        assertEquals(1235, converter.metersToMillimeters(1.2346));
        assertEquals(0, converter.metersToMillimeters(0.0));
    }

    @Test
    @DisplayName("Meters to millimeters should always ceil.")
    void metersToMillimeters_shouldAlwaysRoundUp() {
        assertEquals(1001, converter.metersToMillimeters(1.0001));
        assertEquals(1235, converter.metersToMillimeters(1.235));
        assertEquals(92, converter.metersToMillimeters(0.0911));
    }

    @Test
    @DisplayName("Meters to millimeters should return 0 for null.")
    void metersToMillimeters_shouldReturnZeroForNull() {
        assertEquals(0, converter.metersToMillimeters(null));
    }

    @Test
    @DisplayName("Kilograms to grams should convert correctly.")
    void kilogramsToGrams_shouldConvertCorrectly() {
        assertEquals(1000, converter.kilogramsToGrams(1.0));
        assertEquals(1550, converter.kilogramsToGrams(1.55));
        assertEquals(0, converter.kilogramsToGrams(0.0));
    }

    @Test
    @DisplayName("Meters to millimeters should always ceil.")
    void kilogramsToGrams_shouldAlwaysRoundUp() {
        assertEquals(1001, converter.kilogramsToGrams(1.0001));
        assertEquals(1235, converter.kilogramsToGrams(1.235));
        assertEquals(92, converter.kilogramsToGrams(0.0911));
    }

    @Test
    @DisplayName("Kilograms to grams should return 0 for null.")
    void kilogramsToGrams_shouldReturnZeroForNull() {
        assertEquals(0, converter.kilogramsToGrams(null));
    }


}
