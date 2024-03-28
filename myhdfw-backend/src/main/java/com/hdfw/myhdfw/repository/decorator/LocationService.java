package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.model.Location;
import com.hdfw.myhdfw.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location getLocation(Long id) {
        if (id == null) return null;
        return this.locationRepository.findById(id).orElse(null);
    }

    public List<Location> getAll() {
        return locationRepository.findAll();
    }

    public Location createLocation(Location location) {
        if (location == null) return null;
        return locationRepository.save(location);
    }
}
