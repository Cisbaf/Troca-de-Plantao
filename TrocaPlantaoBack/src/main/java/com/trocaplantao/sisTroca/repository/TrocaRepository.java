package com.trocaplantao.sisTroca.repository;

import com.trocaplantao.sisTroca.entity.Troca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TrocaRepository extends JpaRepository<Troca, String> {

    @Modifying
    @Query("SELECT t FROM Troca t WHERE t.trocaEmAnalise = false AND t.finalizadaEm <= :limite")
    List<Troca> findTrocasParaLimpeza(@Param("limite") LocalDateTime limite);
}
