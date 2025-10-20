n = 5
num  = 15
k = 2
temp = 0
for i in range(n):
    
    for j in range(n - i-1):
        print(" ", end=" ")

        
    for j in range (0,i+1):
        print(num,end=" ")
        if(j==0):
            temp = num
        if(i!=0):
            num+=1
        
    print()    
    num = temp-k
    k+=1
