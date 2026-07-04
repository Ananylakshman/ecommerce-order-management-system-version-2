package com.example.demo.config;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Seeds a single default ADMIN account on startup (only if one doesn't already exist)
 * so the app is immediately usable end-to-end without manually editing MongoDB.
 *
 * Default admin login:
 *   email:    admin@shop.com
 *   password: Admin@123
 *
 * Change the password after first login in a real deployment.
 */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@shop.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setRole("ADMIN");

                userRepository.save(admin);

                System.out.println("Seeded default admin account -> " + adminEmail + " / Admin@123");
            }
        };
    }
}
