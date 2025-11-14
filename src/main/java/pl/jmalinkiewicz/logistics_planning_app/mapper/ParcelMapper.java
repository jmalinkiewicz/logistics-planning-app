package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParcelMapper {
    List<ParcelResponseDTO> toDtoList(List<Parcel> entities);

    @Mapping(target = "transitId", source = "transit.id")
    ParcelResponseDTO toDto(Parcel entity);

    @Mapping(target = "status", constant = "unassigned")
    @Mapping(target = "startLocation", source = "startLocationId", qualifiedByName = "mapIdToLocation")
    @Mapping(target = "endLocation", source = "endLocationId", qualifiedByName = "mapIdToLocation")
    Parcel toEntity(ParcelRequestDTO dto);

    @Named("mapIdToLocation")
    default Location mapIdToLocation(Integer id) {
        if (id == null) return null;
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
