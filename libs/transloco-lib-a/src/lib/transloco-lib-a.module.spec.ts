import { async, TestBed } from '@angular/core/testing';
import { TranslocoLibAModule } from './transloco-lib-a.module';

describe('TranslocoLibAModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoLibAModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TranslocoLibAModule).toBeDefined();
  });
});
