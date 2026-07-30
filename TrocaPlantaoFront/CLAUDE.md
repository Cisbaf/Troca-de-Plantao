# Contexto do projeto — TrocaPlantaoFront

Stack: Next.js 16 (App Router) + TypeScript + Chakra UI v3 + react-hook-form + lucide-react. Lint/format com Biome. Testes com Jest + Testing Library.

Convenções observadas no código:
- Componentes funcionais com hooks, `'use client'` no topo quando há interatividade.
- Export default para componentes de página/seção (`Header`, `TrocaForm`), named export para componentes de UI reutilizáveis (`CheckModal`).
- Modais via Chakra Dialog: ou o wrapper local em `src/app/components/ui/dialog.tsx` (`DialogRoot`, `DialogContent`, etc.), ou `Dialog.Root/Portal/Content` direto do Chakra — ver `CheckModal.tsx` e `SuccessTrocaModal.tsx` como referência dos dois estilos.
- Modais "burros" recebem `open`/`onOpenChange` (ou `onClose`) e todo estado relevante via props; a lógica de negócio fica em quem chama o modal.
- Formulários com `react-hook-form`: `register` para inputs nativos, `Controller` para componentes controlados (RadioGroup, file input).
- Chamadas a API routes internas do Next (`/api/...`), erros tratados com `toaster.create` (Chakra toaster).
- Máscaras/formatação de campos (CPF, telefone, matrícula) feitas com funções puras (`formatCPF`, `formatTelefone`) chamadas no `onChange`.

## Plano de estudo React em andamento

Andressa está seguindo um plano de estudo de 4 semanas para evoluir lógica de React, criação/importação de componentes e modais/ações. Arquivo completo do plano: ver `plano-estudo-react.md` (compartilhado fora do repo, nos arquivos de trabalho).

Importante: o plano de estudo usa **MUI** nos exemplos (ela prefere MUI a Chakra), não este projeto diretamente — este projeto (TrocaPlantaoFront) continua em Chakra UI v3, isso não muda. Os padrões de lógica (modal burro vs. modal com estado interno, custom hooks para campos mascarados, register vs Controller) são os mesmos princípios vistos aqui em `TrocaForm.tsx`/`CheckModal.tsx`/`SuccessTrocaModal.tsx`, só que os exercícios do plano são escritos com componentes MUI.

Resumo das semanas:
1. Fundamentos (props, useState, useEffect, listas/keys) — revisar quando useEffect é realmente necessário.
2. Importação/organização — default vs named export, custom hooks (ex: unificar campos mascarados tipo `cpfField`/`matriculaField`/`telefoneField` em um hook único).
3. Modais e ações — comparar padrão de modal "burro" controlado por fora vs. modal de feedback simples, construir um `ConfirmDialog` genérico reutilizável com `Dialog` do MUI.
4. Projeto guiado — feature nova completa (form + modal + fetch + snackbar), ex: tela de "Cancelar Troca".

Quando ela pedir ajuda com exercícios de React, priorizar exemplos práticos com componentes MUI (`TextField`, `Dialog`, `Snackbar`) e usar a lógica dos arquivos reais deste projeto (`TrocaForm.tsx`, `CheckModal.tsx`, `SuccessTrocaModal.tsx`, `Header.tsx`) como referência de padrão, mesmo que a lib de UI seja diferente.
