import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../core/header/header';
import { Footer } from '../../../core/footer/footer';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'layout-trip',
  styles: ``,
  templateUrl: './layout-trip.html',
})
export class LayoutTrip { }
