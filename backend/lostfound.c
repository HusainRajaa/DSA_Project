#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "queue.h"
#include "bst.h"
#include "match.h"
// Main C 
#define INPUT_FILE "reports.txt"
#define OUTPUT_FILE "matches.txt"

// Read input file and enqueue all reports
void loadReportsFromFile(Queue* q) {
    FILE* f = fopen(INPUT_FILE, "r");
    if (!f) {
        printf("No reports file found.\n");
        return;
    }

    char name[50], category[30], location[50], status[10];
    int priority, id = 1;
    while (fscanf(f, "%[^,],%[^,],%[^,],%[^,],%d\n", name, category, location, status, &priority) == 5) {
        enqueue(q, createItem(id++, name, category, location, status, priority));
    }
    fclose(f);
    printf("%d reports loaded from %s\n", id - 1, INPUT_FILE);
}

// Process queue: insert to BST + heap
void processReports(Queue* q, Node** lostRoot, Node** foundRoot, MaxHeap* heap) {
    while (!isEmpty(q)) {
        Item* item = dequeue(q);
        insertHeap(heap, *item);
        if (strcmp(item->status, "Lost") == 0)
            *lostRoot = insert(*lostRoot, *item);
        else
            *foundRoot = insert(*foundRoot, *item);
        free(item);
    }
}

int main() {
    Queue q;
    Node *lostRoot = NULL, *foundRoot = NULL;
    MaxHeap heap;
    initQueue(&q);
    initHeap(&heap);

    int choice;
    remove(OUTPUT_FILE); // clear old matches
// Frontend !!!

    while (1) {
        printf("\nLost and Found System - \n");
        printf("1. Load reports from file\n");
        printf("2. Display queue\n");
        printf("3. Process & insert into BST\n");
        printf("4. Display BST data\n");
        printf("5. Display priority heap\n");
        printf("6. Match Lost & Found\n");
        printf("7. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                loadReportsFromFile(&q);
                break;
            case 2:
                displayQueue(&q);
                break;
            case 3:
                processReports(&q, &lostRoot, &foundRoot, &heap);
                printf("Reports processed successfully!\n");
                break;
            case 4:
                printf("\n--- LOST ITEMS ---\n");
                inorder(lostRoot);
                printf("\n--- FOUND ITEMS ---\n");
                inorder(foundRoot);
                break;
            case 5:
                displayHeap(&heap);
                break;
            case 6:
                printf("Matching Lost and Found items...\n");
                matchLostFound(lostRoot, foundRoot, OUTPUT_FILE);
                printf("Results saved to %s\n", OUTPUT_FILE);
                break;
            case 7:
                printf("Exiting...\n");
                freeBST(lostRoot);
                freeBST(foundRoot);
                return 0;
            default:
                printf("Invalid option.\n");
        }
    }
    return 0;
}
