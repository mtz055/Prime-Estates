
const BANCO_IMOVEIS = [
  {
    id: 1,
    tipo: "Apartamento",
    bairro: "Jardins",
    preco: 4500000,
    area: 210,
    quartos: 3,
    vagas: 2,
    imagem: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    titulo: "Apartamento Vista Parcial Parque"
  },
  {
    id: 2,
    tipo: "Cobertura",
    bairro: "Itaim Bibi",
    preco: 12500000,
    area: 420,
    quartos: 4,
    vagas: 4,
    imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    titulo: "Cobertura Linear Exclusiva"
  },
  {
    id: 3,
    tipo: "Casa",
    bairro: "Jardins",
    preco: 8900000,
    area: 550,
    quartos: 4,
    vagas: 6,
    imagem: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    titulo: "Casa Arquitetura Contemporânea"
  },
  {
    id: 4,
    tipo: "Apartamento",
    bairro: "Vila Nova Conceição",
    preco: 6200000,
    area: 180,
    quartos: 2,
    vagas: 2,
    imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    titulo: "Luxo Atemporal Mobiliado"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  
 
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav__links");
  const navElement = document.getElementById("nav");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }

  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navElement.classList.add("scrolled");
    } else {
      navElement.classList.remove("scrolled");
    }
  });

  document.querySelectorAll('.nav__link, .btn').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          if (navLinks) navLinks.classList.remove("open");
        }
      }
    });
  });



  const stats = document.querySelectorAll(".hero__stat-num");
  
  const animarContadores = () => {
    stats.forEach(stat => {
      const target = +stat.getAttribute("data-target");
      const speed = target / 50; // velocidade proporcional
      
      const updateCount = () => {
        const current = +stat.innerText;
        if (current < target) {
          stat.innerText = Math.ceil(current + speed);
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = target;
        }
      };
      updateCount();
    });
  };
  
 
  setTimeout(animarContadores, 400);


  
  const containerCards = document.getElementById("featured-cards");
  const btnBuscar = document.getElementById("search-btn");

  function renderizarImoveis(lista) {
    if (!containerCards) return;
    
    if (lista.length === 0) {
      containerCards.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--color-muted); padding: 3rem 0;">
          Nenhum imóvel premium encontrado para os critérios selecionados.
        </div>`;
      return;
    }

    containerCards.innerHTML = lista.map(imovel => `
      <div class="swiper-slide property-card" onclick="exibirDetalhesImovel(${imovel.id})">
        <div class="property-card__image">
          <img src="${imovel.imagem}" alt="${imovel.titulo}">
          <span class="property-card__badge tag">${imovel.bairro}</span>
          <button class="property-card__fav" onclick="event.stopPropagation(); toggleFavorito(this)">
            ♥
          </button>
        </div>
        <div class="property-card__body">
          <div class="property-card__price">R$ ${imovel.preco.toLocaleString('pt-BR')}</div>
          <h3 class="property-card__title">${imovel.titulo}</h3>
          <div class="property-card__specs">
            <span class="property-card__spec"><strong>${imovel.area}</strong> m²</span>
            <span class="property-card__spec"><strong>${imovel.quartos}</strong> Dorms</span>
            <span class="property-card__spec"><strong>${imovel.vagas}</strong> Vagas</span>
          </div>
        </div>
      </div>
    `).join('');

   
    if(window.swiperFeatured) window.swiperFeatured.update();
  }

  // Ação do Botão Filtrar
  if (btnBuscar) {
    btnBuscar.addEventListener("click", () => {
      const tipo = document.getElementById("search-tipo").value;
      const bairro = document.getElementById("search-bairro").value.toLowerCase();
      const valorMax = document.getElementById("search-valor").value;

      const imoveisFiltrados = BANCO_IMOVEIS.filter(imovel => {
        const matchesTipo = tipo === "" || imovel.tipo === tipo;
        const matchesBairro = bairro === "" || imovel.bairro.toLowerCase().includes(bairro);
        const matchesValor = valorMax === "" || imovel.preco <= parseFloat(valorMax);
        
        return matchesTipo && matchesBairro && matchesValor;
      });

      renderizarImoveis(imoveisFiltrados);
      
      
      document.querySelector(".featured").scrollIntoView({ behavior: 'smooth' });
    });
  }

  renderizarImoveis(BANCO_IMOVEIS);


  
  // Swiper Carrossel de Imóveis
  if (document.querySelector('.featured-swiper')) {
    window.swiperFeatured = new Swiper('.featured-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '#feat-next', prevEl: '#feat-prev' },
      breakpoints: {
        768: { slidesPer: 2 },
        1024: { slidesPer: 3 }
      }
    });
  }

 
  if (document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.testimonials-pagination', clickable: true },
      breakpoints: {
        900: { slidesPer: 2 }
      }
    });
  }

  
  if (document.getElementById("sch-date")) {
    flatpickr("#sch-date", {
      locale: "pt",
      dateFormat: "d/m/Y",
      minDate: "today",
      disable: [
        function(date) {
          
          return (date.getDay() === 0);
        }
      ]
    });
  }

  if (document.getElementById("map")) {
    
    const mapa = L.map('map', { scrollWheelZoom: false }).setView([-23.5855, -46.6815], 14);
    
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);

    
    const pontosMap = [
      { name: "Cobertura Itaim", coords: [-23.5835, -46.6830] },
      { name: "Casa Moderna Jardins", coords: [-23.5710, -46.6660] },
      { name: "Apartamento Premium Jardins", coords: [-23.5680, -46.6710] }
    ];

    pontosMap.forEach(ponto => {
      L.marker(ponto.coords).addTo(mapa)
        .bindPopup(`<div class="map-popup"><strong>Prime Estates</strong><br>${ponto.name}</div>`);
    });
  }


  const btnAgendar = document.getElementById("sch-submit");
  const feedbackAgendamento = document.getElementById("sch-feedback");

  if (btnAgendar) {
    btnAgendar.addEventListener("click", () => {
      const nome = document.getElementById("sch-name").value.trim();
      const phone = document.getElementById("sch-phone").value.trim();
      const date = document.getElementById("sch-date").value;
      const time = document.getElementById("sch-time").value;

      feedbackAgendamento.classList.add("hidden");
      feedbackAgendamento.className = "schedule__feedback"; 

     
      if (!nome || !phone || !date) {
        feedbackAgendamento.classList.remove("hidden");
        feedbackAgendamento.classList.add("error");
        feedbackAgendamento.innerText = "Por favor, preencha todos os campos para prosseguir.";
        return;
      }

      
      btnAgendar.innerText = "Processando Solicitação...";
      btnAgendar.disabled = true;

      setTimeout(() => {
        btnAgendar.innerText = "Confirmar Agendamento";
        btnAgendar.disabled = false;

        feedbackAgendamento.classList.remove("hidden");
        feedbackAgendamento.classList.add("success");
        feedbackAgendamento.innerHTML = `<strong>Solicitação de visita enviada!</strong><br>O concierge Prime entrará em contato via WhatsApp para confirmar o seu horário em <em>${date} às ${time}</em>.`;

        
        document.getElementById("sch-name").value = "";
        document.getElementById("sch-phone").value = "";
        document.getElementById("sch-date").value = "";
      }, 1500);
    });
  }
});


window.toggleFavorito = (btn) => {
  btn.classList.toggle("active");
  if(btn.classList.contains("active")) {
    btn.style.color = "#0a0906";
  } else {
    btn.style.color = "";
  }
};

window.exibirDetalhesImovel = (id) => {
  const imovel = BANCO_IMOVEIS.find(i => i.id === id);
  if(imovel) {
  
    const inputNome = document.getElementById("sch-name");
    if(inputNome) {
      inputNome.value = `Interesse no imóvel: ${imovel.titulo} (${imovel.bairro}) - `;
      document.getElementById("agendar").scrollIntoView({ behavior: 'smooth' });
      inputNome.focus();
    }
  }
};