#include <iostream>
#include <cmath>
#include <functional>
#include <iomanip>

using std::cout;

double f(double x) {
    return x*x -7;
}

double secentMethod(double x0, double x1, std::function<double(double)> f){
    double xiold, xi;
    int i = 1;
    do {
        xiold = xi;
        xi = x0 - (f(x0)*(x0-x1))/(f(x0)-f(x1));
        x0 = x1;
        x1 = xi;
        i++;
    } while(fabs((xi-xiold)/xi)*100 > 0.000001);
    cout << i << "\n";
    return xi;
}

int main() {
    double result = secentMethod(1,3,f);
    cout << std::fixed << std::setprecision(6) << result << std::endl;

    return 0;
}