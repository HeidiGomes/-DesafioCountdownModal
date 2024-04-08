import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// Configurações adicionais para o adaptador
			// Aqui estamos especificando a pasta onde os arquivos estáticos devem ser servidos
			files: {
				assets: 'static', // Pasta onde estão os arquivos estáticos (ícones, etc.)
				routes: 'src/routes' // Pasta onde estão os arquivos de rota do SvelteKit
			},

			// Opções adicionais, se necessário
			// Por exemplo, fallback para lidar com URLs desconhecidas
			// fallback: null // ou fallback: 'index.html'
		})
	}
};

export default config;
