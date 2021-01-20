import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sucursal',
    templateUrl: './sucursal.component.html'
})

export class SucursalComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = ""
    }

    ngOnInit(){
        console.log('sucursal.component cargado');
    }
}