const IMOVEIS = [
  {
    id: 1,
    tipo: "casa",
    bairro: "Centro",
    cidade: "Itaúna",
    imagem: "img/imoveis/1/casaIA.jpeg",
    destaque: true,
    preco: 0,
    tamanho: 0,
    construido: 0,
    quarto:3,
    sala:1,
    banheiro:1,

    imagens: [
      "img/imoveis/1/casaIA.jpeg",
      "img/imoveis/1/casaIA1.png"
    ],

    resumo: [
    "Casa moderna de dois pavimentos",
    "3 quartos com suíte",
    "Projeto contemporâneo"
    ],

    descricao: "Casa moderna de dois pavimentos, com fachada elegante e excelente padrão construtivo. Ambientes bem distribuídos, ótima iluminação natural e acabamento de qualidade. Ideal para famílias que buscam conforto, segurança e boa localização. ⚠️ Imagens ilustrativas — imóvel gerado por IA apenas para demonstração.",

    caracteristicas: [
      "Projeto arquitetônico moderno",
      "Fachada contemporânea",
      "Piso em porcelanato",
      "Iluminação natural privilegiada",
      "Quintal nos fundos",
      "Rua tranquila e asfaltada"
    ],

    empresas: []
    //{ tipo: "imobiliarias", id: 1 },
    //{ tipo: "corretores", id: 3 }
  
  
  },
  {
    id: 2,
    tipo: "Chácara",
    bairro: "Cachoeirinha",
    cidade: "Itaúna",
    imagem: "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.38 (1).jpeg",
    destaque: true,
    preco: 175000,
    tamanho: 970,
    construido: "??",
    quarto:2,
    sala:1,
    banheiro:1,
    cozinha:1,
    areadeserviço:1,

    imagens: [
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.34.jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.36 (1).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.36.jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.37 (1).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.37 (2).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.37 (3).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.37 (4).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.37.jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.38 (1).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.38 (2).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.38 (3).jpeg",
      "img/imoveis/2/marcadas/WhatsApp Image 2026-03-09 at 19.01.38.jpeg"
    ],

    resumo: [
      "Chácara com 970 m²",
      "Casa com laje e telhado colonial",
      "Amplo espaço no fundo"
    ],

    descricao: "Chácara localizada no bairro Cachoeirinha, em Itaúna, ideal para quem busca tranquilidade e contato com a natureza. O imóvel possui casa com laje e telhado colonial, oferecendo conforto e estrutura para moradia ou lazer. O terreno amplo de aproximadamente 970 m² conta com grande área nos fundos, perfeita para ampliar construções, fazer área de lazer, plantar ou aproveitar com a família.",

    caracteristicas: [
      "Terreno com aproximadamente 970 m²",
      "Casa com laje",
      "Telhado colonial",
      "2 quartos",
      "Sala",
      "Cozinha",
      "Banheiro",
      "Área de serviço",
      "Amplo espaço nos fundos",
      "Ideal para moradia ou lazer"
    ],

    empresas: [
    { tipo: "corretores", id: 9 },
    ]
  
  
  },
  {
      id: 3,
      tipo: "Lote",
      bairro: "São Bento",
      cidade: "Itaúna",
      imagem: "img/imoveis/3/marcadas/Captura de tela 2026-03-09 234614.png",
      destaque: true,
      preco: 250000,
      tamanho: 465,
      construido: 0,
      quarto:0,
      sala:0,
      banheiro:0,
      cozinha:0,
      areadeserviço:0,

      imagens: [
        "img/imoveis/3/marcadas/Captura de tela 2026-03-09 234614.png",
      ],

      resumo: [
        "Lote plano",
        "465 m² de área",
        "Lote ja murado de esquina"
      ],

      descricao: "Excelente lote de esquina, murado localizado no bairro São Bento, em Itaúna. O terreno possui aproximadamente 465 m² e topografia plana, facilitando a construção e reduzindo custos de obra. Ideal para quem deseja construir uma casa espaçosa ou investir em um terreno bem localizado. Região tranquila e em crescimento.",
      
      caracteristicas: [
        "Área total de 465 m²",
        "Terreno plano",
        "Ideal para construção residencial",
        "Bairro tranquilo"
      ],

      empresas: [
      { tipo: "corretores", id: 9 },
      ]
    
    
    },
  {
      id: 4,
      tipo: "Lote",
      bairro: "",
      cidade: "Itaúna",
      imagem: "img/imoveis/4/ChatGPT Image 10_03_2026, 23_17_11.png",
      destaque: true,
      preco: 140000,
      tamanho: 20000,
      construido: 0,
      quarto:0,
      sala:0,
      banheiro:0,
      cozinha:0,
      areadeserviço:0,

      imagens: [
        "img/imoveis/4/ChatGPT Image 10_03_2026, 23_14_20.png",
        "img/imoveis/4/ChatGPT Image 10_03_2026, 23_17_11.png"
      ],

      resumo: [
        "2 Hectares", "15km de Itaúna", "Corrego natural na propriedade"
      ],

      descricao: "Excelente oportunidade para quem procura tranquilidade e contato com a natureza. Terreno com aproximadamente 2 hectares, localizado a cerca de 15 km de Itaúna, com acesso por 4,5 km de estrada de terra. A propriedade conta com córrego natural. Possui documentação e oferece ótima opção tanto para quem deseja um espaço rural quanto para investimento. O proprietário aceita carro como parte do pagamento, conforme avaliação.",

      caracteristicas: [
        "Área total de 2 hectares",
        "Córrego na propriedade",
        "Ideal para sítio ou lazer",
        "15 km de Itaúna",
        "4,5 km de estrada de terra",
        "Aceita veículo na negociação",
        "Documentação disponível"
      ],

      empresas: [
      { tipo: "corretores", id: 9 },
      ]
    
    
    },
  {
      id: 5,
      tipo: "Lote",
      bairro: "Brejo Alegre",
      cidade: "Itaúna",
      imagem: "img/imoveis/5/ChatGPT Image 10_03_2026, 23_58_31.png",
      destaque: true,
      preco: 350000,
      tamanho: 20000,
      construido: 0,
      quarto:0,
      sala:0,
      banheiro:0,
      cozinha:0,
      areadeserviço:0,

      imagens: [
        "img/imoveis/5/ChatGPT Image 10_03_2026, 23_58_31.png",
      ],

      resumo: [
        "Terreno amplo com 2 hectares",
        "Topografia excelente",
        "Localizado no Brejo Alegre",
        "Próximo à fábrica de alumínio",
        "Ideal para sítio, investimento ou empreendimento",
      ],

      descricao: "Excelente oportunidade para quem procura um terreno amplo e bem localizado. Área com 2 hectares, topografia excelente, facilitando projetos de construção, chácaras ou empreendimentos. O imóvel está localizado na região do Brejo Alegre, fácil acesso, próximo à fábrica de alumínio. Ideal para quem deseja investir, construir um sítio, área de lazer ou desenvolver projetos futuros.",
      
      caracteristicas: [
        "Topografia excelente",
        "Fácil acesso",
        "Próximo a indústria de alumínio",
        "Ideal para sítio ou investimento"
      ],  

      empresas: [
      { tipo: "corretores", id: 9 },
      ]
    
    
    },

]