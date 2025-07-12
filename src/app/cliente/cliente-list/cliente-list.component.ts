import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageModule } from '@po-ui/ng-components';
import { PoTableColumn, PoTableModule, PoButtonModule } from '@po-ui/ng-components';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoPageModule, PoButtonModule,RouterModule],
  template: `
    <po-page-default p-title="Lista de Clientes">
      <po-button p-label="Novo Cliente" (p-click)="novoCliente()"></po-button>

      <po-table 
        [p-columns]="columns" 
        [p-items]="clientes"
        [p-actions]="actions">
      </po-table>
    </po-page-default>
  `
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  columns: PoTableColumn[] = [
    { property: 'nome', label: 'Nome' },
    { property: 'email', label: 'Email' },
    { property: 'telefone', label: 'Telefone' },
    { property: 'cep', label: 'CEP' },
    { property: 'rua', label: 'Rua' },
    { property: 'bairro', label: 'Bairro'},
    { property: 'numero', label: 'Número' },
    { property: 'complemento', label: 'Complemento' },
    { property: 'cidade', label: 'Cidade' },
    { property: 'estado', label: 'UF' },
  ];

  actions = [
    {
      label: 'Editar',
      action: (cliente: Cliente) => {
  if (cliente.id !== undefined) {
    this.editarCliente(cliente.id);
  }
},

    },
    {
      label: 'Excluir',
      action: (cliente: Cliente) => {
  if (cliente.id !== undefined) {
    this.excluirCliente(cliente.id);
  }
},
      type: 'danger'
    }
  ];

  constructor(private service: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.service.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  novoCliente(): void {
    this.router.navigate(['/clientes/novo']);
  }

  editarCliente(id: number): void {
    this.router.navigate([`/clientes/${id}`]);
  }

  excluirCliente(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.service.excluir(id).subscribe(() => this.listarClientes());
    }
  }
}
