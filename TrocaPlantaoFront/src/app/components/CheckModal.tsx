import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { CheckCircle, XCircle } from "lucide-react";

interface CheckModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pendingStatus: 'ACEITO' | 'RECUSADO' | null;
    nomeInspector: string;
    setNomeInspector: (val: string) => void;
    motivoRecusa: string;
    setMotivoRecusa: (val: string) => void;
    onConfirm: () => void;
    isLoading: boolean;
}

export function CheckModal({
    open,
    onOpenChange,
    pendingStatus,
    nomeInspector,
    setNomeInspector,
    motivoRecusa,
    setMotivoRecusa,
    onConfirm,
    isLoading
}: CheckModalProps) {



    return (
        <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle display="flex" alignItems="center" gap={2}>
                        {pendingStatus === 'ACEITO' ? (
                            <CheckCircle size={20} color="#16a34a" />
                        ) : (
                            <XCircle size={20} color="#dc2626" />
                        )}
                        Confirmar {pendingStatus === 'ACEITO' ? 'Aceite' : 'Recusa'}
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack align="start" gap={4}>
                        <Text fontSize="sm" color="gray.600">
                            Por favor, digite seu nome {pendingStatus === 'RECUSADO' ? 'e o motivo da recusa' : ''} para registrar esta ação no sistema:
                        </Text>
                        <Box w="full" display="flex" flexDirection="column" gap={2}>
                            <input
                                placeholder="Digite o nome do inspetor"
                                value={nomeInspector}
                                onChange={(e) => {
                                    const somenteLetras = e.target.value
                                        .replace(/[0-9]/g, "")
                                        .replace(/\s+/g, " ");
                                    setNomeInspector(somenteLetras);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #E2E8F0',
                                    outline: 'none',
                                }}
                                autoFocus
                            />
                            {pendingStatus === 'RECUSADO' && (
                                <input
                                    placeholder="Digite o motivo da recusa (Opcional, mas recomendado)"

                                    value={motivoRecusa}
                                    onChange={(e) => {
                                        const somenteLetras = e.target.value
                                            .replace(/[0-9]/g, "")
                                            .replace(/\s+/g, " ");
                                        setMotivoRecusa(somenteLetras);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '2px solid #E2E8F0',
                                        outline: 'none',
                                    }}
                                    autoFocus
                                />
                            )}
                        </Box>

                    </VStack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogActionTrigger>
                    <Button
                        bg={pendingStatus === 'ACEITO' ? "green.600" : "red.600"}
                        color="white"
                        _hover={{ bg: pendingStatus === 'ACEITO' ? "green.700" : "red.700" }}
                        onClick={onConfirm}
                        disabled={!nomeInspector.trim() || nomeInspector.trim().length < 3 || isLoading}
                        loading={isLoading}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}