package com.example.rewear.service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.example.rewear.dto.*;
import com.example.rewear.entity.User;
import com.example.rewear.repository.UserRepository;
import com.example.rewear.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest req) {

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());
        user.setPhone(req.getPhone());
        user.setPassword(encoder.encode(req.getPassword()));

        repo.save(user);

        return "User Registered Successfully";
    }



    public AuthResponse login(LoginRequest req) {

        User user = repo.findByUsernameOrEmail(req.getUsername(), req.getUsername())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(token);
    }
}