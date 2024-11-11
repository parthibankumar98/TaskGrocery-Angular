import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  getAllGroceries() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://localhost:44313/api/Grocery';
  private stockUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Fetch all groceries
  getGroceries(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/names-and-categories`)
      .pipe(catchError(this.handleError));
  }
  getDetails(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/details`)
      .pipe(catchError(this.handleError));
  }
  // Fetch grocery details by ID
  getGroceryDetailsById(groceryId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/grocery/${groceryId}`)
      .pipe(catchError(this.handleError));
  }

  // Add new stock
  addStock(newStock: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/add-stock`, newStock, { responseType: 'text' })
      .pipe(
        catchError(this.handleError),
        // Notify when stock is added successfully
        tap(() => this.stockUpdated.next())
      );
  }

  // Delete stock
  deleteStock(groceryId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/delete-stock/${groceryId}`, {
        responseType: 'text',
      })
      .pipe(
        catchError(this.handleError),
        // Notify when stock is deleted successfully
        tap(() => this.stockUpdated.next())
      );
  }
  // Update stock
  updateStock(groceryId: number, updatedStock: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/update-stock/${groceryId}`, updatedStock, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  // Observable for stock updates
  getStockUpdates(): Observable<void> {
    return this.stockUpdated.asObservable();
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again.')
    );
  }
}
