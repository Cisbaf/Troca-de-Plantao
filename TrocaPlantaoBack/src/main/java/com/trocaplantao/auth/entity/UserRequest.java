package com.trocaplantao.auth.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.aspectj.weaver.ast.Not;

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
