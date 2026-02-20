package com.trocaplantao.sisTroca.entity.dto;

import lombok.Builder;

@Builder
public record RequerentePessoaDTO(
        String cpf,
        String matricula,
        String nome,
        String sobrenome,
        String telefone,
        String email
) {}