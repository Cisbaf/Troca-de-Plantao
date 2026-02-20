export type FuncaoPlantao =
    | "TEC_ENFERMAGEM"
    | "MEDIC_SOCORRISTA"
    | "ENFERMEIRO"
    | "CONDUTOR"
    | "MAQUEIRO"
    | "AUX_SAUDE_BUCAL"
    | "TEC_RADIOLOGISTA"
    | "FARMACEUTICO"
    | "DENTISTA"
    | "MEDICO_REGULADOR"
    | "SUPERVISOR"
    | "AUX_SERVICOS_GERAIS"
    | "TARM_FROTA"
    | "APOIO_ADMINISTRATIVO";

export const FUNCOES_PLANTAO = [
    {
        grupo: "Enfermagem / Socorro",
        items: [
            { value: "TEC_ENFERMAGEM", label: "Téc. Enfermagem" },
            { value: "MEDIC_SOCORRISTA", label: "Médico Socorrista" },
            { value: "ENFERMEIRO", label: "Enfermeiro" },
            { value: "CONDUTOR", label: "Condutor" },
            { value: "MAQUEIRO", label: "Maqueiro" },
        ],
    },
    {
        grupo: "Outras Especialidades",
        items: [
            { value: "AUX_SAUDE_BUCAL", label: "Auxiliar de Saúde Bucal" },
            { value: "TEC_RADIOLOGISTA", label: "Téc. Radiologia" },
            { value: "FARMACEUTICO", label: "Farmacêutico" },
            { value: "DENTISTA", label: "Dentista" },
        ],
    },
    {
        grupo: "Regulação / Suporte",
        items: [
            { value: "MEDICO_REGULADOR", label: "Médico Regulador" },
            { value: "SUPERVISOR", label: "Supervisor" },
            { value: "AUX_SERVICOS_GERAIS", label: "Aux. Serviços Gerais" },
            { value: "TARM_FROTA", label: "TARM / Frota" },
            { value: "APOIO_ADMINISTRATIVO", label: "Apoio Administrativo" },
        ],
    },
];

export type UnidadesAtuacao =
    | "CENTRAL_REGULAÇÃO"
    | "BASE_QUEIMADOS"
    | "BASE_NILOPOLIS"
    | "UPA_JARDIM_IRIS"

export const UNIDADES_ATUACAO =
{
    items: [
        { value: "CENTRAL_REGULAÇÃO", label: "CENTRAL DE REGULAÇÃO" },
        { value: "BASE_QUEIMADOS", label: "BASE QUEIMADOS" },
        { value: "BASE_NILOPOLIS", label: "BASE NILÓPOLIS" },
        { value: "UPA_JARDIM_IRIS", label: "JARDIM ÍRIS" },
    ],
}





export type FormValues = {
    funcaoPlantao?: FuncaoPlantao;
    unidade?: UnidadesAtuacao;
    pri_nome: string;
    pri_sobrenome: string;
    pri_cpf?: string;
    pri_matricula?: string;
    pri_email?: string;
    pri_telefone?: string;
    pri_dataTroca?: string;
    pri_horarioInit?: string;
    pri_horarioEnd?: string;
    pri_files?: FileList | null;
    sec_nome: string;
    sec_sobrenome: string;
    sec_cpf?: string;
    sec_matricula?: string;
    sec_email?: string;
    sec_telefone?: string;
    sec_dataTroca?: string;
    sec_horarioInit?: string;
    sec_horarioEnd?: string;
    sec_files?: FileList | null;
    motivoTroca?: string;
};