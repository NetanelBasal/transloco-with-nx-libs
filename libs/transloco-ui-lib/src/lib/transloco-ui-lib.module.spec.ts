import { async, TestBed } from '@angular/core/testing';
import { TranslocoUiLibModule } from './transloco-ui-lib.module';

describe('TranslocoUiLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoUiLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TranslocoUiLibModule).toBeDefined();
  });
});
