import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        services: resolve(__dirname, 'services.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        team: resolve(__dirname, 'team.html'),
        contact: resolve(__dirname, 'contact.html'),
        loading: resolve(__dirname, 'loading.html'),
        'service-website': resolve(__dirname, 'service-website.html'),
        'service-meta-ads': resolve(__dirname, 'service-meta-ads.html'),
        'service-social-media': resolve(__dirname, 'service-social-media.html'),
        'service-cold-email': resolve(__dirname, 'service-cold-email.html'),
        'service-brand': resolve(__dirname, 'service-brand.html'),
        'service-photo-video': resolve(__dirname, 'service-photo-video.html')
      }
    }
  },
  server: {
    port: 3000,
    open: '/index.html'
  }
});
