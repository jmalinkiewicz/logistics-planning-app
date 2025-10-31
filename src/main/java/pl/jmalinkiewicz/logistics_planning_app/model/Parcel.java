package pl.jmalinkiewicz.logistics_planning_app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "parcels")
public class Parcel {

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
    @Column(name = "weight_kg")
    private Double weightKg;

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
    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "parcel_status")
    private ParcelStatus status = ParcelStatus.unassigned;

    @ManyToOne
    @JoinColumn(name = "transit_id")
    private Transit transit;

    @NonNull
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @NonNull
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Parcel() {}

    public Double getVolumeM3() { return this.widthM * this.heightM * this.depthM; }
}