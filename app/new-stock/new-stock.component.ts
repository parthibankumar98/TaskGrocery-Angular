import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css'],
})
export class NewStockComponent implements OnInit {
  groceries: any[] = []; // To hold the list of groceries
  displayDialog: boolean = false; // For controlling the dialog visibility
  displayConfirmDialog: boolean = false; // For confirmation dialog
  groceryIdToDelete: number | null = null;

  // Model for new stock form
  newStock = {
    groceryId: null,
    groceryName: '',
    category: '',
    stockQuantity: null,
    discountPercentage: null,
    discountId: null,
    stockId: null,
  };
  isLoading: boolean | undefined;
  grocery: any;
  isEditMode: boolean = false;

  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    // Fetch the existing groceries on component load
    this.getGroceries();
  }

  // Fetch groceries from the backend
  getGroceries(): void {
    this.groceryService.getDetails().subscribe(
      (data) => {
        console.log('Groceries fetched:', data);
        this.groceries = data; // Store the fetched data in the component
      },
      (error) => {
        console.error('Failed to fetch groceries', error);
      }
    );
  }

  // Save new stock to the database
  saveStock(form: NgForm): void {
    if (form.valid) {
      if (this.isEditMode) {
        // Logic to update the stock
        this.groceryService
          .updateStock(this.newStock.groceryId!, this.newStock)
          .subscribe(
            (response) => {
              console.log('Stock updated successfully', response);
              this.getGroceries();
              this.clearForm(form); // Clear the form after saving
              this.displayDialog = false; // Close the dialog after saving
            },
            (error) => {
              console.error('Failed to update stock', error);
            }
          );
      } else {
        // Logic to add new stock
        this.groceryService.addStock(this.newStock).subscribe(
          (response) => {
            console.log('Stock added successfully', response);
            this.getGroceries();
            this.clearForm(form); // Clear the form after saving
            this.displayDialog = false; // Close the dialog after saving
          },
          (error) => {
            console.error('Failed to add stock', error);
          }
        );
      }
    }
  }

  // Clear the form after saving or canceling
  clearForm(form?: NgForm): void {
    if (form) {
      form.resetForm();
    }
    this.newStock = {
      groceryId: null,
      groceryName: '',
      category: '',
      stockQuantity: null,
      discountPercentage: null,
      discountId: null,
      stockId: null,
    };
    this.isEditMode = false;
  }

  // Reset the form and open the dialog for adding new stock
  openDialog(): void {
    this.clearForm(); // Ensure form is reset when opening the dialog
    this.displayDialog = true;
    this.isEditMode = false;
  }
  // Show confirmation dialog for deletion
  confirmDelete(groceryId: number): void {
    this.groceryIdToDelete = groceryId; // Set the ID of the grocery to delete
    this.displayConfirmDialog = true; // Show the confirmation dialog
    console.log('Confirm Dialog visibility:', this.displayConfirmDialog);
  }

  // Delete a grocery item by ID
  deleteStock(groceryId: number): void {
    this.isLoading = true; // Start loading
    this.groceryService.deleteStock(groceryId).subscribe(
      (response) => {
        console.log('Stock deleted successfully');
        this.getGroceries(); // Update groceries
        this.isLoading = false; // Stop loading
        this.displayConfirmDialog = false; // Close confirmation dialog
      },
      (error) => {
        this.isLoading = false; // Stop loading
        console.error('Failed to delete stock', error);
      }
    );
  }
  editStock(grocery: any): void {
    this.newStock = { ...grocery }; // Load selected grocery into the form
    this.displayDialog = true; // Open the dialog for editing
    this.isEditMode = true; // Set to edit mode
  }
}
