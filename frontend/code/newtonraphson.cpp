#include <iostream>
#include <math.h>
using namespace std;
double fn(double x){
    return pow(x,2)-7;
}
double fn1(double x){
    return 2*x;
}
int main(){
    double x0=2.0,xnew,xold,iteration=1;
    double epsilon=0.000001;
    xold=x0;
    xnew=xold-(fn(xold)/fn1(xold));
    while(abs((xnew-xold)/xnew)*100 > epsilon){
        xold=xnew;
        xnew=xold-(fn(xold)/fn1(xold));
        iteration++;
    }
    cout << "iteration : "<<iteration<< "\n";
    cout << xnew;
}