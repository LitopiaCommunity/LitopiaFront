import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fadeAnimations', [
  transition('* => *', [
    query(
      ':leave',
      [style({ position: 'absolute', top: 0, left: 0, width: '100%' })],
      { optional: true },
    ),
    group([
      query(
        ':leave',
        [style({ opacity: 1 }), animate('0.3s ease', style({ opacity: 0 }))],
        {
          optional: true,
        },
      ),
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.3s ease', style({ opacity: 1 }))],
        {
          optional: true,
        },
      ),
    ]),
  ]),
]);
