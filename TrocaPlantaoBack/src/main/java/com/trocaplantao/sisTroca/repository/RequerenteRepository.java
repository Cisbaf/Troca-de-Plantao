package com.trocaplantao.sisTroca.repository;

import com.trocaplantao.sisTroca.entity.Requerente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RequerenteRepository extends JpaRepository<Requerente, String> {
    Optional<Requerente> findRequerenteByCpf(String cpf);

}
