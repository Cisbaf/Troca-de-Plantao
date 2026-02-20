package com.trocaplantao.sisTroca.entity.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record TrocaRequest(
        @NotBlank
        String funcaoPlantao,
        @NotBlank
        String unidade
) {
}
