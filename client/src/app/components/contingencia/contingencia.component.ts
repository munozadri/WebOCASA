import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'contingencia',
    templateUrl: './contingencia.component.html'
})

export class ContingenciaComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = ""
    }

    ngOnInit(){
        console.log('contingencia.component cargado');
    }
}