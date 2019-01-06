import { enableProdMode,  ɵrenderComponent , createInjector} from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

const injector = createInjector(AppModule);
console.log(injector);
ɵrenderComponent(AppComponent, {injector});
