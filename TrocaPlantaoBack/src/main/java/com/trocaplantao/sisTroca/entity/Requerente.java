package com.trocaplantao.sisTroca.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Requerente {
    @Id
    private String cpf;
    private String matricula;
    private String nome;
    private String sobrenome;
    private String telefone;
    private String email;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "requerente", fetch = FetchType.LAZY)
    private List<TrocaRequerente> participacoes = new ArrayList<>();
}
