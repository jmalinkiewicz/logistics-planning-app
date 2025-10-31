package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;

@Mapper(componentModel = "spring")
public interface TransitMapper {

    TransitMapper INSTANCE = Mappers.getMapper(TransitMapper.class);

    TransitDTO toDto(Transit entity);
    Transit toEntity(TransitDTO dto);
}
