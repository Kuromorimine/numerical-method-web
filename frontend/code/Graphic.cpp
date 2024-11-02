#include <iostream>
using namespace std;
double fn(double x){
    return (43*x)-180;
}
int main(){
    double y,z;
    double ans;
    for(int i=0;i<=10;i++){
        if(fn(i)*fn(i+1)<=0){
            y=i;
            z=i+1;
            break;
        }
    }
    while(fn(y)<0.000001){
        y=y+0.000001;
    }
    // for(;y<z;y=y+0.000001){
    //     //cout<<"|";
    //     cout<<y;
    //     if(fn(y)<=0.000001){
    //         ans=y;
    //         cout<<ans;
    //         break;
            
    //     }
    // }
    //cout<< ans;
    cout<<y;
}