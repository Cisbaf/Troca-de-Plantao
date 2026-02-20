package com.trocaplantao.sisTroca.controller;

import com.trocaplantao.sisTroca.entity.dto.TrocaCompletaRequest;
import com.trocaplantao.sisTroca.entity.dto.TrocaResponse;
import com.trocaplantao.sisTroca.service.TrocaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/trocas")
@RequiredArgsConstructor
public class TrocaController {
    private final TrocaService trocaService;

    @GetMapping()
    public ResponseEntity<List<TrocaResponse>> getAll() {
        return ResponseEntity.ok(trocaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrocaResponse> getById(@PathVariable String id) {
        var troca  = trocaService.getById(id);
        if (troca == null || troca.unidade() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(troca);
    }

    @GetMapping("requerente/{cpf}")
    public ResponseEntity<?> getRequerenteByCpf(@PathVariable String cpf) {
        var requerente = trocaService.getRequerenteByCpf(cpf);
        if (requerente == null || requerente.cpf() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(requerente);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrocaResponse> create(
            @RequestPart("dados") @Valid TrocaCompletaRequest dados,
            @RequestPart(value = "pri_file", required = false) List<MultipartFile> pri_file,
            @RequestPart(value = "sec_file", required = false) List<MultipartFile> sec_file
    ) {
        if (dados == null || dados.getTroca() == null || dados.getPri_requerente() == null || dados.getSec_requerente() == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(trocaService.createTroca(dados, pri_file, sec_file));

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        trocaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/finalizar/{id}")
    public ResponseEntity<Void> finalizeTroca(@PathVariable String id, @RequestParam(name = "aceitoSN") String aceitoSN,
                                              @RequestParam(name = "nomeInspector") String nomeInspector, @RequestParam(name = "motivoTroca") String motivoTroca) {
        trocaService.finalizeTroca(id, aceitoSN, nomeInspector, motivoTroca);
        return ResponseEntity.ok().build();
    }

}
