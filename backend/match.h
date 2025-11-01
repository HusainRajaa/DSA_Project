//used heap to prioritize by match score 

#ifndef MATCH_H
#define MATCH_H
#include "bst.h"

#define MAX 100

typedef struct {
    Item heap[MAX];
    int size;
} MaxHeap;

void initHeap(MaxHeap* h);
void insertHeap(MaxHeap* h, Item item);
Item extractMax(MaxHeap* h);
void displayHeap(MaxHeap* h);
void matchLostFound(Node* lostRoot, Node* foundRoot, char* outputFile);

#endif
