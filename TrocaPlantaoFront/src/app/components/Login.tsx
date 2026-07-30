'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
    Box,
    Button,
    Field,
    Input,
    VStack,
    Heading,
    Card,
    Container,
    Separator,
    Text,
    Flex,
} from '@chakra-ui/react';

import { toaster } from "@/app/components/ui/toaster";
import { Lock, LogIn, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';

type LoginForm = { username: string; password: string };

export default function Login() {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginForm>();
    const [showPassword, setShowPassword] = useState(false);

    async function onLogin(data: LoginForm) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const t = await res.text();
                throw new Error(t || `Erro ${res.status}`);
            }

            toaster.create({ title: 'Logado com sucesso', type: 'success', duration: 2000 });
            window.location.href = '/inspector';
        } catch (err: any) {
            toaster.create({
                title: 'Erro de login',
                description: err.message,
                type: 'error',
                duration: 2000
            });
        }
    }

    return (
        <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>

            {/* Lado Esquerdo - Branding / Gradiente */}
            <Flex
                flex={{ base: "none", lg: 1 }}
                w={{ base: "full", lg: "auto" }}
                py={{ base: 12, lg: 0 }}
                px={6}
                bgImage={{
                    base: "linear-gradient(135deg, var(--chakra-colors-gray-800), var(--chakra-colors-blue-900))",
                }}
                alignItems="center"
                justifyContent="center"
                direction="column"
                color="white"
            >
                <VStack gap={4} textAlign="center" animation="fadeIn 1s ease-out">
                    <Box bg="white" p={5} borderRadius="full" boxShadow="2xl" mb={2} transition="all 0.2s ease" _hover={{ transform: 'scale(1.05)' }} >
                        <img src="/cisbaf.png" alt="Logo Cisbaf" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
                    </Box>
                    <Heading size={{ base: "3xl", lg: "4xl" }} fontWeight="bold" letterSpacing="tight">
                        Cisbaf
                    </Heading>
                    <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="medium" color="whiteAlpha.900">
                        Troca de Plantão
                    </Text>

                </VStack>
            </Flex>

            {/* Lado Direito - Formulário */}
            <Flex
                flex={{ base: 1, lg: 1 }}
                w={{ base: "full", lg: "auto" }}
                alignItems="center"
                justifyContent="center"
                bg={{ base: "gray.50", _dark: "gray.950" }}
                position="relative"
                py={{ base: 10, lg: 0 }}
                px={4}
            >
                {/* Botão Voltar */}
                <Button
                    position="absolute"
                    top={{ base: 4, lg: 6 }}
                    left={{ base: 4, lg: 6 }}
                    variant="ghost"
                    color={{ base: "gray.500", _dark: "gray.400" }}
                    _hover={{ bg: { base: "blackAlpha.100", _dark: "whiteAlpha.200" }, color: { base: "gray.800", _dark: "white" } }}
                    transition="all 0.2s ease"
                    onClick={() => window.history.back()}
                    display="flex"
                    gap={2}
                    size="sm"
                >
                    <ArrowLeft size={18} /> Voltar
                </Button>

                <Container maxW="md" >
                    <Card.Root
                        variant="subtle"
                        bg={{ base: "gray.50", _dark: "gray.950" }}
                    >
                        <Card.Body p={{ base: 6, sm: 8 }}>
                            <VStack gap={6} align="stretch">
                                <VStack align="center" gap={1} mb={2}>
                                    <Heading size="xl" fontWeight="bold" color={{ base: 'gray.800', _dark: 'white' }} letterSpacing="tight">
                                        Bem-vindo
                                    </Heading>
                                    <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
                                        Faça login para continuar
                                    </Text>
                                </VStack>

                                <Separator borderColor={{ base: "gray.100", _dark: "whiteAlpha.200" }} />

                                <Box as="form" onSubmit={handleSubmit(onLogin)}>
                                    <VStack gap={5} align="stretch">
                                        <Field.Root invalid={!!errors.username}>
                                            <Field.Label fontWeight="semibold" display="flex" alignItems="center" gap={2} fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                                                <User size={16} /> Usuário
                                            </Field.Label>
                                            <Input
                                                {...register('username', { required: "O usuário é obrigatório" })}
                                                placeholder="Seu usuário"
                                                bg={{ base: 'gray.50', _dark: 'gray.950' }}
                                                borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.200' }}
                                                _focus={{ borderColor: "red.500", ring: "1px", ringColor: "red.500", bg: { base: 'white', _dark: 'gray.900' } }}
                                                size="lg"
                                                borderRadius="xl"
                                            />
                                            {errors.username && <Text color="red.500" fontSize="xs" mt={1}>{errors.username.message}</Text>}
                                        </Field.Root>

                                        <Field.Root invalid={!!errors.password}>
                                            <Field.Label fontWeight="semibold" display="flex" alignItems="center" gap={2} fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                                                <Lock size={16} /> Senha
                                            </Field.Label>
                                            <Box position="relative" width="full">
                                                <Input
                                                    {...register('password', { required: "A senha é obrigatória" })}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Sua senha"
                                                    bg={{ base: 'gray.50', _dark: 'gray.950' }}
                                                    borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.200' }}
                                                    _focus={{ borderColor: "red.500", ring: "1px", ringColor: "red.500", bg: { base: 'white', _dark: 'gray.900' } }}
                                                    size="lg"
                                                    borderRadius="xl"
                                                    pr="3rem"
                                                />
                                                <Button
                                                    position="absolute"
                                                    right={2}
                                                    top="50%"
                                                    transform="translateY(-50%)"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    color={{ base: "gray.500", _dark: "gray.400" }}
                                                    _hover={{ bg: "transparent", color: { base: "gray.800", _dark: "white" } }}
                                                    px={1}
                                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </Button>
                                            </Box>
                                            {errors.password && <Text color="red.500" fontSize="xs" mt={1}>{errors.password.message}</Text>}
                                        </Field.Root>



                                        <Button
                                            type="submit"
                                            colorPalette="black"
                                            width="full"
                                            loading={isSubmitting}
                                            mt={2}
                                            size="lg"
                                            borderRadius="xl"
                                            fontWeight="semibold"
                                            _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                                            transition="all 0.2s ease"
                                            display="flex"
                                            gap={2}
                                        >
                                            <LogIn size={18} /> Entrar
                                        </Button>
                                    </VStack>
                                </Box>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </Container>
            </Flex>
        </Flex>
    );
}