#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "match.h"
// Goal - max heap - highest score on top 
// Ranks lost found matches 
// Initialize empty heap
void initHeap(MaxHeap* h) {
    h->size = 0;
}

// Swap helper
void swap(Item* a, Item* b) {
    Item t = *a; *a = *b; *b = t;
}

// Insert by priority
void insertHeap(MaxHeap* h, Item item) {
    if (h->size >= MAX - 1) return;
    h->heap[++h->size] = item;
    int i = h->size;
    while (i > 1 && h->heap[i].priority > h->heap[i / 2].priority) {
        swap(&h->heap[i], &h->heap[i / 2]);
        i /= 2;
    }
}

// Extract top priority
Item extractMax(MaxHeap* h) {
    Item empty = {0};
    if (h->size == 0) return empty;
    Item max = h->heap[1];
    h->heap[1] = h->heap[h->size--];
    int i = 1;
    while (1) {
        int l = 2 * i, r = 2 * i + 1, largest = i;
        if (l <= h->size && h->heap[l].priority > h->heap[largest].priority)
            largest = l;
        if (r <= h->size && h->heap[r].priority > h->heap[largest].priority)
            largest = r;
        if (largest == i) break;
        swap(&h->heap[i], &h->heap[largest]);
        i = largest;
    }
    return max;
}

// Display heap contents
void displayHeap(MaxHeap* h) {
    printf("\n--- Priority Queue (Heap) ---\n");
    for (int i = 1; i <= h->size; i++) {
        printf("%-15s | %s | %s | P:%d\n",
               h->heap[i].name, h->heap[i].category,
               h->heap[i].status, h->heap[i].priority);
    }
}

// Recursive lost-found matching
void matchLostFound(Node* lostRoot, Node* foundRoot, char* outputFile) {
    if (!lostRoot || !foundRoot) return;

    if (strcmp(lostRoot->data.category, foundRoot->data.category) == 0 &&
        strcmp(lostRoot->data.location, foundRoot->data.location) == 0) {

        FILE* f = fopen(outputFile, "a");
        fprintf(f, "MATCH: Lost: %-15s ↔ Found: %-15s | Category: %-10s | Location: %-15s\n",
                lostRoot->data.name, foundRoot->data.name,
                lostRoot->data.category, lostRoot->data.location);
        fclose(f);
    }

    matchLostFound(lostRoot->left, foundRoot, outputFile);
    matchLostFound(lostRoot->right, foundRoot, outputFile);
    matchLostFound(lostRoot, foundRoot->left, outputFile);
    matchLostFound(lostRoot, foundRoot->right, outputFile);
}
