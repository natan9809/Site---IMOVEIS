const IMOVEIS = [
  {
    id: 1,
    tipo: "casa",
    bairro: "Centro",
    cidade: "Itaúna",
    imagem: "img/imoveis/1/1.jpg",
    preco: 320000,
    tamanho: 120,

    imagens: [
      "img/imoveis/1/1.jpg",
      "img/imoveis/1/2.jpg",
      "img/imoveis/1/3.jpg"
    ],

    resumo: [
      "Projeto moderno e acolhedor",
      "3 quartos confortáveis",
      "Sala e cozinha integradas"
    ],

    descricao:
      "Casa nova no bairro Centro, com excelente padrão de acabamento, ótima iluminação natural e espaço externo funcional.",

    caracteristicas: [
      "Cozinha planejada",
      "Área de serviço",
      "Garagem coberta",
      "Quintal amplo"
    ],

    empresas: [
      {
        nome: "Solar Imóveis",
        logo: "img/logos/solar.png",
        whatsapp: "37999999999"
      },
      {
        nome: "Proplar",
        logo: "img/logos/proplar.png",
        whatsapp: "37988888888"
      }
    ]
  },

  {
    id: 2,
    tipo: "lote",
    bairro: "Centro",
    cidade: "Itaúna",
    preco: 150000,
    tamanho: 250,
    imagem: "img/imoveis/2/1.jpg",
    imagens: [
      "img/imoveis/2/1.jpg",
      "img/imoveis/2/2.jpg"
    ],

    resumo: [
      "Lote plano",
      "Ótima localização",
      "Documentação em dia"
    ],

    descricao:
      "Lote bem localizado, ideal para construção residencial ou investimento.",

    caracteristicas: [
      "Terreno plano",
      "Rua asfaltada",
      "Infraestrutura completa"
    ],

    empresas: [] // 👈 fallback automático depois
  },

  {
    id: 3,
    tipo: "casa",
    bairro: "Santana",
    cidade: "Itaúna",
    preco: 350000,
    tamanho: 140,
    imagens: ["img/imoveis/3/1.jpg"],
    resumo: ["Casa ampla", "Boa ventilação"],
    descricao: "Casa confortável em bairro tranquilo.",
    caracteristicas: ["Garagem", "Área gourmet"],
    empresas: []
  },

  {
    id: 4,
    tipo: "lote",
    bairro: "Itamaraty",
    cidade: "Itaúna",
    preco: 120000,
    tamanho: 300,
    imagens: ["img/imoveis/4/1.jpg"],
    resumo: ["Lote grande"],
    descricao: "Excelente lote para investimento.",
    caracteristicas: ["300m²"],
    empresas: []
  },

  {
    id: 5,
    tipo: "casa",
    bairro: "Paraíso",
    cidade: "Itaúna",
    preco: 290000,
    tamanho: 110,
    imagens: ["img/imoveis/5/1.jpg"],
    resumo: ["Casa nova"],
    descricao: "Casa recém construída.",
    caracteristicas: ["Quintal", "Porcelanato"],
    empresas: []
  },

  {
    id: 6,
    tipo: "apartamento",
    bairro: "Centro",
    cidade: "Itaúna",
    preco: 260000,
    tamanho: 85,
    imagens: ["img/imoveis/6/1.jpg"],
    resumo: ["Apartamento moderno"],
    descricao: "Apartamento bem localizado.",
    caracteristicas: ["Elevador"],
    empresas: []
  },

  {
    id: 7,
    tipo: "casa",
    bairro: "São Bento",
    cidade: "Itaúna",
    preco: 330000,
    tamanho: 125,
    imagens: ["img/imoveis/7/1.jpg"],
    resumo: ["Casa nova"],
    descricao: "Casa no bairro São Bento.",
    caracteristicas: ["Garagem"],
    empresas: []
  },

  {
    id: 8,
    tipo: "lote",
    bairro: "São Bento",
    cidade: "Itaúna",
    preco: 140000,
    tamanho: 280,
    imagens: ["img/imoveis/8/1.jpg"],
    resumo: ["Lote plano"],
    descricao: "Ótimo lote.",
    caracteristicas: [],
    empresas: []
  },

  {
    id: 9,
    tipo: "casa",
    bairro: "Centro",
    cidade: "Itaúna",
    preco: 410000,
    tamanho: 160,
    imagens: ["img/imoveis/9/1.jpg"],
    resumo: ["Casa alto padrão"],
    descricao: "Excelente acabamento.",
    caracteristicas: ["Área gourmet"],
    empresas: []
  },

  {
    id: 10,
    tipo: "apartamento",
    bairro: "Santana",
    cidade: "Itaúna",
    preco: 230000,
    tamanho: 75,
    imagens: ["img/imoveis/10/1.jpg"],
    resumo: ["Apartamento compacto"],
    descricao: "Ideal para morar ou investir.",
    caracteristicas: [],
    empresas: []
  }
];
