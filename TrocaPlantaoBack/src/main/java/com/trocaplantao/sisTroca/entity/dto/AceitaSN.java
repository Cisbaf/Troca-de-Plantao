package com.trocaplantao.sisTroca.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum AceitaSN {
    ACEITO("Aceita"),
    RECUSADO("Recusada"),
    EM_ANALISE("EM_ANALISE");
    private final String status;
    AceitaSN(String status) {
        this.status = status;
    }

}
