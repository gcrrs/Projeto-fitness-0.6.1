
// Novo gerador de programas com inteligência aprimorada
import { exercicios } from '../data/exercicios.js';

const configsPorObjetivo = {
  ganhar_massa: { series: 4, repeticoes: '8-12', descanso: 90, cadencia: '2012' },
  definir: { series: 3, repeticoes: '12-15', descanso: 60, cadencia: '1011' },
  emagrecer: { series: 3, repeticoes: '15-20', descanso: 45, cadencia: '1010' },
  manter: { series: 3, repeticoes: '10-15', descanso: 75, cadencia: '2011' },
};

const divisoesDeTreino = {
  full_body: {
    nome: 'Full Body',
    dias: [{ nome: 'Treino A - Corpo Inteiro', musculos: ['peito', 'costas', 'quadriceps', 'ombros', 'biceps', 'triceps'] }]
  },
  ab: {
    nome: 'Upper/Lower (AB)',
    dias: [
      { nome: 'Treino A - Superiores', musculos: ['peito', 'costas', 'ombros', 'biceps', 'triceps'] },
      { nome: 'Treino B - Inferiores', musculos: ['quadriceps', 'hamstrings', 'glutes', 'panturrilhas'] },
    ]
  },
  abc: {
    nome: 'Push/Pull/Legs (ABC)',
    dias: [
      { nome: 'Treino A - Empurrar', musculos: ['peito', 'ombros', 'triceps'] },
      { nome: 'Treino B - Puxar', musculos: ['lats', 'middle_back', 'biceps'] },
      { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings', 'glutes'] },
    ]
  },
  abcd: {
    nome: 'Treino ABCD',
    dias: [
      { nome: 'Treino A - Peito e Tríceps', musculos: ['peito', 'triceps'] },
      { nome: 'Treino B - Costas e Bíceps', musculos: ['lats', 'biceps'] },
      { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings'] },
      { nome: 'Treino D - Ombros e Abdômen', musculos: ['ombros', 'abdominais'] },
    ]
  },
  abcde: {
    nome: 'Treino ABCDE',
    dias: [
      { nome: 'Treino A - Peito', musculos: ['peito'] },
      { nome: 'Treino B - Costas', musculos: ['lats', 'middle_back'] },
      { nome: 'Treino C - Pernas', musculos: ['quadriceps', 'hamstrings', 'glutes'] },
      { nome: 'Treino D - Ombros', musculos: ['ombros'] },
      { nome: 'Treino E - Braços e Abdômen', musculos: ['biceps', 'triceps', 'abdominais'] },
    ]
  }
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function gerarProgramaAvancado(userProfile, tipoSplit) {
  const { objetivo, experiencia, equipamentos, preferencias = {} } = userProfile;
  const config = configsPorObjetivo[objetivo] || configsPorObjetivo['manter'];
  const divisao = divisoesDeTreino[tipoSplit];
  if (!divisao) return null;

  const dificuldadePermitida = {
    iniciante: ['iniciante'],
    intermediario: ['iniciante', 'intermediario'],
    avancado: ['iniciante', 'intermediario', 'avancado']
  }[experiencia] || ['iniciante'];

  const filtrado = exercicios.filter(ex =>
    (equipamentos.includes(ex.equipamento) || ex.equipamento === 'body_only') &&
    dificuldadePermitida.includes(ex.dificuldade)
  );

  const programaFinal = divisao.dias.map((dia) => {
    const usados = new Set();
    const exerciciosDoDia = dia.musculos.flatMap(musculo => {
      const isGrande = ['peito', 'lats', 'quadriceps', 'glutes', 'hamstrings', 'middle_back'].includes(musculo);
      const isPequeno = ['biceps', 'triceps', 'panturrilhas'].includes(musculo);
      const qtd = isGrande ? 2 : isPequeno && objetivo === 'ganhar_massa' ? 2 : 1;
      const candidatos = shuffle(
        filtrado.filter(ex => ex.musculo_principal === musculo && !usados.has(ex.id))
      );
      const selecionados = candidatos.slice(0, qtd);
      selecionados.forEach(e => usados.add(e.id));
      return selecionados.map(ex => ({
        ...ex,
        series: config.series,
        repeticoes: config.repeticoes,
        descanso: config.descanso,
        cadencia: config.cadencia,
        carga: '___ kg',
      }));
    });

    return {
      nome: dia.nome,
      exercicios: exerciciosDoDia
    };
  });

  return {
    nomePrograma: divisao.nome,
    divisao: programaFinal
  };
}
