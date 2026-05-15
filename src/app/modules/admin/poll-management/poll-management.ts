import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '../../../services/polls.service';

@Component({
  selector: 'app-poll-management',
  templateUrl: './poll-management.component.html',
  styleUrls: ['./poll-management.component.scss'],
})
export class PollManagementComponent implements OnInit {
  pollForm!: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  isEditMode = false;
  pollId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private pollsService: PollsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.pollForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      options: this.formBuilder.array(
        [
          this.formBuilder.group({ optionText: ['', Validators.required] }),
          this.formBuilder.group({ optionText: ['', Validators.required] }),
        ],
        [Validators.minLength(2), Validators.maxLength(4)]
      ),
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.pollId = params['id'];
        this.loadPoll(params['id']);
      }
    });
  }

  loadPoll(id: number): void {
    this.loading = true;
    this.pollsService.getPollById(id).subscribe({
      next: (poll) => {
        this.pollForm.patchValue({
          title: poll.title,
          description: poll.description,
        });

        const optionsArray = this.pollForm.get('options') as FormArray;
        optionsArray.clear();
        poll.options.forEach(option => {
          optionsArray.push(
            this.formBuilder.group({ optionText: [option.optionText, Validators.required] })
          );
        });

        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  get optionsArray(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addOption(): void {
    const optionsArray = this.optionsArray;
    if (optionsArray.length < 4) {
      optionsArray.push(
        this.formBuilder.group({ optionText: ['', Validators.required] })
      );
    }
  }

  removeOption(index: number): void {
    const optionsArray = this.optionsArray;
    if (optionsArray.length > 2) {
      optionsArray.removeAt(index);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.pollForm.invalid) {
      return;
    }

    this.loading = true;

    const formData = {
      title: this.pollForm.value.title,
      description: this.pollForm.value.description,
      options: this.pollForm.value.options,
    };

    const request = this.isEditMode && this.pollId
      ? this.pollsService.updatePoll(this.pollId, formData)
      : this.pollsService.createPoll(formData);

    request.subscribe({
      next: (poll) => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Failed to save poll';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}