import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface FolderTab {
  title: string;
  content: string;
}

@Component({
  selector: 'lib-folder-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss',
})
export class FolderCardComponent {
  @Input() tabs!: FolderTab[];
  colors: string[] = ['#f6bd60', '#f7ede2', '#f5cac3', '#84a59d', '#f28482'];
  tabsActiveIndex: number = 0;
  tabsActive: FolderTab | undefined;
  dragData?:string;

  tabClick(index: number) {
    this.tabsActiveIndex = index;
  }

  onTabDragStart(event: any) {
    this.dragData = event.target.innerText
    console.log(event);
  }
  onTabDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onTabDrop(event: DragEvent) {
    event.preventDefault();
    const targetTab:any = event.target;
    targetTab.innerText = this.dragData;
  
  
  
  }
}
