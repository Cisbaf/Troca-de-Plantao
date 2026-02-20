package com.trocaplantao.sisTroca.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrocaCompletaRequest {
    @NotNull
    private TrocaRequest troca;
    @NotNull
    private RequerenteDTO pri_requerente;
    @NotNull
    private RequerenteDTO sec_requerente;
}
