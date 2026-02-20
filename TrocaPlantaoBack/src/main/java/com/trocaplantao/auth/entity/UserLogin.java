package com.trocaplantao.auth.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record UserLogin(
        @NotBlank
        String username,
        @NotBlank
        String password
) {
}
