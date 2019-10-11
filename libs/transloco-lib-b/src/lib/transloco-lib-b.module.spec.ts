import { async, TestBed } from '@angular/core/testing';
import { TranslocoLibBModule } from './transloco-lib-b.module';

describe('TranslocoLibBModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoLibBModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TranslocoLibBModule).toBeDefined();
  });
});
