import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Importaciones de Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  minDate: Date = new Date();
  showPassengerDropdown = false;

  public searchForm: FormGroup = this.fb.group({
    tripType: ['roundtrip', Validators.required],
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    departureDate: [null, Validators.required],
    returnDate: [null], // Se valida condicionalmente o según el tipo de viaje
    adults: [1, [Validators.required, Validators.min(0)]],
    children: [0, [Validators.required, Validators.min(0)]],
    infants: [0, [Validators.required, Validators.min(0)]]
  })


  // Control de contadores de pasajeros
  adjustPassenger(type: 'adults' | 'children' | 'infants', delta: number): void {
    const current = this.searchForm.get(type)?.value || 0;
    const newValue = current + delta;
    if (newValue >= 0) {
      this.searchForm.get(type)?.setValue(newValue);
    }
  }

  // Validador de la regla de pasajeros: Al menos 1 adulto o 1 niño
  get arePassengersValid(): boolean {
    const adults = this.searchForm.get('adults')?.value || 0;
    const children = this.searchForm.get('children')?.value || 0;
    return (adults + children) > 0;
  }

  // Texto resumido para mostrar en el input de pasajeros
  get passengerSummary(): string {
    const a = this.searchForm.get('adults')?.value || 0;
    const c = this.searchForm.get('children')?.value || 0;
    const i = this.searchForm.get('infants')?.value || 0;
    const total = a + c + i;
    return `${total} Pasajero(s) (${a} Adultos, ${c} Niños, ${i} Infantes)`;
  }

  togglePassengerDropdown(): void {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  onSubmit(): void {
    this.searchForm.get('tripType')?.valueChanges.subscribe(type => {
      const returnControl = this.searchForm.get('returnDate');
      if (type === 'roundtrip') {
        returnControl?.setValidators(Validators.required);
      } else {
        returnControl?.clearValidators();
        returnControl?.setValue(null);
      }
      returnControl?.updateValueAndValidity();
    });

    if (this.searchForm.valid && this.arePassengersValid) {
      const formValues = this.searchForm.value;


      // Navegamos a la página de resultados pasando los datos por queryParams (o mediante un servicio/State)
      this.router.navigate(['/flights'], {
        queryParams: {
          tripType: formValues.tripType,
          origin: formValues.origin,
          destination: formValues.destination,
          departureDate: formValues.departureDate ? new Date(formValues.departureDate).toISOString() : '',
          returnDate: formValues.returnDate ? new Date(formValues.returnDate).toISOString() : '',
          adults: formValues.adults,
          children: formValues.children,
          infants: formValues.infants
        }
      });
    } else {
      this.searchForm.markAllAsTouched();
      alert('Por favor complete todos los campos obligatorios y asegúrese de que haya al menos 1 adulto o niño.');
    }
  }


  // 'roundtrip' (Ida y vuelta) | 'oneway' (Solo ida)
  tripType: 'roundtrip' | 'oneway' = 'roundtrip';

  // Fechas seleccionadas
  departureDate: Date | null = null;
  returnDate: Date | null = null;


  onTripTypeChange(): void {
    if (this.tripType === 'oneway') {
      this.returnDate = null;
    }
  }
}
