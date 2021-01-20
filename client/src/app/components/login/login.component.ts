import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User('','','','');
    }
    
    ngOnInit(){
        console.log("Componente de Login Cargado");
    }

    onSubmit(){
        //logear al usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log(this.identity);

                if(!this.identity || !this.identity._id){
                    this.status  = 'error';
                }else{
                    this.status = 'success';
                    this._router.navigate(['/sucursal']);
                    //Persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                   
                    //consegui TOKEN
                    this.gettoken();
                }               
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                    
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    gettoken(){
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                console.log(this.token);

                if(this.token.length <= 0){
                    this.status  = 'error';
                }else{
                    this.status = 'success';
                    //Persistir TOKEN del usuario
                    localStorage.setItem('token', this.token);

                    //consegui los contadores
                }               
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                    
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );

    }
    
}