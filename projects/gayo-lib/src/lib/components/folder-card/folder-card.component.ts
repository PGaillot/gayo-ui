import { NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FolderTab {
  title: string;
  content: string;
  id: number;
}

@Component({
  selector: 'gayo-folder-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss',
})
export class FolderCardComponent {
  @Input() tabs!: FolderTab[];
  @Input() colors: string[] = [
    '#ffe8cc',
    '#ffd699',
    '#ffc266',
    '#84a59d',
    '#ff9900',
  ];

  constructor() {}

  activeTabs!: BehaviorSubject<FolderTab>;

  activeTabId: number = 0;
  draggedTabId: number | null = null;

  onTabDragStart(event: DragEvent, tabId: number) {
    this.draggedTabId = tabId;
  }

  onTabDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onTabDrop(event: DragEvent, targetTabId: number) {
    event.preventDefault();
    if (this.draggedTabId === null || this.draggedTabId === targetTabId) return;
    const draggedIndex = this.tabs.findIndex(
      (tab) => tab.id === this.draggedTabId,
    );
    const targetIndex = this.tabs.findIndex((tab) => tab.id === targetTabId);
    // Retirer l'onglet déplacé de sa position initiale
    const draggedTab: FolderTab = this.tabs[draggedIndex];
    this.setActiveTab(draggedTab.id);
    this.tabs.splice(draggedIndex, 1);
    // Insérer l'onglet à sa nouvelle position
    this.tabs.splice(targetIndex, 0, draggedTab);
    this.draggedTabId = null;
  }

  onTabClick(tabId: number) {
    this.setActiveTab(tabId);
  }

  getTabColor(tabId: number): string {
    return this.colors[tabId];
  }

  getActiveTabContent(): string {
    const activeTab = this.tabs.find((tab) => tab.id === this.activeTabId);
    return activeTab ? activeTab.content : this.tabs[0].content;
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
    this.getActiveTabContent();
    document.querySelectorAll('.tab').forEach((tab) => {
      if (tab instanceof HTMLElement) {
        tab.classList.remove('active-tab');
        if(tab.style.getPropertyValue('--active-tab-color') === this.colors[tabId]) return
        tab.style.setProperty('--active-tab-color',this.colors[tabId]);
      }
    });
  }

  ngOnInit(): void {
    this.activeTabs = new BehaviorSubject<FolderTab>(this.tabs[0]);
  }
}
