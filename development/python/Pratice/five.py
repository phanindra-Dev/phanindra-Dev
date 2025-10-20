# def prime(num):
#     if(num<2):
#         return False
#     if(num==2):
#         return True
#     if(num %2 == 0):
#         return False
#     for i in range(3,num):
#         if(num%i==0):
#             return False
#     return True

# n = int(input("Enter the range : "))
# num = 1
# count = 0
# # for i in range(2,100):
# #     if(prime(num)):
# #         count+=1
# #         print(num,end=" ")
# #     num+=1 
# #     if(count == n):
# #         break
        
# while(count<=n):    
#     if(prime(num)):
#         print(num,end=" ")
#         count+=1
#     num+=1
    
    
def add(a = 0,b = 2):
    return a+b

print(add(3))
