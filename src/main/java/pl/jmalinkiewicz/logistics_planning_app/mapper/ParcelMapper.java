package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;

@Mapper(componentModel = "spring")
public interface ParcelMapper {

    ParcelMapper INSTANCE = Mappers.getMapper(ParcelMapper.class);

    @Mapping(source = "transit.id", target = "transitId")
    ParcelDTO toDto(Parcel entity);

    @Mapping(target = "transit", ignore = true)
    Parcel toEntity(ParcelDTO dto);
}
