import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private collection = 'employees';

  constructor(private firestore: AngularFirestore) { }

  getEmployees(): Observable<Employee[]> {
    return this.firestore.collection<Employee>(this.collection).valueChanges();
  }

  addEmployee(employee: Employee): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collection).doc(id).set(employee);
  }

  updateEmployee(id: string, employee: Employee): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).update(employee);
  }

  deleteEmployee(id: string): Promise<void> {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}
