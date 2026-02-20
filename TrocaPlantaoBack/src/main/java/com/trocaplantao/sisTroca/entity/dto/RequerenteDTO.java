package com.trocaplantao.sisTroca.entity.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record RequerenteDTO(
        String cpf,
        String matricula,
        String nome,
        String sobrenome,
        String telefone,
        String email,
        LocalDate dataTroca,
        LocalTime horarioTrocaInit,
        LocalTime horarioTrocaEnd,
        List<ImagemDTO> imagens
) {
}
