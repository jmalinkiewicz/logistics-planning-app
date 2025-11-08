package pl.jmalinkiewicz.logistics_planning_app.service;

import com.github.skjolber.packing.api.*;
import com.github.skjolber.packing.packer.plain.PlainPackager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;
import pl.jmalinkiewicz.logistics_planning_app.util.UnitConverter;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SimulationService {

    private final UnitConverter unitConverter;

    public final boolean checkIfParcelFits(Parcel parcel, List<Parcel> assignedParcels, Transit transit) {
        List<BoxItem> products = new ArrayList<>();

        products.add(
                new BoxItem(Box.newBuilder()
                        .withSize(
                                unitConverter.metersToMillimeters(parcel.getWidthM()),
                                unitConverter.metersToMillimeters(parcel.getDepthM()),
                                unitConverter.metersToMillimeters(parcel.getHeightM())
                        )
                        .withWeight(unitConverter.kilogramsToGrams(parcel.getWeightKg()))
                        .build()
                )
        );

        for (Parcel assignedParcel : assignedParcels) {
            products.add(
                    new BoxItem(Box.newBuilder()
                            .withSize(
                                    unitConverter.metersToMillimeters(assignedParcel.getWidthM()),
                                    unitConverter.metersToMillimeters(assignedParcel.getDepthM()),
                                    unitConverter.metersToMillimeters(assignedParcel.getHeightM())
                            )
                            .withWeight(unitConverter.kilogramsToGrams(assignedParcel.getWeightKg()))
                            .build()
                    )
            );
        }

        Container container = Container.newBuilder()
                .withSize(
                        unitConverter.metersToMillimeters(transit.getWidthM()),
                        unitConverter.metersToMillimeters(transit.getDepthM()),
                        unitConverter.metersToMillimeters(transit.getHeightM())
                )
                .withMaxLoadWeight(unitConverter.kilogramsToGrams(transit.getMaxLoadKg()))
                .build();

        List<ContainerItem> containerItems = ContainerItem
                .newListBuilder()
                .withContainer(container)
                .build();

        PlainPackager packager = PlainPackager
                .newBuilder()
                .build();

        PackagerResult result = packager
                .newResultBuilder()
                .withContainerItems(containerItems)
                .withBoxItems(products)
                .build();

        return result.isSuccess();
    }
}
