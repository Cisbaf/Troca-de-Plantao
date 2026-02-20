'use client';
import React, { useState } from 'react';
import {
    Box,
    Input,
    Button,
    VStack,
    HStack,
    Heading,
    Text,
    Badge,
    Container,
    Card,
    Center,
    Flex,
    Separator,
    SimpleGrid,
    Spinner,
    Field
} from '@chakra-ui/react';

import {
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Calendar,
    Clock,
    MapPin,
    Briefcase,
    Search,
    ArrowRightLeft,
    Hash,
    IdCard,

} from 'lucide-react';

import { toaster } from "@/app/components/ui/toaster";
import Header from '../components/Header';

export default function TrackPage() {
    const [id, setId] = useState('');
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleFetch() {
        if (!id) return toaster.create({ title: 'Informe o ID', type: 'warning', duration: 2000 });
        setLoading(true);
        try {
            const res = await fetch(`/api/trocas/${encodeURIComponent(id)}`);
            if (!res.ok) {
                const t = await res.text();
                throw new Error(t || `Erro ${res.status}`);
            }
            const json = await res.json();
            console.log("Resposta da API:", json);
            setData(json);
            toaster.create({ title: 'Sucesso', description: 'Troca encontrada', type: 'success', duration: 2000 });
        } catch (err: any) {
            toaster.create({ title: 'Erro', description: 'Não encontrado', type: 'error', duration: 2000 });
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    function renderStatusBadge(t: any) {
        const s = t.aceitaSN ?? (t.trocaEmAnalise ?? t.troca?.trocaEmAnalise ? 'EM_ANALISE' : 'FINALIZADA');
        if (s === 'ACEITO') return (
            <Badge bg="green.600" color="white" px={3} py={1} borderRadius="full" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                <CheckCircle size={14} /> ACEITO
            </Badge>
        );
        if (s === 'RECUSADO') return (
            <Badge bg="red.600" color="white" px={3} py={1} borderRadius="full" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                <XCircle size={14} /> RECUSADO
            </Badge>
        );
        if (s === 'EM_ANALISE') return (
            <Badge bg="orange.500" color="white" px={3} py={1} borderRadius="full" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                <AlertCircle size={14} /> EM ANÁLISE
            </Badge>
        );
        return (
            <Badge bg="blue.600" color="white" px={3} py={1} borderRadius="full" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                <CheckCircle size={14} /> FINALIZADA
            </Badge>
        );
    }

    return (
        <>
            <Header />

            <Box bg="gray.100" minH="100vh" py={{ base: 4, md: 16 }}>

                <Container maxW="container.lg" px={{ base: 2, md: 8 }}>
                    <Card.Root
                        variant="elevated"
                        boxShadow="2xl"
                        borderRadius={{ base: "xl", md: "3xl" }}
                        overflow="hidden"
                        border="2px solid"
                        borderColor="gray.300"
                        bg="white"
                    >
                        <Card.Header
                            pt={{ base: 8, md: 12 }}
                            pb={{ base: 10, md: 16 }}
                            px={{ base: 4, md: 8 }}
                            textAlign="center"
                        >
                            <Center>
                                <VStack gap={4} maxW="3xl">
                                    <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="black" letterSpacing="tight">
                                        Acompanhar Troca
                                    </Heading>
                                    <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
                                        Consulte o status e os detalhes da sua solicitação de troca de plantão
                                    </Text>

                                    <Box w="full" maxW="md" mt={4}>
                                        <VStack gap={4}>
                                            <Field.Root required>
                                                <Field.Label fontWeight="bold" color="blue.800">ID DA TROCA</Field.Label>
                                                <Input
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                    placeholder="Digite o ID para buscar..."
                                                    size="lg"
                                                    borderRadius="full"
                                                    bg="gray.50"
                                                    border="2px solid"
                                                    borderColor="gray.200"
                                                    _focus={{ borderColor: "blue.500", bg: "white" }}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleFetch()}
                                                />
                                            </Field.Root>
                                            <Button
                                                onClick={handleFetch}
                                                colorPalette="blue"
                                                size="lg"
                                                borderRadius="full"
                                                w="full"
                                                loading={loading}
                                                fontWeight="black"
                                                boxShadow="lg"
                                            >
                                                <Search size={20} style={{ marginRight: '8px' }} /> BUSCAR AGORA
                                            </Button>
                                        </VStack>
                                    </Box>
                                </VStack>
                            </Center>
                        </Card.Header>

                        <Card.Body p={{ base: 4, md: 10 }} mt={-10} bg="white" borderRadius={{ base: "2xl", md: "4xl" }}>
                            {loading ? (
                                <Center py={20}>
                                    <VStack gap={4}>
                                        <Spinner size="xl" color="blue.800" />
                                        <Text fontWeight="bold" color="blue.800">Buscando informações...</Text>
                                    </VStack>
                                </Center>
                            ) : data ? (
                                <VStack align="stretch" gap={8}>
                                    {/* Cabeçalho do Resultado */}
                                    <Flex flexDir={{ base: "column", md: "row" }} align={{ base: "start", md: "center" }} gap={4} p={6} bg="gray.50" borderRadius="2xl" border="2px solid" borderColor="gray.100">
                                        <VStack align="start" gap={0}>
                                            <Text fontSize="xs" fontWeight="black" color="blue.800" textTransform="uppercase">ID DA TROCA</Text>
                                            <Heading size="md" fontWeight="black" display="flex" alignItems="center" gap={2}>
                                                <Hash size={20} color="blue.800" /> {data.id}
                                            </Heading>
                                        </VStack>
                                        <Box ml={{ md: "auto" }}>
                                            {renderStatusBadge(data)}
                                        </Box>
                                    </Flex>

                                    {/* Detalhes Principais */}
                                    {data.aceitaSN === 'RECUSADO' ? (
                                        <Box display='flex' justifyContent={'center'} textAlign={'center'}>
                                            <VStack bg="white" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100" boxShadow="sm" >
                                                <Center boxSize="40px" bg="red.50" borderRadius="lg" color="red">
                                                    < XCircle size={50} />
                                                </Center>
                                                <VStack gap={0}>
                                                    <Text fontSize="xs" fontWeight="bold" color="gray.500">Motivo da Recusa</Text>
                                                    <Text fontWeight="black" fontSize="lg" textAlign={'center'} >{data.motivoTroca ?? data.troca?.motivoTroca ?? '—'}</Text>
                                                </VStack>
                                            </VStack>
                                        </Box>
                                    ) : null}
                                    <Box>
                                        <Heading size="md" color="gray.800" fontWeight="bold" display="flex" alignItems="center" gap={2} mb={6}>
                                            <ArrowRightLeft size={20} color="blue.800" /> Detalhes da Substituição
                                        </Heading>

                                        <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={6}>
                                            <HStack bg="white" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100" boxShadow="sm">
                                                <Center boxSize="40px" bg="blue.50" borderRadius="lg" color="blue.800">
                                                    < Briefcase size={20} />
                                                </Center>
                                                <VStack align="start" gap={0}>
                                                    <Text fontSize="xs" fontWeight="bold" color="gray.500">FUNÇÃO DO PLANTÃO</Text>
                                                    <Text fontWeight="black">{data.funcaoPlantao ?? data.troca?.funcaoPlantao ?? '—'}</Text>
                                                </VStack>
                                            </HStack>

                                            <HStack bg="white" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100" boxShadow="sm">
                                                <Center boxSize="40px" bg="blue.50" borderRadius="lg" color="blue.800">
                                                    < IdCard size={20} />
                                                </Center>
                                                <VStack align="start" gap={0}>
                                                    <Text fontSize="xs" fontWeight="bold" color="gray.500">ANALISTA DA TROCA</Text>
                                                    <Text fontWeight="black">{data.nomeInspetor ?? data.troca?.nomeInspetor ?? '—'}</Text>
                                                </VStack>
                                            </HStack>

                                            <HStack bg="white" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100" boxShadow="sm">
                                                <Center boxSize="40px" bg="blue.50" borderRadius="lg" color="blue.800">
                                                    <MapPin size={20} />
                                                </Center>
                                                <VStack align="start" gap={0}>
                                                    <Text fontSize="xs" fontWeight="bold" color="gray.500">UNIDADE</Text>
                                                    <Text fontWeight="black">{data.unidade ?? data.troca?.unidade.T ?? '—'}</Text>
                                                </VStack>
                                            </HStack>

                                        </SimpleGrid>
                                    </Box>

                                    <Separator />

                                    {/* Requerentes */}
                                    <Box>
                                        <Heading size="md" color="gray.800" fontWeight="bold" display="flex" alignItems="center" gap={2} mb={6}>
                                            <User size={20} color="blue.800" /> Profissionais Envolvidos
                                        </Heading>

                                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                                            {(data.requerente ?? data.requerentes ?? []).map((r: any, idx: number) => (
                                                <VStack key={idx} align="stretch" gap={4} p={6} borderRadius="2xl" border="2px solid" borderColor="gray.100" bg="white" position="relative">
                                                    <Badge position="absolute" top={-3} left={6} bg="blue.800" color="white" px={4} borderRadius="full">
                                                        {idx === 0 ? 'REQUERENTE' : 'SUBSTITUTO'}
                                                    </Badge>

                                                    <VStack align="start" gap={1} pt={2}>
                                                        <Text fontSize="xs" fontWeight="bold" color="gray.500">NOME COMPLETO</Text>
                                                        <Text fontWeight="black" fontSize="lg">{r.nome} {r.sobrenome ?? ''}</Text>
                                                    </VStack>

                                                    <SimpleGrid columns={1} gap={3}>
                                                        <HStack>
                                                            <Calendar size={16} color="gray.400" />
                                                            <Text fontSize="sm"><b>Data:</b> {r.dataTroca ?? '—'}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Clock size={16} color="gray.400" />
                                                            <Text fontSize="sm"><b>Horário:</b> {r.horarioTrocaInit ?? '—'} às {r.horarioTrocaEnd ?? '—'}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <User size={16} color="gray.400" />
                                                            <Text fontSize="sm"><b>CPF:</b> {r.cpf ?? '—'}</Text>
                                                        </HStack>
                                                    </SimpleGrid>
                                                </VStack>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                </VStack>
                            ) : (
                                <Center py={20} flexDir="column" gap={4}>
                                    <Search size={48} color="gray.400" />
                                    <Text fontSize="xl" fontWeight="bold" color="gray.500">Aguardando busca...</Text>
                                    <Text color="gray.400" textAlign="center">Insira o ID da troca acima para visualizar os detalhes</Text>
                                </Center>
                            )}
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Box>
        </>
    );
}
