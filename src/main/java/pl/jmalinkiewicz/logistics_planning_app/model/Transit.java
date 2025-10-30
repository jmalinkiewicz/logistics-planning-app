package pl.jmalinkiewicz.logistics_planning_app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transits")
public class Transit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "start_location")
    private Integer startLocation;

    @NonNull
    @Column(name = "end_location")
    private Integer endLocation;

    @NonNull
    @Column(name = "max_load_kg")
    private Double maxLoadKg;

    @NonNull
    @Column(name = "width_m")
    private Double widthM;

    @NonNull
    @Column(name = "height_m")
    private Double heightM;

    @NonNull
    @Column(name = "depth_m")
    private Double depthM;

    @NonNull
    @Column(name = "departure_date")
    private LocalDateTime departureDate;

    @NonNull
    @Column(name = "arrival_date")
    private LocalDateTime arrivalDate;

    @NonNull
    @Column(name = "current_load_kg")
    private Double currentLoadKg = 0.0;

    @NonNull
    @Column(name = "current_volume_m3")
    private Double currentVolumeM3 = 0.0;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "transit_status")
    private TransitStatus status = TransitStatus.scheduled;

    @NonNull
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @NonNull
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Transit() {}

    public Double getMaxVolumeM3() {
        return this.widthM * this.heightM * this.depthM;
    }
}
