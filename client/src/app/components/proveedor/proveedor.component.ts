import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'proveedor',
    templateUrl: './proveedor.component.html'
})

export class ProveedorComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = ""
    }

    ngOnInit(){
        console.log('proveedor.component cargado');
    }
}