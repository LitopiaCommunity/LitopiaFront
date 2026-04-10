import { Component } from '@angular/core';
import { Router } from '@angular/router';

type AmbientPixel = {
  top: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
};

type FloatingBlock = {
  top: string;
  left: string;
  size: string;
  delay: string;
  variant: 'grass' | 'stone' | 'ore' | 'log';
};

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  readonly ambientPixels: AmbientPixel[] = [
    {
      top: '10%',
      left: '8%',
      size: '10px',
      duration: '14s',
      delay: '0s',
      opacity: 0.72,
    },
    {
      top: '16%',
      left: '74%',
      size: '14px',
      duration: '17s',
      delay: '-3s',
      opacity: 0.58,
    },
    {
      top: '34%',
      left: '88%',
      size: '8px',
      duration: '12s',
      delay: '-7s',
      opacity: 0.68,
    },
    {
      top: '68%',
      left: '12%',
      size: '12px',
      duration: '20s',
      delay: '-11s',
      opacity: 0.46,
    },
    {
      top: '76%',
      left: '78%',
      size: '9px',
      duration: '15s',
      delay: '-5s',
      opacity: 0.62,
    },
    {
      top: '22%',
      left: '46%',
      size: '6px',
      duration: '13s',
      delay: '-9s',
      opacity: 0.74,
    },
  ];

  readonly floatingBlocks: FloatingBlock[] = [
    {
      top: '15%',
      left: '18%',
      size: '34px',
      delay: '0s',
      variant: 'grass',
    },
    {
      top: '24%',
      left: '82%',
      size: '28px',
      delay: '-1.4s',
      variant: 'stone',
    },
    {
      top: '38%',
      left: '66%',
      size: '22px',
      delay: '-2.8s',
      variant: 'ore',
    },
    {
      top: '58%',
      left: '90%',
      size: '30px',
      delay: '-4.2s',
      variant: 'grass',
    },
    {
      top: '72%',
      left: '12%',
      size: '24px',
      delay: '-3.1s',
      variant: 'log',
    },
    {
      top: '84%',
      left: '64%',
      size: '20px',
      delay: '-5s',
      variant: 'ore',
    },
  ];

  constructor(private readonly router: Router) {}

  get currentRoute(): string {
    return this.router.url || '/';
  }
}
