package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitRequestDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitResponseDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransitMapper {
    TransitResponseDTO toDto(Transit entity);

    List<TransitResponseDTO> toDtoList(List<Transit> entities);

    @Mapping(target = "startLocation", source = "startLocationId", qualifiedByName = "mapIdToLocation")
    @Mapping(target = "endLocation", source = "endLocationId", qualifiedByName = "mapIdToLocation")
    Transit toEntity(TransitRequestDTO dto);

    @Named("mapIdToLocation")
    default Location mapIdToLocation(Integer id) {
        if (id == null) return null;
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
