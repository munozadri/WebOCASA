import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ContingenciaComponent } from './components/contingencia/contingencia.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path:'registro', component: RegisterComponent},
    {path: 'sucursal', component: SucursalComponent},
    {path: 'proveedor', component: ProveedorComponent},
    {path:'contingencia', component: ContingenciaComponent}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);