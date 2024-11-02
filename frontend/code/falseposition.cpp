#include <iostream>
#include <math.h>
using namespace std;
double fn(double x){
    return pow(x,4)-13;
}
double xm(double xl,double xr){
    return ((xl*fn(xr))-(xr*fn(xl)))/(fn(xr)-fn(xl));
}
int main(){
    double xl=1.5,xr=2.0,ans,xmt,xmnew,xmold=0,epsilon=0.000001;
    int count=0;
    do{
        xmold=xm(xl,xr);
        xmt=fn(xm(xl,xr));
        if(xmt!=0){
            if(xmt*fn(xl)>0){
                xl=xm(xl,xr);
            }
            else if(xmt*fn(xr)>0){
                xr=xm(xl,xr);
            }
        }
        xmnew=xm(xl,xr);
        // cout << xmnew;
    }while(abs((xmnew-xmold)/xmnew) >= epsilon);
cout << xmnew;
}