package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    List<LocationDTO> toDtoList(List<Location> entities);
    LocationDTO toDto(Location entity);
    Location toEntity(LocationDTO dto);
}