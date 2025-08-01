import React from 'react';

const ModalExercicio = ({ exercicio, onClose }) => {
  if (!exercicio) return null;

  return (
    // Overlay semi-transparente que cobre a tela inteira
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      {/* Container principal do modal */}
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up">
        
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <h2 className="text-3xl font-bold text-gray-800">{exercicio.nome}</h2>
          <button onClick={onClose} className="text-4xl font-light text-gray-500 hover:text-gray-900 transition-colors">&times;</button>
        </div>

        {/* Corpo do Modal com scroll */}
        <div className="overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna da Imagem/GIF (Placeholder) */}
            <div className="bg-gray-200 rounded-lg flex items-center justify-center h-72 animate-pulse">
              <p className="text-gray-500">_Espaço para GIF do exercício_</p>
            </div>

            {/* Coluna de Informações Rápidas */}
            <div className="space-y-4 text-lg">
              <div>
                <h3 className="font-bold text-gray-600">Músculo Alvo</h3>
                <p className="capitalize text-blue-600 font-semibold">{exercicio.musculo_principal}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Equipamento</h3>
                <p className="capitalize">{exercicio.equipamento.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Dificuldade</h3>
                <p className="capitalize">{exercicio.dificuldade}</p>
              </div>
            </div>
          </div>

          {/* Instruções Detalhadas */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Instruções de Execução</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
              {exercicio.instrucoes.map((passo, index) => (
                <li key={index}>
                  {passo.trim().endsWith('.') ? passo.trim() : `${passo.trim()}.`}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExercicio;