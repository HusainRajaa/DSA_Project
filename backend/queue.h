//used to handle report in order 

#ifndef QUEUE_H
#define QUEUE_H

typedef struct Item {
    int id;
    char name[50];
    char category[30];
    char location[50];
    char status[10]; // "Lost" or "Found"
    int priority;    // Higher value = more important
    struct Item* next;
} Item;

typedef struct {
    Item* front;
    Item* rear;
} Queue;

// Queue management
void initQueue(Queue* q);
Item* createItem(int id, char name[], char category[], char location[], char status[], int priority);
void enqueue(Queue* q, Item* newItem);
Item* dequeue(Queue* q);
void displayQueue(Queue* q);
int isEmpty(Queue* q);

#endif
