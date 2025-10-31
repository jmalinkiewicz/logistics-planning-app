package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.jmalinkiewicz.logistics_planning_app.model.Location;
import pl.jmalinkiewicz.logistics_planning_app.dto.LocationDTO;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

    LocationDTO toDto(Location entity);
    Location toEntity(LocationDTO dto);
}