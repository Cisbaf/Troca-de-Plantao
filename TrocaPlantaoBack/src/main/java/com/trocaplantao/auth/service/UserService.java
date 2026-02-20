package com.trocaplantao.auth.service;


import com.trocaplantao.auth.entity.UserEntity;
import com.trocaplantao.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String registerUser(String username, String password, String email, String name) {
        String encodedPassword = passwordEncoder.encode(password);

        return userRepository.save(new UserEntity(username, encodedPassword, email, name)).getUsername();
    }


    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findAll()
                .stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new User(username, user.getPassword(), new java.util.ArrayList<>());
    }

    public boolean validateCredentials(String username) {
        return userRepository.existsByUsername(username);
    }

    public UserEntity getUserByUsernameAndPassword(String username, String password) {
        log.info("Fetching user by username: {} and password: {}", username, password);
        log.info("Encoded password: {}", passwordEncoder.encode(password));
        var user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("Fetched user: {}", user);
        return userRepository.findByUsername(username).get();
    }

    public Map<String, String> getAllEmailsAndUsernames() {
        Map<String, String> result = new java.util.HashMap<>();

        userRepository.findAll()
                .stream()
                .findFirst()
                .ifPresent(user -> result.put(user.getName(), user.getEmail()));

        return result;
    }
}
