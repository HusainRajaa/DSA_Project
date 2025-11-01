#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "bst.h"

// New BST node
Node* createNode(Item data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return newNode;
}

// Inserting node alphabetically by name
Node* insert(Node* root, Item data) {
    if (root == NULL)
        return createNode(data);
    if (strcmp(data.name, root->data.name) < 0)
        root->left = insert(root->left, data);
    else
        root->right = insert(root->right, data);
    return root;
}

// Searching by name
Node* search(Node* root, char name[]) {
    if (!root)
        return NULL;
    int cmp = strcmp(name, root->data.name);
    if (cmp == 0)
        return root;
    if (cmp < 0)
        return search(root->left, name);
    else
        return search(root->right, name);
}

// Inorder traversal (sorted by name)
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%-15s | %-10s | %-15s | %-5s | P: %d\n",
           root->data.name, root->data.category,
           root->data.location, root->data.status, root->data.priority);
    inorder(root->right);
}

// Save BST data to file recursively
void saveToFile(Node* root, char filename[]) {
    if (!root) return;
    FILE* f = fopen(filename, "a");
    if (!f) return;
    fprintf(f, "%s,%s,%s,%s,%d\n",
            root->data.name, root->data.category,
            root->data.location, root->data.status, root->data.priority);
    fclose(f);
    saveToFile(root->left, filename);
    saveToFile(root->right, filename);
}

// Free memory to further use
void freeBST(Node* root) {
    if (!root) return;
    freeBST(root->left);
    freeBST(root->right);
    free(root);
}
