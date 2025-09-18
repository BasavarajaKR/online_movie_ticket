package com.example.springapp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.Model.Showtime;
import com.example.springapp.Repository.ShowtimeRepository;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Optional<Showtime> getShowtimeById(Long id) {
        return showtimeRepository.findById(id);
    }

    public Showtime createShowtime(Showtime showtime) {
        return showtimeRepository.save(showtime);
    }

    public Showtime updateShowtime(Long id, Showtime showtimeDetails) {
        Optional<Showtime> optionalShowtime = showtimeRepository.findById(id);
        if (optionalShowtime.isPresent()) {
            Showtime showtime = optionalShowtime.get();
            // Update showtime fields here based on your Showtime model
            return showtimeRepository.save(showtime);
        }
        return null;
    }

    public void deleteShowtime(Long id) {
        showtimeRepository.deleteById(id);
    }
}
