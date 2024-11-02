#include <iostream>
#include <math.h>
using namespace std;
double fn(double x){
    return pow(x/43,0.5);
}
int main(){
    // double x0=0.01,xi,xi_1,iteration=0;
    float x0=0.01,xnew,xold,iteration=0;
    double epsilon=0.000001;
    xold=x0;
    xnew=fn(xold);
    while(abs((xnew-xold)/xnew)*100 > epsilon){
        xold=xnew;
        xnew=fn(xold);
        iteration++;
    }
    cout << xnew;
    cout << "iteration : \n"<<iteration;
}