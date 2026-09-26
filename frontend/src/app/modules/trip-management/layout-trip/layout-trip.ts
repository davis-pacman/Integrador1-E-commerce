import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../core/header/header';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'layout-trip',
  styles: ``,
  templateUrl: './layout-trip.html',
})
export class LayoutTrip { }
