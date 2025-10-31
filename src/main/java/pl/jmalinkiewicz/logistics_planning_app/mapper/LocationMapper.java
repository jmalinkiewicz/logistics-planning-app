package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationDTO toDto(Location entity);
    Location toEntity(LocationDTO dto);
}