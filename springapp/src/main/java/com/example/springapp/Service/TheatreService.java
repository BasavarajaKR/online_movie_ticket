package com.example.springapp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.Model.Theatre;
import com.example.springapp.Repository.TheatreRepository;

@Service
public class TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }

    public Optional<Theatre> getTheatreById(Long id) {
        return theatreRepository.findById(id);
    }

    public Theatre createTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    public Theatre updateTheatre(Long id, Theatre theatreDetails) {
        Optional<Theatre> optionalTheatre = theatreRepository.findById(id);
        if (optionalTheatre.isPresent()) {
            Theatre theatre = optionalTheatre.get();
            // Update theatre fields here based on your Theatre model
            return theatreRepository.save(theatre);
        }
        return null;
    }

    public void deleteTheatre(Long id) {
        theatreRepository.deleteById(id);
    }
}
