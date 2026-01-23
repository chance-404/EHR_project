import { Component } from "@angular/core";
import { DialogModule, DialogRef } from "@angular/cdk/dialog";

@Component({
	selector: 'app-case-delete-dialog',
	standalone: true,
	imports: [DialogModule],
	template: `
		<div class="modal-content">
			<h6>Are you sure you want to delete this case?</h6>
			<div class="actions">
				<button class="delete-btn" (click)="dialogRef.close(true)">Yes, Delete</button>
				<button class="cancel-btn" (click)="dialogRef.close(false)">Cancel</button>
			</div>
		</div>
	`,
	styles: [`
		.modal-content {
			background: white;
			padding: 24px;
			border-radius: 8px;
			box-shadow: 0 4px 20px rgba(0,0,0,0.2);
			max-width: 400px;
			text-align: center;
		}
		.actions {
			display: flex;
			gap: 80px;
			justify-content: center;
			margin-top: 20px;
		}
		.delete-btn { 
			padding: 10px 15px;
			font-size: 16px;
			font-weight: 600;
			background: #c93838; color: white; 
			border: none; 
			padding: 8px 16px; 
			border-radius: 4px; 
			cursor: pointer; 
		}
		.cancel-btn { 
			padding: 10px 15px;
			font-size: 16px;
			font-weight: 600;
			background: #e2e8f0; 
			color: #4a5568; 
			border: none; 
			padding: 8px 16px; 
			border-radius: 4px; 
			cursor: pointer; 
		}
	`]
})

export class ConfirmDeleteDialog {
	constructor(public dialogRef: DialogRef<boolean>) {}
}