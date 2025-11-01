//used to store and search items -- BST



#ifndef BST_H
#define BST_H
#include "queue.h"

typedef struct Node {
    Item data;
    struct Node* left;
    struct Node* right;
} Node;

// BST operations
Node* insert(Node* root, Item data);
Node* search(Node* root, char name[]);
void inorder(Node* root);
void saveToFile(Node* root, char filename[]);
void freeBST(Node* root);

#endif

