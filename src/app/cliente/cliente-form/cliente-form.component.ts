import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  templateUrl: './cliente-form.component.html',
  imports: [CommonModule, FormsModule, PoModule]
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = {
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: ''
  };

   ngOnInit(): void {
    // nada aqui
  }

  isEdit = false;

  fields = [
    { property: 'nome', label: 'Nome' },
    { property: 'email', label: 'Email' },
    { property: 'telefone', label: 'Telefone' },
    { property: 'cep', label: 'CEP', required: true, gridColumns: 4 },
    { property: 'rua', label: 'Rua', gridColumns: 12 },
    { property: 'bairro', label: 'Bairro', gridColumns: 6 },
    { property: 'cidade', label: 'Cidade', gridColumns: 4 },
    { property: 'estado', label: 'Estado', gridColumns: 2 },
    { property: 'numero', label: 'Número', gridColumns: 3 },
    { property: 'complemento', label: 'Complemento', gridColumns: 5 }
  ];

    constructor(
  private http: HttpClient,
  private service: ClienteService,
  private route: ActivatedRoute,
  private router: Router
) {
  this.route.paramMap.subscribe(params => {
  const idParam = params.get('id');

  if (idParam && !isNaN(+idParam)) {
    this.isEdit = true;
    this.service.getCliente(+idParam).subscribe({
      next: (cli) => {
        this.cliente = cli;
        console.log('Cliente carregado:', cli);
      },
      error: (err) => {
        console.error('Erro ao carregar cliente:', err);
        alert('Erro ao carregar os dados do cliente.');
        this.router.navigate(['/clientes']);
      }
    });
  } else {
    this.isEdit = false;
    console.log('Modo inclusão');
  }
});
}
 
 onFormChange(event: any): void {
  const clienteAtualizado = event as Cliente;
  this.cliente = clienteAtualizado;

  const cep = clienteAtualizado.cep?.replace(/\D/g, '');
  if (cep && cep.length === 8) {
    this.buscarCep(cep);
  }
}

  buscarCep(cep: string): void {
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
      dados => {
        if (!dados.erro) {
          this.cliente.rua = dados.logradouro;
          this.cliente.bairro = dados.bairro;
          this.cliente.cidade = dados.localidade;
          this.cliente.estado = dados.uf;
        } else {
          alert('CEP não encontrado.');
        }
      },
      () => alert('Erro ao consultar o CEP.')
    );
  }

  salvar(): void {
    if (!this.cliente.nome || !this.cliente.email) {
      alert('Preencha nome e email.');
      return;
    }

    const op = this.isEdit
      ? this.service.atualizar(this.cliente.id!, this.cliente)
      : this.service.salvar(this.cliente);

    op.subscribe(() => {
      alert('Cliente salvo com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }
}
