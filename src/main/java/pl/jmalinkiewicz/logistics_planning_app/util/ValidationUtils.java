package pl.jmalinkiewicz.logistics_planning_app.util;

import com.google.common.base.Preconditions;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;

public class ValidationUtils {
    private ValidationUtils() {}

    public static void validateTransitRequest(TransitRequestDTO dto) {
        Preconditions.checkNotNull(dto, "TransitRequestDTO must not be null");
        Preconditions.checkArgument(dto.getMaxLoadKg() > 0, "maxLoadKg must be positive");
        Preconditions.checkArgument(dto.getWidthM() > 0, "width must be positive");
        Preconditions.checkArgument(dto.getHeightM() > 0, "height must be positive");
        Preconditions.checkArgument(dto.getDepthM() > 0, "depth must be positive");
        Preconditions.checkNotNull(dto.getDepartureDate(), "departureDate must not be null");
        Preconditions.checkNotNull(dto.getArrivalDate(), "arrivalDate must not be null");
        Preconditions.checkArgument(dto.getDepartureDate().isBefore(dto.getArrivalDate()),
                "departureDate must be before arrivalDate");
    }

    public static void validateParcelRequest(ParcelRequestDTO dto) {
        Preconditions.checkNotNull(dto, "ParcelRequestDTO must not be null");
        Preconditions.checkArgument(dto.getWeightKg() > 0, "maxLoadKg must be positive");
        Preconditions.checkArgument(dto.getWidthM() > 0, "width must be positive");
        Preconditions.checkArgument(dto.getHeightM() > 0, "height must be positive");
        Preconditions.checkArgument(dto.getDepthM() > 0, "depth must be positive");
    }

    public static void validateLocation(LocationDTO dto) {
        Preconditions.checkNotNull(dto, "LocationDTO must not be null");
        Preconditions.checkNotNull(dto.getCity(), "city must not be null");
        Preconditions.checkArgument(!dto.getCity().isBlank(), "city must not be blank");
    }
}
