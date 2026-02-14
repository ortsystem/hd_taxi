
        // Page Loader
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            const body = document.body;
            
            setTimeout(() => {
                loader.classList.add('hidden');
                body.classList.remove('loading');
            }, 1500); // Loader fica visível por 1.5 segundos
        });

        // Mobile Menu
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Scroll Reveal
        const reveals = document.querySelectorAll('.reveal');
        
        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal();

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form Submission
        const bookingForm = document.getElementById('bookingForm');
        const successMessage = document.getElementById('successMessage');

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            let message = `🚖 *NOVA RESERVA HD TÁXI - PREMIUM*\n\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `👤 *DADOS DO CLIENTE*\n`;
            message += `Nome: ${data.nome}\n`;
            message += `Telefone: ${data.telefone}\n`;
            message += `Email: ${data.email || 'Não informado'}\n\n`;
            message += `📋 *DETALHES DO SERVIÇO*\n`;
            message += `Tipo: ${data.servico}\n`;
            message += `Data Início: ${data.dataInicio}\n`;
            message += `Data Fim: ${data.dataFim || 'Não especificado'}\n`;
            message += `Horário: ${data.hora}\n`;
            message += `Partida: ${data.partida}\n`;
            message += `Destino: ${data.destino}\n\n`;
            message += `🚗 *VIATURA SOLICITADA*\n`;
            message += `Tipo: ${data.viatura}\n`;
            message += `Passageiros: ${data.passageiros}\n\n`;
            if (data.observacoes) {
                message += `📝 *OBSERVAÇÕES*\n${data.observacoes}\n\n`;
            }
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `_Enviado via HD Táxi Website Premium_`;

            const whatsappMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/244932521258?text=${whatsappMessage}`;

            successMessage.style.display = 'block';
            bookingForm.reset();

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }, 1000);
        });

        // Date Validation
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dataInicio').setAttribute('min', today);
        document.getElementById('dataFim').setAttribute('min', today);

        document.getElementById('dataInicio').addEventListener('change', function() {
            document.getElementById('dataFim').setAttribute('min', this.value);
        });
