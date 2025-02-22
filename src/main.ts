import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';

// Apply theme when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
});

// Function to apply the theme dynamically
function applyTheme() {
  const theme = localStorage.getItem('color');
  console.log('Theme from localStorage:', theme); // Debugging log

  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme'); // Ensure light theme removes dark mode
  }
}

// Listen for localStorage changes and update theme without F5
window.addEventListener('storage', () => {
  applyTheme();
});

// Bootstrap the Angular application
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideRouter(APP_ROUTES),
  ],
}).catch((e) => console.log(e));
