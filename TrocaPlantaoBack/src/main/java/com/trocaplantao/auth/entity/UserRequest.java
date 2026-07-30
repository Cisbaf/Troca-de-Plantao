package com.trocaplantao.auth.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record UserRequest(
        @NotBlank
        String username,
        @NotBlank
        String password,
        @Email @NotBlank
        String email,
        @NotBlank
        String name
) {
}
