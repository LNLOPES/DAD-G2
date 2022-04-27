import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetoPraticoFront';
  
}

$(document).ready(function() {
  $('#example').DataTable( {
      responsive: true,
      "language": {
        "lengthMenu": "Mostrando _MENU_ registros por página",
        "zeroRecords": "Nenhum registro encontrado",
        "info": "Mostrando páginas _PAGE_ de _PAGES_",
        "infoEmpty": "Nenhum registro encontrado",
        "infoFiltered": "(Filtrados de _MAX_ registros)",
        "search": "Pesquisar",
        "paginate": {
          "next": "Próximo",
          "previous": "Anterior",
          "first": "Primeiro",
          "last": "Último"
      }
    }
  } );
} );