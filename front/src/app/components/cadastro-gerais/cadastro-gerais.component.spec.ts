import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGeraisComponent } from './cadastro-gerais.component';

describe('CadastroGeraisComponent', () => {
  let component: CadastroGeraisComponent;
  let fixture: ComponentFixture<CadastroGeraisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroGeraisComponent]
    });
    fixture = TestBed.createComponent(CadastroGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
