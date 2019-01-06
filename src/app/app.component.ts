import { Component, ɵNgModuleFactory as NgModuleFactory, Injector, NgModule, ViewChild, ViewContainerRef, ComponentFactoryResolver, InjectionToken, Inject, INJECTOR } from '@angular/core';
import { AppService } from './app.service';

declare var System: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cli-app-with-rollup';

  @ViewChild('placeholder', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private as: AppService, @Inject(INJECTOR) private injector: Injector) {
    console.log(as);
    System.import("/dyn.js").then(m => {
      
      const moduleFactory = new NgModuleFactory(m['DynModule']);
      const moduleRef = moduleFactory.create(injector);
      let componentType = m['DynComponent'];
      let componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);


      this.container.createComponent(componentFactory, 0, moduleRef.injector);

      
    }); 
  }

  /**
   * Find Component-Type in Module-Type.
   * TODO: This is based on decorator metadata, which will be removed in ivy and replaced by ngComponentDef and ngModuleDef
   */
  private findComponentInModule(moduleType: any, componentSelector: string): any {
    let moduleMetadata = this.getNgModuleMetadata(moduleType);
    return this.findComponent(moduleMetadata.entryComponents || moduleMetadata.exports, componentSelector);
  }

  private findComponent(componentTypes: any[], componentSelector: string): any {
    return componentTypes.find((c: any) => this.getComponentMetadata(c).selector === componentSelector);
  }

  private getNgModuleMetadata(moduleType: any): NgModule {
    return moduleType['__annotations__'].find(a => a instanceof NgModule);
  }

  private getComponentMetadata(componentType: any): Component {
    return componentType['__annotations__'].find(a => a instanceof Component);
  }
}
