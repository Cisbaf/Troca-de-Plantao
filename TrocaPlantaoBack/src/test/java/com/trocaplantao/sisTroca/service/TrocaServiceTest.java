package com.trocaplantao.sisTroca.service;

import com.trocaplantao.sisTroca.entity.Requerente;
import com.trocaplantao.sisTroca.entity.Troca;
import com.trocaplantao.sisTroca.entity.TrocaRequerente;
import com.trocaplantao.sisTroca.entity.dto.*;
import com.trocaplantao.sisTroca.repository.RequerenteRepository;
import com.trocaplantao.sisTroca.repository.TrocaRepository;
import com.trocaplantao.sisTroca.service.map.TrocaMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TrocaServiceTest {

    @InjectMocks
    private TrocaService trocaService;

    @Mock
    private TrocaRepository trocaRepository;

    @Mock
    private TrocaMapper trocaMapper;

    @Mock
    private RequerenteRepository requerenteRepository;

    @Mock
    private EmailService emailService;

    // --- TESTES DE CREATE TROCA ---

    @Test
    @DisplayName("Deve criar troca com sucesso quando dados e arquivos são válidos")
    void createTroca_Success() throws IOException {
        // Arrange (Preparação)
        TrocaCompletaRequest request = TrocaCompletaRequest.builder()
                .troca(TrocaRequest.builder().unidade("UTI 1").funcaoPlantao("Enfermeiro").build())
                .build();

        MockMultipartFile file1 = new MockMultipartFile("file", "teste.png", "image/png", "img".getBytes());
        List<MultipartFile> files = List.of(file1);

        Requerente req = Requerente.builder().cpf("12345678900").nome("João").build();
        TrocaRequerente tr = TrocaRequerente.builder().requerente(req).build();

        Troca trocaEntity = Troca.builder()
                .id("2024001")
                .participantes(List.of(tr))
                .aceitaSN(AceitaSN.EM_ANALISE)
                .build();
        // Link bidirecional simulado (geralmente feito no mapper)
        tr.setTroca(trocaEntity);

        TrocaResponse responseEsperado = TrocaResponse.builder().id("2024001").aceitaSN(AceitaSN.EM_ANALISE).build();

        // Mocks
        when(trocaMapper.toTrocaEntity(any(), any(), any())).thenReturn(trocaEntity);
        when(requerenteRepository.existsById("12345678900")).thenReturn(false); // Simula que requerente não existe
        when(trocaRepository.save(any(Troca.class))).thenReturn(trocaEntity);
        when(trocaMapper.toTrocaResponse(any(Troca.class))).thenReturn(responseEsperado);

        // Act (Ação)
        TrocaResponse result = trocaService.createTroca(request, files, files);

        // Assert (Verificação)
        assertNotNull(result);
        assertEquals("2024001", result.id());

        // Verifica se salvou o requerente (pois o mock disse que não existia)
        verify(requerenteRepository, times(1)).save(req);
        // Verifica se salvou a troca
        verify(trocaRepository, times(1)).save(trocaEntity);
        // Verifica se enviou email
        verify(emailService, times(1)).enviarEmailsTroca(trocaEntity);
    }

    @Test
    @DisplayName("Deve lançar erro ao enviar mais de 2 arquivos")
    void createTroca_TooManyFiles() {
        TrocaCompletaRequest request = TrocaCompletaRequest.builder().build();
        MockMultipartFile file = new MockMultipartFile("file", "teste.png", "image/png", "bytes".getBytes());
        List<MultipartFile> threeFiles = List.of(file, file, file);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            trocaService.createTroca(request, threeFiles, List.of(file));
        });

        assertEquals("Máximo de 2 arquivos permitidos", exception.getMessage());
        verifyNoInteractions(trocaRepository);
    }

    @Test
    @DisplayName("Deve lançar erro ao enviar extensão de arquivo inválida")
    void createTroca_InvalidExtension() {
        TrocaCompletaRequest request = TrocaCompletaRequest.builder().build();
        // Arquivo PDF (não permitido)
        MockMultipartFile file = new MockMultipartFile("file", "teste.pdf", "application/pdf", "bytes".getBytes());
        List<MultipartFile> files = List.of(file);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            trocaService.createTroca(request, files, files);
        });

        assertEquals("Somente imagens JPG ou PNG são permitidas", exception.getMessage());
    }

    // --- TESTES DE FINALIZE TROCA ---

    @Test
    @DisplayName("Deve finalizar troca com sucesso")
    void finalizeTroca_Success() {
        String id = "123";
        String nomeInspetor = "Carlos Silva";

        Troca trocaMock = Troca.builder()
                .id(id)
                .trocaEmAnalise(true)
                .aceitaSN(AceitaSN.EM_ANALISE)
                .build();

        when(trocaRepository.findById(id)).thenReturn(Optional.of(trocaMock));

        trocaService.finalizeTroca(id, "ACEITO", nomeInspetor, "Bluble");

        // Verifica alterações no objeto
        assertFalse(trocaMock.isTrocaEmAnalise());
        assertEquals(AceitaSN.ACEITO, trocaMock.getAceitaSN());
        assertEquals(nomeInspetor, trocaMock.getNomeInspetor());
        assertNotNull(trocaMock.getFinalizadaEm());

        // Verifica persistência e envio de email
        verify(trocaRepository).save(trocaMock);
        verify(emailService).enviarEmailFinalizacao(trocaMock);
    }

    @Test
    @DisplayName("Deve falhar se nome do inspetor for curto")
    void finalizeTroca_ShortInspectorName() {
        String id = "123";
        Troca trocaMock = Troca.builder().id(id).build();

        when(trocaRepository.findById(id)).thenReturn(Optional.of(trocaMock));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            trocaService.finalizeTroca(id, "ACEITO", "Ed", "Bluble"); // Nome curto
        });

        assertEquals("Nome do inspetor deve ter 3 caracteres", exception.getMessage());
        verify(trocaRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve lançar erro se troca não encontrada ao finalizar")
    void finalizeTroca_NotFound() {
        when(trocaRepository.findById("999")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            trocaService.finalizeTroca("999", "ACEITO", "Inspetor", "Bluble");
        });
    }

    // --- TESTES DE GET ---

    @Test
    @DisplayName("Deve buscar troca por ID")
    void getById_Success() {
        Troca troca = Troca.builder().id("1").build();
        TrocaResponse response = TrocaResponse.builder().id("1").build();

        when(trocaRepository.findById("1")).thenReturn(Optional.of(troca));
        when(trocaMapper.toTrocaResponse(troca)).thenReturn(response);

        TrocaResponse result = trocaService.getById("1");

        assertEquals("1", result.id());
    }

    @Test
    @DisplayName("Deve retornar erro se ID não existe")
    void getById_NotFound() {
        when(trocaRepository.findById("1")).thenReturn(Optional.empty());

        Exception ex = assertThrows(RuntimeException.class, () -> trocaService.getById("1"));
        assertEquals("Troca not found", ex.getMessage());
    }

    @Test
    @DisplayName("Deve buscar todas as trocas")
    void getAll_Success() {
        when(trocaRepository.findAll()).thenReturn(List.of(Troca.builder().build()));
        when(trocaMapper.toTrocaResponse(any())).thenReturn(TrocaResponse.builder().build());

        List<TrocaResponse> result = trocaService.getAll();

        assertEquals(1, result.size());
    }

    // --- TESTE DE REMOVER ANTIGAS ---

    @Test
    @DisplayName("Deve chamar repositório com data correta para limpeza")
    void removerTrocasAntigas_Test() throws IOException {
        // Mockando retorno vazio para não entrar no loop de deletar arquivos físicos (difícil em teste unitário)
        when(trocaRepository.findTrocasParaLimpeza(any(LocalDateTime.class)))
                .thenReturn(Collections.emptyList());

        trocaService.removerTrocasAntigas();

        // Verifica se chamou o método do repositório
        verify(trocaRepository).findTrocasParaLimpeza(any(LocalDateTime.class));
    }
}