# Logistics Planning App

A complete logistics and parcel transport planning system built with Java Spring Boot and React + Three.js.  
It allows users to plan, vizualize, and optimize the transport of parcels between multiple locations with an interactive data manager and 3D vizualization.  

<img width="1920" alt="Logistics Planning App Screenshot" src="https://github.com/user-attachments/assets/4de6a7ea-18be-4ce0-8b33-396567d4a92e" />

---

## Overview

The app is designed to streamline the process of organizing parcel transits between cities.  
It combines backend data handling in Spring Boot with a interactive React frontend that includes a 3D visualization of parcel containers using Three.js.
The backend takes shape, size, volume and weight into account when assigning parcels to transits.

**Real world use case:** 

Consider a retail business with several physical stores:

A customer places an order for an item to be delivered to their nearest store.  
If that store is out of stock, management can create a transit to send the parcel from the warehouse.  
The system automatically assigns the parcel to the first available transit that fits both the route and capacity.

## System logic

The system revolves around three key entities: **Locations**, **Parcels**, and **Transits**.

Users can freely create locations representing real-world cities or hubs (e.g. *London*, *Liverpool*, *Manchester*).  
These locations serve as start and end points for transits and parcels.

Parcels represent individual shipments.  
When a new parcel is created, the user specifies: *start location, end location, dimensions (width, height, depth) and weight*

As soon as a parcel is created, the system checks for any available transits between its start and end locations that still have sufficient space and weight capacity.  
If a suitable transit exists, the parcel is automatically assigned to it.  
If not, the parcel remains unassigned until a suitable transit becomes available.

A transit represents a delivery route between two locations (for example, *London → Liverpool*).  
It includes the following properties: *start location, end location, dimensions (width, height, depth), max weight load, departure date and arrival date*

When a new transit is created, the system automatically looks for all unassigned parcels that match its route and capacity.  
Any parcels that fit are assigned to this new transit.

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 3
  - Spring Web  
  - Spring Data JPA (Hibernate)
- Lombok   
- PostgreSQL

### Frontend
- React (Vite)
- TypeScript
- Three.js — 3D container visualization

### Deployment
- Docker

