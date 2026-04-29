import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/custom-validators';
import { ToastrService } from 'ngx-toastr';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  registroForm!: FormGroup;
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

  // Control para mostrar/ocultar contraseñas
  showPassword = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registroForm = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/), // solo letras y espacios
          ],
        ],

        email: [
          '',
          [Validators.required, Validators.email], // síncronos
          [CustomValidators.emailTaken()], // asíncrono
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
            // al menos: 1 minúscula, 1 mayúscula, 1 número, 1 especial
          ],
        ],

        confirmarPassword: ['', [Validators.required]],

        fechaNacimiento: ['', [Validators.required, CustomValidators.minAge(18)]],

        terminos: [false, [Validators.requiredTrue]],
      },
      {
        validators: CustomValidators.passwordMatch('password', 'confirmarPassword'),
      },
    );
  }

  // Getters
  get nombre() {
    return this.registroForm.get('nombre')!;
  }
  get email() {
    return this.registroForm.get('email')!;
  }
  get password() {
    return this.registroForm.get('password')!;
  }
  get confirmarPassword() {
    return this.registroForm.get('confirmarPassword')!;
  }
  get fechaNacimiento() {
    return this.registroForm.get('fechaNacimiento')!;
  }
  get terminos() {
    return this.registroForm.get('terminos')!;
  }

  // Submit
  onSubmit(): void {
    if (this.registroForm.invalid) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;

      const nombre = this.registroForm.get('nombre')?.value;

      this.registroForm.reset({ terminos: false });
      this.isSubmitting = false;

      this.launchConfetti();
      this.toastr.success(
        `Bienvenido, ${nombre}. Tu cuenta ha sido creada correctamente.`,
        '¡Registro exitoso! ',
        { timeOut: 5000 },
      );
    }, 1500);
  }

  private launchConfetti(): void {
    // Primera ráfaga — izquierda
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: ['#1a3c6e', '#2557a7', '#1a7f4b', '#f0c040', '#ffffff'],
    });

    // Segunda ráfaga — derecha
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: ['#1a3c6e', '#2557a7', '#1a7f4b', '#f0c040', '#ffffff'],
    });

    // Ráfaga central con delay
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#1a3c6e', '#2557a7', '#1a7f4b', '#f0c040', '#ffffff'],
      });
    }, 300);
  }

  onReset(): void {
    this.registroForm.reset({ terminos: false });

    // Toast informativo al limpiar
    this.toastr.info('El formulario ha sido limpiado.', 'Formulario reiniciado');
  }
}
