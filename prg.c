#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

#define N 500   // rows of A
#define M 500   // cols of A, rows of B
#define P 500   // cols of B

int main() {
    int i, j, k;
    double **A, **B, **C;

    // Allocate memory for matrices
    A = (double**)malloc(N * sizeof(double*));
    B = (double**)malloc(M * sizeof(double*));
    C = (double**)malloc(N * sizeof(double*));

    for (i = 0; i < N; i++) A[i] = (double*)malloc(M * sizeof(double));
    for (i = 0; i < M; i++) B[i] = (double*)malloc(P * sizeof(double));
    for (i = 0; i < N; i++) C[i] = (double*)malloc(P * sizeof(double));

    // Initialize A and B with random values
    for (i = 0; i < N; i++)
        for (j = 0; j < M; j++)
            A[i][j] = rand() % 10;

    for (i = 0; i < M; i++)
        for (j = 0; j < P; j++)
            B[i][j] = rand() % 10;

    // Matrix Multiplication (Parallelized)
    double start = omp_get_wtime();
    #pragma omp parallel for private(j,k) shared(A,B,C)
    for (i = 0; i < N; i++) {
        for (j = 0; j < P; j++) {
            C[i][j] = 0;
            for (k = 0; k < M; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    double end = omp_get_wtime();

    printf("Matrix multiplication completed in %f seconds\n", end - start);

    // (Optional) Print result for small sizes
    if (N <= 5 && P <= 5) {
        printf("Result matrix C:\n");
        for (i = 0; i < N; i++) {
            for (j = 0; j < P; j++)
                printf("%8.2f ", C[i][j]);
            printf("\n");
        }
    }

    // Free memory
    for (i = 0; i < N; i++) free(A[i]);
    for (i = 0; i < M; i++) free(B[i]);
    for (i = 0; i < N; i++) free(C[i]);
    free(A); free(B); free(C);

    return 0;
}
