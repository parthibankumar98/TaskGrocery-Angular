import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  groceries: any[] = [];
  searchTerm: string = '';
  displayDialog: boolean = false;
  displayAlertDialog: boolean = false;
  selectedProduct: any = null;
  isDashboardVisible: boolean = true;
  isDashboardPage: boolean = true;
  filteredGroceries: any[] | undefined;
  dialogMessage: any;

  constructor(private groceryService: GroceryService) {}

  ngOnInit() {
    this.fetchGroceries();
    // Subscribe to stock updates to refresh groceries when stock is added/deleted
    this.groceryService.getStockUpdates().subscribe(() => {
      this.fetchGroceries();
    });
  }

  fetchGroceries() {
    this.groceryService.getGroceries().subscribe(
      (data) => {
        console.log('Groceries data:', data);
        this.groceries = data;
      },
      (error) => {
        console.error('Error fetching groceries:', error);
      }
    );
  }
  showDialog(product: any) {
    console.log('Selected product:', product);

    if (product && product.groceryId) {
      this.groceryService.getGroceryDetailsById(product.groceryId).subscribe(
        (data: any) => {
          console.log('Selected product data:', data);
          this.selectedProduct = data;
          this.displayDialog = true;
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      console.error('Invalid product or GroceryId:', product);
    }
  }
  onTabChange(event: any) {
    // Set isDashboardVisible to true only when the Dashboard tab is active
    this.isDashboardVisible = event.index === 0; // Assuming Dashboard tab is at index 0
  }
  onSearchProduct() {
    const foundProduct = this.groceries.find(
      (grocery) =>
        grocery.groceryName.toLowerCase() === this.searchTerm.toLowerCase()
    );

    if (!foundProduct) {
      this.dialogMessage =
        'Please provide a valid product name; it may not be in the grocery list';
      this.displayAlertDialog = true; // Show alert if not found
    } else {
      // Fetch full details for the found product
      this.groceryService
        .getGroceryDetailsById(foundProduct.groceryId)
        .subscribe(
          (data: any) => {
            this.selectedProduct = data; // Set the full product details
            this.displayDialog = true; // Show the product details dialog
          },
          (error: any) => {
            console.error('Error fetching product details:', error);
          }
        );
    }
  }
}
