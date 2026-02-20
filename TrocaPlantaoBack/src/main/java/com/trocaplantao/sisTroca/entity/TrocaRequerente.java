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
public class TrocaRequerente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataTroca;
    private LocalTime horarioTrocaInit;
    private LocalTime horarioTrocaEnd;

    private String papel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "troca_id", nullable = false)
    private Troca troca;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requerente_cpf", nullable = false)
    private Requerente requerente;

    @OneToMany(mappedBy = "trocaRequerente", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Imagens> imagens = new ArrayList<>();
}
