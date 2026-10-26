import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Importaciones de Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  // 'roundtrip' (Ida y vuelta) | 'oneway' (Solo ida)
  tripType: 'roundtrip' | 'oneway' = 'roundtrip';

  // Fechas seleccionadas
  departureDate: Date | null = null;
  returnDate: Date | null = null;

  // Fecha mínima (Hoy)
  minDate: Date = new Date();

  onTripTypeChange(): void {
    if (this.tripType === 'oneway') {
      this.returnDate = null;
    }
  }
}
