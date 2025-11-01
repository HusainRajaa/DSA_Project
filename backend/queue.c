#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "queue.h"

// Initialized empty queue
void initQueue(Queue* q) {
    q->front = q->rear = NULL;
}

// Create new report item dynamically
Item* createItem(int id, char name[], char category[], char location[], char status[], int priority) {
    Item* newItem = (Item*)malloc(sizeof(Item));
    newItem->id = id;
    strcpy(newItem->name, name);
    strcpy(newItem->category, category);
    strcpy(newItem->location, location);
    strcpy(newItem->status, status);
    newItem->priority = priority;
    newItem->next = NULL;
    return newItem;
}

// Add report to queue (FIFO)
void enqueue(Queue* q, Item* newItem) {
    if (q->rear == NULL) {
        q->front = q->rear = newItem;
    } else {
        q->rear->next = newItem;
        q->rear = newItem;
    }
}

// Remove report from queue
Item* dequeue(Queue* q) {
    if (q->front == NULL)
        return NULL;
    Item* temp = q->front;
    q->front = q->front->next;
    if (q->front == NULL)
        q->rear = NULL;
    temp->next = NULL;
    return temp;
}

// Display current queue
void displayQueue(Queue* q) {
    Item* temp = q->front;
    printf("\n--- Pending Reports ---\n");
    if (!temp) {
        printf("No reports in queue.\n");
        return;
    }
    while (temp) {
        printf("ID: %d | Name: %-15s | Cat: %-10s | Loc: %-15s | Status: %-5s | Priority: %d\n",
               temp->id, temp->name, temp->category, temp->location, temp->status, temp->priority);
        temp = temp->next;
    }
}

// Check if queue empty
int isEmpty(Queue* q) {
    return q->front == NULL;
}
