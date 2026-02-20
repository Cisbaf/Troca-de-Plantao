package com.trocaplantao.sisTroca.service.map;

import com.trocaplantao.sisTroca.entity.Requerente;
import com.trocaplantao.sisTroca.entity.TrocaRequerente;
import com.trocaplantao.sisTroca.entity.dto.ImagemDTO;
import com.trocaplantao.sisTroca.entity.dto.RequerenteDTO;
import com.trocaplantao.sisTroca.entity.dto.RequerentePessoaDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class RequerenteMapper {

    public static RequerenteDTO fromParticipacao(TrocaRequerente part) {
        if (part == null || part.getRequerente() == null) return null;

        Requerente r = part.getRequerente();

        return RequerenteDTO.builder()
                .cpf(r.getCpf())
                .matricula(r.getMatricula())
                .nome(r.getNome())
                .sobrenome(r.getSobrenome())
                .email(r.getEmail())
                .telefone(r.getTelefone())

                // vem da participação
                .dataTroca(part.getDataTroca())
                .horarioTrocaInit(part.getHorarioTrocaInit())
                .horarioTrocaEnd(part.getHorarioTrocaEnd())

                // vêm da participação
                .imagens(
                        part.getImagens() == null ? List.of() :
                                part.getImagens().stream()
                                        .map(img -> new ImagemDTO(
                                                img.getId(),
                                                img.getNomeArquivo(),
                                                img.getTipo()
                                        ))
                                        .toList()
                )
                .build();
    }
    public static RequerentePessoaDTO toPessoaDTO(Requerente r) {
        if (r == null) return null;

        return RequerentePessoaDTO.builder()
                .cpf(r.getCpf())
                .matricula(r.getMatricula())
                .nome(r.getNome())
                .sobrenome(r.getSobrenome())
                .telefone(r.getTelefone())
                .email(r.getEmail())
                .build();
    }
}
