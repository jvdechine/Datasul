import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PoModalAction, PoModalComponent, PoTableAction, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  searchForm: any;
  columns:any = [
    {
      'property':'displayName',
      'label':'Nome'
    },
    {
      'property':'userName',
      'label':'Nome de Usuário'
    },
    {
      'property':'userType',
      'label':'Tipo'
    }
  ];
  actions: Array<PoTableAction> = [
    { action: this.showModal.bind(this), icon: 'po-icon-edit', label: 'Alterar Usuário'},
    { action: this.deleteUsuar.bind(this), icon: 'po-icon-delete', label: 'Deletar Usuário' }
  ];
  optionsRadioActive = [
    { label: 'Ativo', value: 1 },
    {label: 'Inativo', value: 2},
    {label: 'Ambos', value: 3}
  ]
  radioActive = 3;
  showMore = false;
  totalusuar = 10;
  type = 2;
  confirm: PoModalAction = {
    action: () => {
      this.onSubmit(this.searchForm.value);
      this.poModal.close();
    },
    label: 'Confirmar'
  };
  alter: PoModalAction = {
    action: () => {
      this.alterUsuar(this.lastUsuar);
      this.poModal.close();
    },
    label: 'Alterar'
  };
  usuar = [];
  usuarShow:Array<any> = [];
  filters = [];
  loading = false;
  titleModal:string = ""
  nome:string = ""
  lastUsuar:Array<any> = [];
  loadingText = "";
  loadingScreen = false;
  usuarTypeSelect = [{label: 'Super', value: 'Super'}, {label: 'Admin', value: 'Admin'}, {label:'Supervisor', value:'Supervisor'}, {label:'Comum', value:'Comum'}];

  constructor(
    public http: HttpClient,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public poNotification: PoNotificationService) {
      this.searchForm = this.formBuilder.group({
        codigoFiltro: ''
      });
  }

  ngOnInit() {
    this.loading = true;
    this.restService.login('super', 'super').subscribe(
      (token: any) => {
        this.restService.getUsers().subscribe(
          (usuarGet: any) => {
            this.usuarShow = usuarGet.Resources;
            this.loading = false;
        })
    });
  }

  public onSubmit(valueForm){
    this.loading = true;
    this.filters = [];
    if(valueForm.codigoFiltro !== ""){
      this.filters = this.filters.concat([
        {
          'label':'Pesquisa: ' + valueForm.codigoFiltro,
        }
      ]);
    }
    if(this.radioActive === 1){
      this.filters = this.filters.concat([
        {
          'label':'Situação: Ativo',
        }
      ]);
    }else{
      if(this.radioActive === 2){
        this.filters = this.filters.concat([
          {
            'label':'Situação: Inativo',
          }
        ]);
      }
    }
    this.usuarShow = [];
    this.restService.login('super', 'super').subscribe(
      (token: any) => {
        this.restService.getUsers().subscribe(
          (usuarGet: any) => {
            usuarGet.Resources.forEach(element => {
              if(element.displayName.toUpperCase() >= valueForm.codigoFiltro.toUpperCase()){
                //Filtra Ativo - Inativo
                if(element.active === true && this.radioActive === 1){
                  this.usuarShow = this.usuarShow.concat(element);
                }else{
                  if(element.active === false && this.radioActive === 2){
                    this.usuarShow = this.usuarShow.concat(element);
                  }else{
                    if(this.radioActive === 3){
                    this.usuarShow = this.usuarShow.concat(element);
                    }
                  }
                }
              }
              this.loading = false;
            });
        });
    });
  }

  public verifyFilters(){
    if(this.filters.length === 0){
      return false;
    }
    return true;
  }

  public showModal(usuar, type){
    if(type === 1){
      this.type = type;
    }else{
      this.type = 2;
    }
    console.log(this.type);
    if(type === 1){
      this.titleModal = "Filtros";
    }else{
      //Altera Usuário
      this.lastUsuar = usuar;
      this.titleModal = "Altera Usuário";
    }
    this.poModal.open();
  }

  public primaryBtnModal(){
    if(this.type === 1){
      return this.confirm;
    }
    return this.alter;
  }

  public alterUsuar(usuar){
    this.loadingText = "Alterando...";
    this.loadingScreen = true;
    usuar.externalId = usuar.id;
    usuar.name.formatted = usuar.displayName;
    if(usuar.emails[0].primary === true && usuar.emails[0].value === ""){
      usuar.emails[0].value = "teste@teste.com";
    }
    this.restService.alterUser(usuar.id, usuar).subscribe(
      (retorno: any) => {
        this.poNotification.success('Usuário alterado com Sucesso');
        this.onSubmit(this.searchForm.value);
        this.loadingScreen = false;
    });
  }

  public deleteUsuar(usuar){
    this.loadingScreen = true;
    this.loadingText = "Deletando...";
    this.restService.deleteUsuar(usuar.id).subscribe(
      (retorno:any) => {
        if(retorno = "?"){
          this.poNotification.success('Usuário excluído com Sucesso');
          this.onSubmit(this.searchForm.value);
          this.loadingScreen = false;
        }
    });
  }
}

