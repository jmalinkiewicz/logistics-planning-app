package pl.jmalinkiewicz.logistics_planning_app.mapper;

import org.mapstruct.Mapper;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;

@Mapper(componentModel = "spring")
public interface ParcelMapper {
    ParcelDTO toDto(Parcel entity);
    Parcel toEntity(ParcelDTO dto);
}
