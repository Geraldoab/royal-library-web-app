import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      console.log(id)
    }
}
