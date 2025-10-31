package pl.jmalinkiewicz.logistics_planning_app.service;

import com.github.skjolber.packing.api.*;
import com.github.skjolber.packing.packer.plain.PlainPackager;
import org.springframework.stereotype.Service;
import pl.jmalinkiewicz.logistics_planning_app.dto.ParcelDTO;
import pl.jmalinkiewicz.logistics_planning_app.dto.TransitDTO;
import pl.jmalinkiewicz.logistics_planning_app.model.Parcel;
import pl.jmalinkiewicz.logistics_planning_app.model.Transit;

import java.util.ArrayList;
import java.util.List;

@Service
public class SimulationService {
    public final boolean checkIfParcelFits(Parcel parcel, List<Parcel> assignedParcels, Transit transit) {
        List<BoxItem> products = new ArrayList<>();

        products.add(
                new BoxItem(Box.newBuilder()
                        .withSize(
                                metersToMillimeters(parcel.getWidthM()),
                                metersToMillimeters(parcel.getDepthM()),
                                metersToMillimeters(parcel.getHeightM())
                        )
                        .withWeight(kilosToGrams(parcel.getWeightKg()))
                        .build()
                )
        );

        for (Parcel assignedParcel : assignedParcels) {
            products.add(
                    new BoxItem(Box.newBuilder()
                            .withSize(
                                    metersToMillimeters(assignedParcel.getWidthM()),
                                    metersToMillimeters(assignedParcel.getDepthM()),
                                    metersToMillimeters(assignedParcel.getHeightM())
                            )
                            .withWeight(kilosToGrams(assignedParcel.getWeightKg()))
                            .build()
                    )
            );
        }

        Container container = Container.newBuilder()
                .withSize(
                        metersToMillimeters(transit.getWidthM()),
                        metersToMillimeters(transit.getDepthM()),
                        metersToMillimeters(transit.getHeightM())
                )
                .withMaxLoadWeight(kilosToGrams(transit.getMaxLoadKg()))
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

    private int metersToMillimeters(Double meters) {
        if (meters == null) return 0;
        return (int) Math.round(meters * 1000);
    }

    private int kilosToGrams(Double kilos) {
        if (kilos == null) return 0;
        return (int) Math.round(kilos * 1000);
    }
}
