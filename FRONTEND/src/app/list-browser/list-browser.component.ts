import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-list-browser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-browser.component.html',
  styleUrl: './list-browser.component.css'
})

export class ListBrowserComponent {
  @Input('filterField')filterField : string;
  filteredValue:string;
  private destroy$ = new Subject<void>();
  constructor(private backendReader: ApiService) {}
  
  public filterEvent(){
    this.backendReader.setFilter(this.filterField,this.filteredValue);
    this.backendReader.filter().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }
}
