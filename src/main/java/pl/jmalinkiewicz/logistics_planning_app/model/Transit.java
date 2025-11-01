package pl.jmalinkiewicz.logistics_planning_app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "transits")
public class Transit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NonNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "start_location", referencedColumnName = "id")
    private Location startLocation;

    @NonNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "end_location", referencedColumnName = "id")
    private Location endLocation;

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

    @CreationTimestamp
    @NonNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @UpdateTimestamp
    @NonNull
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "transit")
    private List<Parcel> parcels = new ArrayList<>();

    public Transit() {}

    public Double getMaxVolumeM3() {
        return this.widthM * this.heightM * this.depthM;
    }
}
